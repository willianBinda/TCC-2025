// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract Permissao is AccessControl{
    using EnumerableSet for EnumerableSet.AddressSet;

    constructor(){
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    bytes32 public constant ORGAO_ROLE = keccak256("ORGAO_ROLE");
    EnumerableSet.AddressSet private orgaosAtivos;

    //eventos
    event PermissaoOrgaoAdicionada(address indexed admin, address indexed endereco); 
    event PermissaoOrgaoRemovida(address indexed admin, address indexed endereco); 

    function adicionarPermissaoOrgao(address _endereco) public onlyRole(DEFAULT_ADMIN_ROLE){
        require(!hasRole(ORGAO_ROLE, _endereco));

        _grantRole(ORGAO_ROLE, _endereco);
        orgaosAtivos.add(_endereco);

        emit PermissaoOrgaoAdicionada(msg.sender, _endereco);
    }

    function removerPermissaoOrgao(address _endereco) public onlyRole(DEFAULT_ADMIN_ROLE){
        require(hasRole(ORGAO_ROLE, _endereco));

        _revokeRole(ORGAO_ROLE, _endereco);
        orgaosAtivos.remove(_endereco);

        emit PermissaoOrgaoRemovida(msg.sender, _endereco);
    }

    function temPermissaoOrgao() public view returns (bool) {
        return hasRole(ORGAO_ROLE, msg.sender);
    }

    function buscarOrgaosAtivos() public view returns (address[] memory) {
        return orgaosAtivos.values();
    }
}