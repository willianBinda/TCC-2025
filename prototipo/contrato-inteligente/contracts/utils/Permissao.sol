// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import {Enumeradores} from "./Enumeradores.sol";

contract Permissao is AccessControl, Enumeradores {
    using EnumerableSet for EnumerableSet.AddressSet;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    bytes32 public constant ORGAO_ROLE = keccak256("ORGAO_ROLE");
    bytes32 public constant FORNECEDOR_ROLE = keccak256("FORNECEDOR_ROLE");

    EnumerableSet.AddressSet private orgaosAtivos;
    EnumerableSet.AddressSet private fornecedoresAtivos;

    //eventos
    event PermissaoAdicionada(
        address indexed admin,
        address indexed endereco,
        TipoPermissao indexed tipoPermissao
    );

    event PermissaoRemovida(
        address indexed admin,
        address indexed endereco,
        TipoPermissao indexed tipoPermissao
    );

    function adicionarPermissaoOrgao(
        address _endereco
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(!hasRole(ORGAO_ROLE, _endereco));

        _grantRole(ORGAO_ROLE, _endereco);
        orgaosAtivos.add(_endereco);

        emit PermissaoAdicionada(msg.sender, _endereco, TipoPermissao.ORGAO);
    }

    function removerPermissaoOrgao(
        address _endereco
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(hasRole(ORGAO_ROLE, _endereco));

        _revokeRole(ORGAO_ROLE, _endereco);
        orgaosAtivos.remove(_endereco);

        emit PermissaoRemovida(msg.sender, _endereco, TipoPermissao.ORGAO);
    }

    function adicionarPermissaoFornecedor(
        address _endereco
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(!hasRole(FORNECEDOR_ROLE, _endereco));

        _grantRole(FORNECEDOR_ROLE, _endereco);
        fornecedoresAtivos.add(_endereco);

        emit PermissaoAdicionada(
            msg.sender,
            _endereco,
            TipoPermissao.FORNECEDOR
        );
    }

    function removerPermissaoFornecedor(
        address _endereco
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(hasRole(FORNECEDOR_ROLE, _endereco));

        _revokeRole(FORNECEDOR_ROLE, _endereco);
        fornecedoresAtivos.remove(_endereco);

        emit PermissaoRemovida(msg.sender, _endereco, TipoPermissao.FORNECEDOR);
    }

    function temPermissaoOrgao() public view returns (bool) {
        return hasRole(ORGAO_ROLE, msg.sender);
    }

    function temPermissaoFornecedor() public view returns (bool) {
        return hasRole(FORNECEDOR_ROLE, msg.sender);
    }

    function buscarOrgaosAtivos() public view returns (address[] memory) {
        return orgaosAtivos.values();
    }

    function buscarFornecedoresAtivos() public view returns (address[] memory) {
        return fornecedoresAtivos.values();
    }
}
