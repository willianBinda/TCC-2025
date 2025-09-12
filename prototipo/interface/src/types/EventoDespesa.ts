import type { TypeTipoSituacao } from "./TipoSituacao";

export type TypeEventoDistribuicao = {
  txAnterior?: string;
  orgao: string;
  fornecedor: string;
  despesaId: bigint;
  valor: bigint;
  situacao: TypeTipoSituacao;
  justificativa: string;
};
