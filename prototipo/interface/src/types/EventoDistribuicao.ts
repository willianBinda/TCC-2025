import type { TypeTipoOrgao } from "./TipoOrgao";

export type TypeEventoDistribuicao = {
  txAnterior?: string;
  orgao: string;
  destino: TypeTipoOrgao;
  valor: bigint;
  justificativa: string;
};
