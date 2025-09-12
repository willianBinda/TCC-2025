import type { TypeTipoPermissao } from "./TipoPermissao";

export type TypeEventoPermissao = {
  admin: string;
  endereco: string;
  tipoPermissao: TypeTipoPermissao;
};
