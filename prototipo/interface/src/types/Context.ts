import type { EnumAlerta } from "../enum/EnumAlerta";
import type { ContratosType } from "./Contrato";
import type { PermissoesUsuarioType } from "./Permissao";

export type EstadosContextType = {
  connectar: () => void;
  alerta: EnumAlerta;
  setAlerta: (alerta: EnumAlerta) => void;
  enderecoUsuario: string;
  contratos: ContratosType;
  permissoes: PermissoesUsuarioType;
};
