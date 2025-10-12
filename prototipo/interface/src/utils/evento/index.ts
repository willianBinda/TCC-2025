import { ethers, type JsonRpcProvider } from "ethers";
import type { TypeEventoMestre, TypeEventoMestreFormatado } from "../../types/EventoMestre";
import type { TypeEvento } from "../../types/Evento";
import { formatarValor } from "../../services";
import { getDescricaoSituacao } from "../../enum/EnumTipoSituacao";
import { getDescricaoTipoOrgao } from "../../enum/EnumTipoOrgao";
import { getOrigemTransacao } from "..";
import enumTipoEvento from "../../enum/EnumTipoEvento";
import { ENDERECO_CONTRATO_MUNICIPAL } from "../../config/constantes";
import type { Contract } from "ethers";
import type { TypeEventoSituacaoDespesa } from "../../types/EventoTipoSituacaoDespesa";

export const pegarDataEvento = async (provider: JsonRpcProvider, numeroBloco: number) => {
  const bloco = await provider.getBlock(numeroBloco);

  if (!bloco?.timestamp) return { data: "", timestemp: 0 };

  const data = new Date(bloco.timestamp * 1000);
  return { data: `${data.toLocaleDateString("pt-BR")} ${data.toLocaleTimeString("pt-BR")}`, timestemp: bloco.timestamp };
};

export const formatarEvento = async (
  provider: JsonRpcProvider,
  eventos: TypeEvento<TypeEventoMestre>,
  contratos: Contract[]
): Promise<TypeEventoMestreFormatado[]> => {
  const resultado = await Promise.all(
    eventos.map(async (evento) => {
      const { data, timestemp } = await pegarDataEvento(provider, evento.blockNumber);

      const blocos = buscarBlocos(evento, eventos);
      const situacaoDespesa = await buscarDespesa(contratos, evento.args.despesaId, evento.fragment.name, evento.address);

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
        descricaoSituacao:
          situacaoDespesa !== undefined
            ? getDescricaoSituacao(situacaoDespesa)
            : getDescricaoSituacao(evento.args?.situacao),
        situacao: situacaoDespesa !== undefined ? situacaoDespesa : evento.args?.situacao,
        txAnterior: formatarTxAnterior(evento.args.txAnterior),
        tipoEvento: enumTipoEvento.ObterDescricaoPorNome(evento.fragment.name),
        txId: evento.transactionHash,
        blocos,
        enderecoContrato: evento.address,
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

const buscarBlocos = (
  evento: {
    args: TypeEventoMestre;
  } & ethers.Log &
    ethers.EventLog,
  eventos: TypeEvento<TypeEventoMestre>
) => {
  const blocos = [evento.transactionHash];
  const txAnterior = evento.args.txAnterior;

  if (txAnterior && txAnterior !== ethers.ZeroHash) {
    blocos.unshift(txAnterior);
    if (evento.address === ENDERECO_CONTRATO_MUNICIPAL) {
      const txInicial = verificarTxAnterior(txAnterior, eventos);
      if (txInicial) blocos.unshift(txInicial);
    }
  }

  return blocos;
};

const verificarTxAnterior = (txAnterior: string, eventos: TypeEvento<TypeEventoMestre>) => {
  for (let index = 0; index < eventos.length; index++) {
    if (eventos[index].transactionHash === txAnterior) {
      if (eventos[index].args.txAnterior && eventos[index].args.txAnterior !== ethers.ZeroHash) {
        return eventos[index].args.txAnterior;
      }
    }
  }
};

const buscarDespesa = async (
  contratos: Contract[],
  despesaId: bigint | undefined,
  nomeEvento: string,
  enderecoContrato: string
) => {
  if (enumTipoEvento.ObterTipoEventoPorNome(nomeEvento) === enumTipoEvento.TipoEvento.Despesa) {
    for (let index = 0; index < contratos.length; index++) {
      if ((await contratos[index].getAddress()) === enderecoContrato) {
        // console.log("despesaID evento: ", despesaId);
        const filtro = contratos[index].filters.EventoSituacaoDespesa(null, despesaId);
        const despesa = (await contratos[index].queryFilter(
          filtro,
          0,
          "latest"
        )) as unknown as TypeEvento<TypeEventoSituacaoDespesa>;
        // console.log("despesa: ", despesa);
        return despesa.at(-1)?.args?.situacao;
      }
    }
  }
};
