// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import {Permissao} from "/utils/Permissao.sol";
import {Modificadores} from "/utils/Modificadores.sol";
import {Estruturas} from "/utils/Estruturas.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Federal is Permissao, Modificadores, Estruturas, ReentrancyGuard{
    using SafeERC20 for IERC20;

    IERC20 public moeda;

    Aplicacao public aplicacao = Aplicacao({
        percentualMinimo: 15,
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
    
    event EventoContrato(
        address indexed admin,
        TipoOrgao indexed tipoContrato, 
        address contratoAntigo, 
        address contratoNovo
    );

    function setValorArrecadado() public onlyRole(DEFAULT_ADMIN_ROLE){
        aplicacao.valorArrecadado = buscarSaldo();
    } 

    function setContrato(TipoOrgao _tipo, address _novoContrato) 
        public onlyRole(DEFAULT_ADMIN_ROLE) onlyEstadualMunicipal(_tipo)
    {
        require(_novoContrato != address(0), "Endereco invalido");
        
        address contratoAntigo;

        if(_tipo == TipoOrgao.Estadual){
            require(contrato.estadual != _novoContrato, "Contrato em uso");
            contratoAntigo = contrato.estadual;
            contrato.estadual = _novoContrato;
        }else{
            require(contrato.municipal != _novoContrato, "Contrato em uso");
            contratoAntigo = contrato.municipal;
            contrato.municipal = _novoContrato;
        }

        emit EventoContrato(msg.sender, _tipo, contratoAntigo, _novoContrato);
    }

    function buscarSaldo() public view returns (uint){
        return moeda.balanceOf(address(this));
    }
    
    function distribuirRecurso(uint _valor, TipoOrgao _tipoOrgao, string memory _justificativa) 
        public nonReentrant onlyRole(ORGAO_ROLE) onlyEstadualMunicipal(_tipoOrgao) onlyValorPositivo(_valor)
    {
        uint256 saldo = buscarSaldo();
        require(saldo >= _valor, "Saldo insuficiente");

        address destino;

        if(_tipoOrgao == TipoOrgao.Estadual){
            require(contrato.estadual != address(0), "Contrato Estado invalido");
            destino = contrato.estadual;
        }else{
            require(contrato.municipal != address(0), "Contrato Estado invalido");
            destino = contrato.municipal;
        }
        
        aplicacao.valorDistribuido += _valor;
        moeda.safeTransfer(destino, _valor);
        emit EventoDistribuicao(msg.sender, _tipoOrgao, _valor, _justificativa);
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
        uint256 percentualAplicado = (valorTotalAplicado / aplicacao.valorArrecadado) * 100;

        aplicacao.valorAplicado = valorTotalAplicado;
        aplicacao.percentualAplicado = percentualAplicado;
    }
}