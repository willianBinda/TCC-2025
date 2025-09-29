import type { TypeTipoOrgao } from "./TipoOrgao";
import type { TypeTipoSituacao } from "./TipoSituacao";

export type TypeEventoMestre = {
  orgao: string;
  valor: bigint;
  justificativa: string;
  txAnterior?: string;
  fornecedor?: string;
  despesaId?: bigint;
  situacao?: TypeTipoSituacao;
  destino?: TypeTipoOrgao;
};
