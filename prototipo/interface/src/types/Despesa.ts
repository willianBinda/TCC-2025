import type { TypeTipoSituacao } from "./TipoSituacao";

export type TypeDespesa = {
  id: bigint;
  emitente: string;
  fornecedor: string;
  situacao: TypeTipoSituacao;
  valor: bigint;
};
