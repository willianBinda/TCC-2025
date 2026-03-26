import type { TypeTipoOrgao } from "./TipoOrgao";

export type PermissoesUsuarioType = {
  orgao: TypeTipoOrgao[];
  fornecedor: TypeTipoOrgao[];
};
