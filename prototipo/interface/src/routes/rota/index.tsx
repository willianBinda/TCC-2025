import { Navigate } from "react-router-dom";

interface Props {
  podeAcessar: boolean;
  children: React.ReactNode;
}

export function RotaProtegida({ podeAcessar, children }: Props) {
  if (!podeAcessar) {
    return <Navigate to="/" replace />; // redireciona se não tiver permissão
  }
  return <>{children}</>;
}
