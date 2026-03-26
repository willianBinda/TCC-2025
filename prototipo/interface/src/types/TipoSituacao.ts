import type { EnumTipoSituacao } from "../enum/EnumTipoSituacao";

export type TypeTipoSituacao = (typeof EnumTipoSituacao)[keyof typeof EnumTipoSituacao];
