import type { TypeTipoOrgao } from "./TipoOrgao";

export type TypeEventoPermissao = {
  admin: string;
  tipoContrato: TypeTipoOrgao;
  contratoAntigo: string;
  contratoNovo: string;
};
