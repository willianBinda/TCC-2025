// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import {Permissao} from "./utils/Permissao.sol";
import {Estruturas} from "./utils/Estruturas.sol";
import {Modificadores} from "./utils/Modificadores.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Estadual is Permissao, Estruturas, Modificadores, ReentrancyGuard {
    using SafeERC20 for IERC20;
    IERC20 public moeda;

    Aplicacao public aplicacao =
        Aplicacao({
            percentualMinimo: 12,
            percentualAplicado: 0,
            valorAplicado: 0,
            valorArrecadado: 0,
            valorDistribuido: 0
        });

    Contrato public contrato;

    mapping(uint256 => Despesa) public despesas;
    uint256 private proximaDespesaId = 1;

    constructor(address _moeda) {
        require(_moeda != address(0), "Moeda invalida");
        moeda = IERC20(_moeda);
    }

    event EventoContrato(
        address indexed admin,
        TipoOrgao indexed tipoContrato,
        address contratoAntigo,
        address contratoNovo
    );

    event EventoDistribuicao(
        bytes32 indexed txAnterior,
        address indexed orgao,
        TipoOrgao indexed destino,
        uint valor,
        string justificativa
    );

    event EventoDespesa(
        bytes32 indexed txAnterior,
        address indexed orgao,
        address indexed fornecedor,
        uint256 despesaId,
        uint256 valor,
        Situacao situacao,
        string justificativa
    );

    event EventoSituacaoDespesa(
        Situacao indexed situacao,
        uint256 indexed despesaId
    );

    function setValorArrecadado() public onlyRole(DEFAULT_ADMIN_ROLE) {
        aplicacao.valorArrecadado = buscarSaldo();
    }

    function setContrato(
        address _novoContrato
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_novoContrato != address(0), "Endereco invalido");
        require(contrato.municipal != _novoContrato, "Contrato em uso");

        address contratoAntigo = contrato.municipal;
        contrato.municipal = _novoContrato;

        emit EventoContrato(
            msg.sender,
            TipoOrgao.MUNICIPAL,
            contratoAntigo,
            _novoContrato
        );
    }

    function buscarSaldo() public view returns (uint) {
        return moeda.balanceOf(address(this));
    }

    function distribuir(
        uint _valor,
        string memory _justificativa,
        bytes32 _txAnterior
    ) public nonReentrant onlyRole(ORGAO_ROLE) onlyValorPositivo(_valor) {
        require(contrato.municipal != address(0), "Contrato Estado invalido");

        uint256 saldo = buscarSaldo();
        require(saldo >= _valor, "Saldo insuficiente");

        aplicacao.valorDistribuido += _valor;
        moeda.safeTransfer(contrato.municipal, _valor);
        emit EventoDistribuicao(
            _txAnterior,
            msg.sender,
            TipoOrgao.MUNICIPAL,
            _valor,
            _justificativa
        );
    }

    function registrar(
        uint256 _valor,
        address _fornecedor,
        string memory _justificativa,
        bytes32 _txAnterior
    ) public nonReentrant onlyRole(ORGAO_ROLE) onlyValorPositivo(_valor) {
        uint256 saldo = buscarSaldo();
        require(saldo >= _valor, "Saldo insuficiente");
        uint256 id = proximaDespesaId;

        despesas[id] = Despesa({
            id: id,
            emitente: msg.sender,
            fornecedor: _fornecedor,
            situacao: Situacao.PENDENTE,
            valor: _valor
        });

        calcularAplicacao(_valor);

        proximaDespesaId = id + 1;

        emit EventoDespesa(
            _txAnterior,
            msg.sender,
            _fornecedor,
            id,
            _valor,
            Situacao.PENDENTE,
            _justificativa
        );
    }

    function calcularAplicacao(uint256 _valor) private {
        uint256 valorTotalAplicado = aplicacao.valorAplicado + _valor;
        uint256 percentualAplicado = (valorTotalAplicado * 100) /
            aplicacao.valorArrecadado;

        aplicacao.valorAplicado = valorTotalAplicado;
        aplicacao.percentualAplicado = percentualAplicado;
    }

    function confirmarEntrega(uint256 _id) public onlyRole(FORNECEDOR_ROLE) {
        Despesa storage despesa = despesas[_id];

        require(
            despesa.situacao != Situacao.FINALIZADO &&
                despesa.situacao != Situacao.ENTREGUE,
            "Despesa invalida"
        );

        if (despesa.situacao == Situacao.PENDENTE)
            despesa.situacao = Situacao.ENTREGUE;

        if (despesa.situacao == Situacao.RECEBIDO) {
            emit EventoSituacaoDespesa(Situacao.ENTREGUE, _id);
            despesa.situacao = Situacao.FINALIZADO;
            moeda.safeTransfer(despesa.fornecedor, despesa.valor);
        }

        emit EventoSituacaoDespesa(despesa.situacao, _id);
    }

    function confirmarRecebimento(uint256 _id) public onlyRole(ORGAO_ROLE) {
        Despesa storage despesa = despesas[_id];

        require(
            despesa.situacao != Situacao.FINALIZADO &&
                despesa.situacao != Situacao.RECEBIDO,
            "Despesa invalida"
        );

        if (despesa.situacao == Situacao.PENDENTE)
            despesa.situacao = Situacao.RECEBIDO;

        if (despesa.situacao == Situacao.ENTREGUE) {
            emit EventoSituacaoDespesa(Situacao.RECEBIDO, _id);
            despesa.situacao = Situacao.FINALIZADO;
            moeda.safeTransfer(despesa.fornecedor, despesa.valor);
        }

        emit EventoSituacaoDespesa(despesa.situacao, _id);
    }
}
