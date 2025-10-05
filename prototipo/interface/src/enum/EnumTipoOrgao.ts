import type { TypeTipoOrgao } from "../types/TipoOrgao";

export const EnumTipoOrgao = {
  FEDERAL: 0n,
  ESTADUAL: 1n,
  MUNICIPAL: 2n,
} as const;

export const EnumTipoOrgaoHelper = new Map<TypeTipoOrgao, string>([
  [EnumTipoOrgao.FEDERAL, "Federal"],
  [EnumTipoOrgao.ESTADUAL, "Estadual"],
  [EnumTipoOrgao.MUNICIPAL, "Municipal"],
]);

export function getDescricaoTipoOrgao(destino?: TypeTipoOrgao | null): string {
  if (destino === undefined || destino === null) return "";
  return EnumTipoOrgaoHelper.get(destino) ?? "";
}

// export const SituacaoCores = {
//   [SituacaoPedido.RECEBIDO]: { bg: "#d0f0c0", btn: "success" }, // verde claro
//   [SituacaoPedido.ENTREGUE]: { bg: "#add8e6", btn: "info" }, // azul claro
//   [SituacaoPedido.PENDENTE]: { bg: "#fff3b0", btn: "warning" }, // amarelo
//   [SituacaoPedido.FINALIZADO]: { bg: "#d3d3d3", btn: "secondary" }, // cinza
// };
