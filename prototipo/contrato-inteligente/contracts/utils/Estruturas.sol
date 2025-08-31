// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import { Enumeradores } from "/utils/Enumeradores.sol";

contract Estruturas {
    struct Contrato{
        address estadual;
        address municipal;
    }

    struct Aplicacao{
        uint256 percentualMinimo;
        uint256 percentualAplicado;
        uint256 valorAplicado;
        uint256 valorArrecadado;
        uint256 valorDistribuido;
    }

    struct Despesa{
        uint256 id;
        address emitente;
        address fornecedor;
        Enumeradores.Situacao situacao;
        uint256 valor;
    }
}