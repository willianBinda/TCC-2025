import type { TypeTipoSituacao } from "../types/TipoSituacao";

export const EnumTipoSituacao = {
  RECEBIDO: 0n,
  ENTREGUE: 1n,
  PENDENTE: 2n,
  FINALIZADO: 3n,
} as const;

export const EnumTipoSituacaoHelper = new Map<TypeTipoSituacao, string>([
  [EnumTipoSituacao.RECEBIDO, "Recebido"],
  [EnumTipoSituacao.ENTREGUE, "Entregue"],
  [EnumTipoSituacao.PENDENTE, "Pendente"],
  [EnumTipoSituacao.FINALIZADO, "Finalizado"],
]);
