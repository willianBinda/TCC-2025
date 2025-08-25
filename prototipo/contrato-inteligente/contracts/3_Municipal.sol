// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import {Permissao} from "/utils/Permissao.sol";

contract Municipal is Permissao{

    constructor(){
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    
}