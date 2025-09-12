import type { TypeTipoPermissao } from "../types/TipoPermissao";

export const EnumTipoPermissao = {
  ORGAO: 0n,
  FORNECEDOR: 1n,
} as const;

export const EnumTipoPermissaoHelper = new Map<TypeTipoPermissao, string>([
  [EnumTipoPermissao.ORGAO, "Permissão de Orgão do Governo"],
  [EnumTipoPermissao.FORNECEDOR, "Permissão de Fornecedor"],
]);
