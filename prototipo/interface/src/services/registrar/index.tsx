import type { Contract } from "ethers";
import { EnumAlerta } from "../../enum/EnumAlerta";
import type { ContratosType } from "../../types/Contrato";
import type { PermissoesUsuarioType } from "../../types/Permissao";

export const registrar = (
  contratos: ContratosType,
  permissoes: PermissoesUsuarioType,
  setAlerta: (alerta: EnumAlerta) => void,
  e: React.FormEvent,
  valor: string,
  justificativa: string,
  destino?: string,
  txAnterior?: string
) => {
  e.preventDefault();

  if (!contratos.length || !permissoes.orgao.length) {
    setAlerta(EnumAlerta.Contrato);
    return;
  }

  if (valor === "" || justificativa.trim() === "") {
    setAlerta(EnumAlerta.Formulario);
    return;
  }

  const valorNumerico = Number(valor.replace(/\D/g, "")) / 100;

  console.log({
    valor: valorNumerico,
    justificativa,
  });

  const contrato: Contract | null = null;
  for (const _contrato of contratos) {
    if (permissoes.orgao.includes(_contrato.nome)) {
      console.log(permissoes);
      console.log(_contrato);
    }
  }
};
