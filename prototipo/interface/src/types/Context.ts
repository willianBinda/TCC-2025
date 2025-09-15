import type { EnumAlerta } from "../enum/EnumAlerta";

export type EstadosContextType = {
  connectar: () => void;
  alerta: EnumAlerta;
  setAlerta: (alerta: EnumAlerta) => void;
  enderecoUsuario: string;
};
