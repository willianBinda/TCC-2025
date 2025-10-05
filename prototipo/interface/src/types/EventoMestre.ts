import type { TypeTipoOrgao } from "./TipoOrgao";
import type { TypeTipoSituacao } from "./TipoSituacao";

export type TypeEventoMestre = {
  orgao: string;
  valor: bigint;
  justificativa: string;
  data: string;
  timestemp: number;
  txAnterior?: string;
  fornecedor?: string;
  despesaId?: bigint;
  situacao?: TypeTipoSituacao;
  destino?: TypeTipoOrgao;
};

export type TypeEventoMestreFormatado = {
  orgao: string;
  valor: string;
  justificativa: string;
  data: string;
  timestemp: number;
  txAnterior: string;
  fornecedor: string;
  descricaoSituacao: string;
  situacao: TypeTipoSituacao;
  origem: string;
  destino: string;
  despesaId?: bigint;
  tipoEvento?: string;
};
