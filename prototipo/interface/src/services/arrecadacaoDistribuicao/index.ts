import { ethers } from "ethers";
import {
  ABI_ESTADUAL,
  ABI_FEDERAL,
  ABI_MUNICIPAL,
  ENDERECO_CONTRATO_ESTADUAL,
  ENDERECO_CONTRATO_FEDERAL,
  ENDERECO_CONTRATO_MUNICIPAL,
  RPC_URL,
} from "../../config/constantes";
import type { TypeAplicacao } from "../../types/Aplicacao";

export const buscarAplicacao = async () => {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const contratoFederal = new ethers.Contract(ENDERECO_CONTRATO_FEDERAL, ABI_FEDERAL, provider);
  const contratoEstadual = new ethers.Contract(ENDERECO_CONTRATO_ESTADUAL, ABI_ESTADUAL, provider);
  const contratoMunicipal = new ethers.Contract(ENDERECO_CONTRATO_MUNICIPAL, ABI_MUNICIPAL, provider);

  const aplicacoes: TypeAplicacao[] = [];
  let valorTotalArrecadado = 0n;
  let valorTotalDistribuido = 0n;

  for (const contrato of [contratoFederal, contratoEstadual, contratoMunicipal]) {
    const aplicacao: TypeAplicacao = await contrato.aplicacao();
    aplicacoes.push(aplicacao);
    valorTotalArrecadado += aplicacao.valorArrecadado;
    valorTotalDistribuido += aplicacao.valorDistribuido;
  }
  // console.log(aplicacoes);
  return { aplicacoes, valorTotalArrecadado, valorTotalDistribuido };
};
