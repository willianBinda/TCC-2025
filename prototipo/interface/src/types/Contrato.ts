import type { Contract } from "ethers";
import type { TypeTipoOrgao } from "./TipoOrgao";

export type TypeContrato = {
  estadual: string;
  municipal: string;
};

export type ContratoPermissaoType = Contract & {
  temPermissaoOrgao(): Promise<boolean>;
  temPermissaoFornecedor(): Promise<boolean>;
  temPermissaoAdmin(): Promise<boolean>;
};

export type ContratosType = { nome: TypeTipoOrgao; contrato: Contract }[];
