//eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatarValorReal = (e: any, set: (v: string) => void) => {
  let v = e.target.value;

  v = v.replace(/\D/g, "");

  const numero = Number(v) / 100;

  const formatted = numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  set(formatted);
};
