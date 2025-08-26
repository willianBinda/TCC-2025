// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import {Permissao} from "/utils/Permissao.sol";
import {Estruturas} from "/utils/Estruturas.sol";
import {Modificadores} from "/utils/Modificadores.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Estadual is Permissao, Estruturas, Modificadores, ReentrancyGuard{
    using SafeERC20 for IERC20;
    IERC20 public moeda;

    Aplicacao public aplicacao = Aplicacao({
        percentualMinimo: 12,
        percentualAplicado: 0,
        valorAplicado: 0,
        valorArrecadado: 0,
        valorDistribuido: 0
    });

    Contrato public contrato;

    constructor(address _moeda){
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
        address indexed orgao,
        TipoOrgao indexed destino, 
        uint valor,
        string justificativa
    );

    event EventoDespesa(
        address indexed orgao,
        uint valor,
        string justificativa
    );

    function setValorArrecadado() public onlyRole(DEFAULT_ADMIN_ROLE){
        aplicacao.valorArrecadado = buscarSaldo();
    }

    function setContrato(address _novoContrato) 
        public onlyRole(DEFAULT_ADMIN_ROLE)
    {
        require(_novoContrato != address(0), "Endereco invalido");
        require(contrato.municipal != _novoContrato, "Contrato em uso");

        address contratoAntigo = contrato.municipal;
        contrato.municipal = _novoContrato;

        emit EventoContrato(msg.sender, TipoOrgao.MUNICIPAL, contratoAntigo, _novoContrato);
    }

    function buscarSaldo() public view returns (uint){
        return moeda.balanceOf(address(this));
    }

    function distribuirRecurso(uint _valor, string memory _justificativa) 
        public nonReentrant onlyRole(ORGAO_ROLE) onlyValorPositivo(_valor)
    {
        require(contrato.municipal != address(0), "Contrato Estado invalido");

        uint256 saldo = buscarSaldo();
        require(saldo >= _valor, "Saldo insuficiente");

        aplicacao.valorDistribuido += _valor;
        moeda.safeTransfer(contrato.municipal, _valor);
        emit EventoDistribuicao(msg.sender, TipoOrgao.MUNICIPAL, _valor, _justificativa);
    }

    function registrarDespesa(uint256 _valor, string memory _justificativa) 
        public nonReentrant onlyRole(ORGAO_ROLE) onlyValorPositivo(_valor)
    {
        uint256 saldo = buscarSaldo();
        require(saldo >= _valor, "Saldo insuficiente");

        calcularAplicacao(_valor);

        moeda.safeTransfer(address(moeda), _valor);
        emit EventoDespesa(msg.sender, _valor, _justificativa);
    }

    function calcularAplicacao(uint256 _valor) private {
        uint256 valorTotalAplicado = aplicacao.valorAplicado + _valor;
        uint256 percentualAplicado = (valorTotalAplicado * 100) / aplicacao.valorArrecadado;

        aplicacao.valorAplicado = valorTotalAplicado;
        aplicacao.percentualAplicado = percentualAplicado;
    }
}