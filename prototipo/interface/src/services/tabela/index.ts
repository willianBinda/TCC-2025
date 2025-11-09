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
import type { TypeEvento } from "../../types/Evento";
import type { Contract } from "ethers";
import type { TypeEventoMestre, TypeEventoMestreFormatado } from "../../types/EventoMestre";
import { formatarEvento } from "../../utils/evento";
import type { JsonRpcProvider } from "ethers";
import { buscarAplicacao } from "../arrecadacaoDistribuicao";

export const escutarEventos = async (
  setLinhas: (val: TypeEventoMestreFormatado[]) => void,
  contratos: Contract[],
  provider: JsonRpcProvider,
  setAplicacao: any,
  setArrecadacao: any,
  setDistribuicao: any
) => {
  await contratos[0].on("*", async (event) => {
    if (event.fragment.name === "EventoDespesa" || event.fragment.name === "EventoDistribuicao") {
      const a: TypeEvento<TypeEventoMestre> = [event.log];
      const resultado = await formatarEvento(provider, a, contratos);
      const novoItem = resultado[0];
      setLinhas((prev: TypeEventoMestreFormatado[]) => {
        // Verifica se o txid já existe na lista
        const existe = prev.some((item: TypeEventoMestreFormatado) => item.txId === novoItem.txId);

        if (existe) {
          return prev;
        }

        return [novoItem, ...prev]; // adiciona no topo
      });

      const aplicacao = await buscarAplicacao();

      setAplicacao(aplicacao.aplicacoes);
      setArrecadacao(aplicacao.valorTotalArrecadado);
      setDistribuicao(aplicacao.valorTotalDistribuido);
    }

    // event.removeListener();
  });

  await contratos[1].on("*", async (event) => {
    if (event.fragment.name === "EventoDespesa" || event.fragment.name === "EventoDistribuicao") {
      const a: TypeEvento<TypeEventoMestre> = [event.log];
      const resultado = await formatarEvento(provider, a, contratos);
      const novoItem = resultado[0];
      setLinhas((prev: TypeEventoMestreFormatado[]) => {
        // Verifica se o txid já existe na lista
        const existe = prev.some((item: TypeEventoMestreFormatado) => item.txId === novoItem.txId);

        if (existe) {
          return prev;
        }

        return [novoItem, ...prev]; // adiciona no topo
      });
      const aplicacao = await buscarAplicacao();

      setAplicacao(aplicacao.aplicacoes);
      setArrecadacao(aplicacao.valorTotalArrecadado);
      setDistribuicao(aplicacao.valorTotalDistribuido);
    }

    // event.removeListener();
  });

  await contratos[2].on("*", async (event) => {
    if (event.fragment.name === "EventoDespesa" || event.fragment.name === "EventoDistribuicao") {
      const a: TypeEvento<TypeEventoMestre> = [event.log];
      const resultado = await formatarEvento(provider, a, contratos);
      const novoItem = resultado[0];
      setLinhas((prev: TypeEventoMestreFormatado[]) => {
        // Verifica se o txid já existe na lista
        const existe = prev.some((item: TypeEventoMestreFormatado) => item.txId === novoItem.txId);

        if (existe) {
          return prev;
        }

        return [novoItem, ...prev]; // adiciona no topo
      });
      const aplicacao = await buscarAplicacao();

      setAplicacao(aplicacao.aplicacoes);
      setArrecadacao(aplicacao.valorTotalArrecadado);
      setDistribuicao(aplicacao.valorTotalDistribuido);
    }

    // event.removeListener();
  });
};

export const buscarEventos = async () => {
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  const contratoFederal = new ethers.Contract(ENDERECO_CONTRATO_FEDERAL, ABI_FEDERAL, provider);
  const contratoEstadual = new ethers.Contract(ENDERECO_CONTRATO_ESTADUAL, ABI_ESTADUAL, provider);
  const contratoMunicipal = new ethers.Contract(ENDERECO_CONTRATO_MUNICIPAL, ABI_MUNICIPAL, provider);

  const eventos = [
    ...(await eventosFederal(contratoFederal)).flat(),
    ...(await eventosEstadual(contratoEstadual)).flat(),
    ...(await eventosMunicipal(contratoMunicipal)).flat(),
  ];
  // console.log(eventos);
  const resultado = await formatarEvento(provider, eventos, [contratoFederal, contratoEstadual, contratoMunicipal]);

  return resultado;
};

const eventosFederal = async (contrato: Contract) => {
  const filter = contrato.filters.EventoDistribuicao(null, null);
  const filterDespesa = contrato.filters.EventoDespesa(null, null);
  const destribuicao = (await contrato.queryFilter(filter, 0, "latest")) as unknown as TypeEvento<TypeEventoMestre>;
  const despesa = (await contrato.queryFilter(filterDespesa, 0, "latest")) as unknown as TypeEvento<TypeEventoMestre>;
  return [destribuicao, despesa];
};

const eventosEstadual = async (contrato: Contract) => {
  const filter = contrato.filters.EventoDistribuicao(null, null, null);
  const destribuicao = (await contrato.queryFilter(filter, 0, "latest")) as unknown as TypeEvento<TypeEventoMestre>;

  const filterDespesa = contrato.filters.EventoDespesa(null, null, null);
  const despesa = (await contrato.queryFilter(filterDespesa, 0, "latest")) as unknown as TypeEvento<TypeEventoMestre>;

  return [destribuicao, despesa];
};

const eventosMunicipal = async (contrato: Contract) => {
  const filter = contrato.filters.EventoDespesa(null, null, null);
  const resultado = (await contrato.queryFilter(filter, 0, "latest")) as unknown as TypeEvento<TypeEventoMestre>;
  return [resultado];
};
