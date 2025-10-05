import { ethers, type JsonRpcProvider } from "ethers";
import type { TypeEventoMestre, TypeEventoMestreFormatado } from "../../types/EventoMestre";
import type { TypeEvento } from "../../types/Evento";
import { formatarValor } from "../../services";
import { getDescricaoSituacao } from "../../enum/EnumTipoSituacao";
import { getDescricaoTipoOrgao } from "../../enum/EnumTipoOrgao";
import { getOrigemTransacao } from "..";
import enumTipoEvento from "../../enum/EnumTipoEvento";

export const pegarDataEvento = async (provider: JsonRpcProvider, numeroBloco: number) => {
  const bloco = await provider.getBlock(numeroBloco);

  if (!bloco?.timestamp) return { data: "", timestemp: 0 };

  const data = new Date(bloco.timestamp * 1000);
  return { data: `${data.toLocaleDateString("pt-BR")} ${data.toLocaleTimeString("pt-BR")}`, timestemp: bloco.timestamp };
};

export const formatarEvento = async (
  provider: JsonRpcProvider,
  eventos: TypeEvento<TypeEventoMestre>
): Promise<TypeEventoMestreFormatado[]> => {
  const resultado = await Promise.all(
    eventos.map(async (evento) => {
      const { data, timestemp } = await pegarDataEvento(provider, evento.blockNumber);
      // console.log(evento);
      return {
        data,
        timestemp,
        destino: getDescricaoTipoOrgao(evento.args?.destino),
        origem: getDescricaoTipoOrgao(getOrigemTransacao(evento.address)),
        justificativa: evento.args.justificativa ?? "",
        orgao: evento.args.orgao ?? "",
        valor: formatarValor(evento.args.valor),
        despesaId: evento.args.despesaId,
        fornecedor: evento.args.fornecedor ?? "",
        descricaoSituacao: getDescricaoSituacao(evento.args?.situacao),
        situacao: evento.args?.situacao,
        txAnterior: formatarTxAnterior(evento.args.txAnterior),
        tipoEvento: enumTipoEvento.ObterDescricaoPorNome(evento.fragment.name),
      } as TypeEventoMestreFormatado;
    })
  );
  resultado.sort((a, b) => b.timestemp - a.timestemp);

  return resultado;
};

const formatarTxAnterior = (txAnterior?: string) => {
  if (!txAnterior) return "";
  if (txAnterior === ethers.ZeroHash) return "";
  return txAnterior;
};
