import type { JsonRpcProvider } from "ethers";

export const pegarDataEvento = async (provider: JsonRpcProvider, numeroBloco: number) => {
  const bloco = await provider.getBlock(numeroBloco);

  if (!bloco?.timestamp) return { data: "", timestemp: 0 };

  const data = new Date(bloco.timestamp * 1000);
  return { data: `${data.toLocaleDateString("pt-BR")} ${data.toLocaleTimeString("pt-BR")}`, timestemp: bloco.timestamp };
};
