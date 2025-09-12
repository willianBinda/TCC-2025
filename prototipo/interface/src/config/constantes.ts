import contratoFederal from "../assets/Federal.json";
import contratoEstadual from "../assets/Estadual.json";
import contratoMunicipal from "../assets/Municipal.json";

export const RPC_URL = import.meta.env.VITE_RPC_URL ?? "";
export const ENDERECO_CONTRATO_FEDERAL = import.meta.env.VITE_ENDERECO_CONTRATO_FEDERAL ?? "";
export const ENDERECO_CONTRATO_ESTADUAL = import.meta.env.VITE_ENDERECO_CONTRATO_ESTADUAL ?? "";
export const ENDERECO_CONTRATO_MUNICIPAL = import.meta.env.VITE_ENDERECO_CONTRATO_MUNICIPAL ?? "";

export const ABI_FEDERAL = contratoFederal.abi;
export const ABI_ESTADUAL = contratoEstadual.abi;
export const ABI_MUNICIPAL = contratoMunicipal.abi;
