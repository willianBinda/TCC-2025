import { formatarValor } from "..";
import type { ContratosType } from "../../types/Contrato";
import type { PermissoesUsuarioType } from "../../types/Permissao";
import { pegarContratoOrgao } from "../../utils/form";

export const buscarSaldo = async (constratos: ContratosType, permissoes: PermissoesUsuarioType) => {
  const contrato = pegarContratoOrgao(constratos, permissoes);

  const saldo = await contrato?.buscarSaldo();

  return formatarValor(saldo);
};
