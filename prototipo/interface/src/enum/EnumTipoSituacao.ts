import type { TypeTipoSituacao } from "../types/TipoSituacao";

export const EnumTipoSituacao = {
  PENDENTE: 0n,
  ENTREGUE: 1n,
  RECEBIDO: 2n,
  FINALIZADO: 3n,
} as const;

const EnumTipoSituacaoHelper = new Map<TypeTipoSituacao, string>([
  [EnumTipoSituacao.PENDENTE, "Pendente"],
  [EnumTipoSituacao.ENTREGUE, "Entregue"],
  [EnumTipoSituacao.RECEBIDO, "Recebido"],
  [EnumTipoSituacao.FINALIZADO, "Finalizado"],
]);

export function getDescricaoSituacao(situacao?: TypeTipoSituacao | null): string {
  if (situacao === undefined || situacao === null) return "";
  return EnumTipoSituacaoHelper.get(situacao) ?? "";
}

export const ObterCssSituacao = (tipo: TypeTipoSituacao) => {
  switch (tipo) {
    case EnumTipoSituacao.PENDENTE:
      return { className: "situacao-pendente" };
    case EnumTipoSituacao.ENTREGUE:
      return { className: "situacao-entregue" };
    case EnumTipoSituacao.RECEBIDO:
      return { className: "situacao-recebido" };
    case EnumTipoSituacao.FINALIZADO:
      return { className: "situacao-finalizado" };
    default:
      return { className: "situacao-outro" };
  }
};
