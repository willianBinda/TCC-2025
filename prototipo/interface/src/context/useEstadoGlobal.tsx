import { useContext } from "react";
import { ContextoEstados } from ".";

export function useEstadoGlobal() {
  const contexto = useContext(ContextoEstados);
  if (!contexto) throw new Error("usarEstadoGlobal deve ser usado dentro do ProvedorEstados");
  return contexto;
}
