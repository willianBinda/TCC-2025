import { EnumAlerta } from "../../enum/EnumAlerta";
import type { ContratosType } from "../../types/Contrato";
import type { PermissoesUsuarioType } from "../../types/Permissao";
import { pegarContratoOrgao } from "../../utils/form";
import { EnumTipoOrgao } from "../../enum/EnumTipoOrgao";
import { transformarValor } from "..";
import { ethers } from "ethers";

export const buscarFornecedoresAtivos = async (contratos: ContratosType, permissoes: PermissoesUsuarioType) => {
  const contrato = pegarContratoOrgao(contratos, permissoes);
  return await contrato!.buscarFornecedoresAtivos();
};

export const registrar = async (
  contratos: ContratosType,
  permissoes: PermissoesUsuarioType,
  setAlerta: (alerta: EnumAlerta) => void,
  valor: string,
  enderecoFornecedor: string,
  justificativa: string,
  txAnterior?: string
) => {
  if (!contratos.length || !permissoes.orgao.length) {
    setAlerta(EnumAlerta.Contrato);
    return;
  }

  if (valor === "" || justificativa.trim() === "" || enderecoFornecedor === "") {
    setAlerta(EnumAlerta.Formulario);
    return;
  }

  const contrato = pegarContratoOrgao(contratos, permissoes);

  if (!contrato) {
    setAlerta(EnumAlerta.Contrato);
    return;
  }

  const valorEther = transformarValor(valor);

  if (permissoes.orgao.includes(EnumTipoOrgao.FEDERAL)) {
    const tx = await contrato.registrar(valorEther, enderecoFornecedor, justificativa);
    await tx.wait();
    // console.log(tx);
    // console.log("-----------");
    // console.log(receipt);
  } else if (permissoes.orgao.includes(EnumTipoOrgao.ESTADUAL)) {
    const _txAnterior = txAnterior !== "" ? txAnterior : ethers.ZeroHash;
    const tx = await contrato.registrar(valorEther, enderecoFornecedor, justificativa, _txAnterior);
    await tx.wait();
  } else if (permissoes.orgao.includes(EnumTipoOrgao.MUNICIPAL)) {
    const _txAnterior = txAnterior !== "" ? txAnterior : ethers.ZeroHash;
    const tx = await contrato.registrar(valorEther, enderecoFornecedor, justificativa, _txAnterior);
    await tx.wait();
  } else {
    throw new Error("Sem permissão");
  }
};
