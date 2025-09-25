import { transformarValor } from "..";
import { EnumAlerta } from "../../enum/EnumAlerta";
import { EnumTipoOrgao } from "../../enum/EnumTipoOrgao";
import type { ContratosType } from "../../types/Contrato";
import type { PermissoesUsuarioType } from "../../types/Permissao";
import { pegarContratoOrgao } from "../../utils/form";

export const distribuir = async (
  contratos: ContratosType,
  permissoes: PermissoesUsuarioType,
  setAlerta: (alerta: EnumAlerta) => void,
  valor: string,
  justificativa: string,
  destino?: string,
  txAnterior?: string
) => {
  if (!contratos.length || !permissoes.orgao.length) {
    setAlerta(EnumAlerta.Contrato);
    return;
  }

  if (valor === "" || justificativa.trim() === "" || destino === "" || !destino) {
    setAlerta(EnumAlerta.Formulario);
    return;
  }

  if (permissoes.orgao.includes(EnumTipoOrgao.FEDERAL) && BigInt(destino) === EnumTipoOrgao.FEDERAL) {
    setAlerta(EnumAlerta.Falha);
    return;
  }

  const contrato = pegarContratoOrgao(contratos, permissoes);

  if (!contrato) {
    setAlerta(EnumAlerta.Contrato);
    return;
  }

  const valorEther = transformarValor(valor);

  if (permissoes.orgao.includes(EnumTipoOrgao.FEDERAL)) {
    const tx = await contrato.distribuir(valorEther, destino, justificativa);
    await tx.wait();
    // console.log(tx);
    // console.log("-----------");
    // console.log(receipt);
  }
};
