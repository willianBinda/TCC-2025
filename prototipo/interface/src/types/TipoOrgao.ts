import type { EnumTipoOrgao } from "../enum/EnumTipoOrgao";

export type TypeTipoOrgao = (typeof EnumTipoOrgao)[keyof typeof EnumTipoOrgao];
