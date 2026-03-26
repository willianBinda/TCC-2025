import { formatEther, parseEther } from "ethers";

export const formatarValor = (_valor: bigint | number | string) => {
  let numero: number;

  if (typeof _valor === "bigint") {
    numero = Number(formatEther(_valor));
  } else if (typeof _valor === "string") {
    numero = Number(_valor);
  } else {
    numero = _valor;
  }

  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 6, // mantém casas decimais do ETH
  });
};

export const transformarValor = (valor: string) => {
  const valorSemFormato = valor.replace(/\D/g, "");
  const valorNumerico = Number(valorSemFormato) / 100;
  const valorString = valorNumerico.toString();
  return parseEther(valorString);
};
