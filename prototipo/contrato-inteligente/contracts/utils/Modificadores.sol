// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import {Enumeradores} from "./Enumeradores.sol";

contract Modificadores is Enumeradores {
    modifier onlyEstadualMunicipal(TipoOrgao _tipo) {
        require(
            _tipo == TipoOrgao.ESTADUAL || _tipo == TipoOrgao.MUNICIPAL,
            "Orgao nao definido"
        );
        _;
    }

    modifier onlyValorPositivo(uint256 _valor) {
        require(_valor > 0, "Valor deve ser maior que 0");
        _;
    }
}
