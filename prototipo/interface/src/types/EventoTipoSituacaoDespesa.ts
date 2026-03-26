import type { TypeTipoSituacao } from "./TipoSituacao";

export type TypeEventoSituacaoDespesa = {
  situacao: TypeTipoSituacao;
  despesaId: bigint;
};
