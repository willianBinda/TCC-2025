import type { ContratosType } from "../../types/Contrato";
import type { PermissoesUsuarioType } from "../../types/Permissao";

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

export const pegarContratoOrgao = (contratos: ContratosType, permissoes: PermissoesUsuarioType) => {
  for (const _contrato of contratos) {
    if (permissoes.orgao.includes(_contrato.nome)) {
      return _contrato.contrato;
    }
  }
};

export const pegarContratoFornecedor = (contratos: ContratosType, permissoes: PermissoesUsuarioType) => {
  for (const _contrato of contratos) {
    if (permissoes.fornecedor.includes(_contrato.nome)) {
      return _contrato.contrato;
    }
  }
};
