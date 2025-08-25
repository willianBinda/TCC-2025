// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import {Permissao} from "/utils/Permissao.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Estadual is Permissao{
    IERC20 public moeda;

    address contratoMunicipio;
    address contratoFederal;

    constructor(IERC20 _moeda){
        moeda = _moeda;
    }

    function salvarEnderecoMunicipio(address _contratoFederal) public onlyRole(DEFAULT_ADMIN_ROLE){
        contratoFederal = _contratoFederal;
    }

    function transferirParaFederal(uint _valor) public onlyRole(ORGAO_ROLE){
        require(contratoFederal != address(0), "Contrato Estado nao definido");
        uint256 saldo = moeda.balanceOf(address(this));
        require(saldo > 0, "Saldo insuficiente");
        moeda.transfer(contratoFederal, _valor);
    }

    function buscarSaldoEstadual() public view returns (uint){
        return moeda.balanceOf(address(this));
    }
    
}