// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract Moeda is ERC20, ERC20Permit {
    constructor() ERC20("Moeda", "MOE") ERC20Permit("Moeda") {
        _mint(msg.sender, 1000000000000 * 10**18);
    }
}