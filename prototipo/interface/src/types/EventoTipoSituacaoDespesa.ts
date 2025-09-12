import type { TypeTipoSituacao } from "./TipoSituacao";

export type TypeEventoPermissao = {
  situacao: TypeTipoSituacao;
  despesaId: bigint;
};
