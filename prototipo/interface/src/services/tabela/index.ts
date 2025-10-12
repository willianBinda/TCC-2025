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
import type { TypeEventoMestre } from "../../types/EventoMestre";
import { formatarEvento } from "../../utils/evento";

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
