import type { Contract } from "ethers";

export type TypeContrato = {
  estadual: string;
  municipal: string;
};

export type ContratoPermissaoType = Contract & {
  temPermissaoOrgao(): Promise<boolean>;
  temPermissaoFornecedor(): Promise<boolean>;
  temPermissaoAdmin(): Promise<boolean>;
};
