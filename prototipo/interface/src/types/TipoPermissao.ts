import type { EnumTipoPermissao } from "../enum/EnumTipoPermissao";

export type TypeTipoPermissao = (typeof EnumTipoPermissao)[keyof typeof EnumTipoPermissao];
