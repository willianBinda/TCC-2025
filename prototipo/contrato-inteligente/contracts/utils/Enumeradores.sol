// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract Enumeradores {
    enum TipoOrgao {
        FEDERAL,
        ESTADUAL,
        MUNICIPAL
    }
    enum TipoPermissao {
        ORGAO,
        FORNECEDOR
    }
    enum Situacao {
        PENDENTE,
        ENTREGUE,
        RECEBIDO,
        FINALIZADO
    }
}
