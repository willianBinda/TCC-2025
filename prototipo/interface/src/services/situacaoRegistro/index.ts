import { EnumAlerta } from "../../enum/EnumAlerta";
import { CodeHelper } from "../../enum/EnumProviderRpcError";
import type { ContratosType } from "../../types/Contrato";
import type { TypeDespesa } from "../../types/Despesa";
import type { ProviderRpcErrorType } from "../../types/errorRPC";
import type { PermissoesUsuarioType } from "../../types/Permissao";
import type { TypeTipoSituacao } from "../../types/TipoSituacao";
import { pegarContratoFornecedor, pegarContratoOrgao } from "../../utils/form";

const confirmarRecebimento = async (
  contratos: ContratosType,
  permissoes: PermissoesUsuarioType,
  setAlerta: (alerta: EnumAlerta) => void,
  despesaId: bigint | undefined,
  atualizarSituacao: (id: bigint, nova: TypeTipoSituacao, txId: string) => void,
  txId: string
) => {
  if (!contratos.length || !permissoes.orgao.length) {
    setAlerta(EnumAlerta.Contrato);
    return;
  }

  if (!despesaId) {
    setAlerta(EnumAlerta.DespesaId);
    return;
  }

  const contrato = pegarContratoOrgao(contratos, permissoes);

  if (!contrato) {
    setAlerta(EnumAlerta.Contrato);
    return;
  }

  if (permissoes.orgao.length) {
    // console.log(contrato);
    try {
      const tx = await contrato.confirmarRecebimento(despesaId);
      await tx.wait();
      // console.log("recebido: ", receipt);
      const despesa: TypeDespesa = await contrato.despesas(despesaId);
      // console.log(despesa);
      // console.log("despesa: ", despesa);
      atualizarSituacao(despesaId, despesa.situacao, txId);
    } catch (error) {
      const rpcError = error as ProviderRpcErrorType;
      // console.log(CodeHelper(rpcError.code));
      console.log(rpcError.data);
      setAlerta(EnumAlerta.Falha);
    }
  } else {
    throw new Error("Sem permissão");
  }
};

const confirmarEntrega = async (
  contratos: ContratosType,
  permissoes: PermissoesUsuarioType,
  setAlerta: (alerta: EnumAlerta) => void,
  despesaId: bigint | undefined,
  atualizarSituacao: (id: bigint, nova: TypeTipoSituacao, txId: string) => void,
  enderecoContrato: string,
  txId: string
) => {
  if (!contratos.length || !permissoes.fornecedor.length) {
    setAlerta(EnumAlerta.Contrato);
    return;
  }

  if (!despesaId) {
    setAlerta(EnumAlerta.DespesaId);
    return;
  }

  const contrato = pegarContratoFornecedor(contratos, permissoes, enderecoContrato);

  if (!contrato) {
    setAlerta(EnumAlerta.Contrato);
    return;
  }

  if (permissoes.fornecedor.length) {
    // console.log(despesaId);
    try {
      // console.log(contrato);
      const tx = await contrato.confirmarEntrega(despesaId);
      await tx.wait();
      const despesa: TypeDespesa = await contrato.despesas(despesaId);

      atualizarSituacao(despesaId, despesa.situacao, txId);
    } catch (error) {
      // console.log(Object.keys(error));
      // console.log(error.code);
      const rpcError = error as ProviderRpcErrorType;
      console.log(CodeHelper(rpcError.code));
      // throw new Error("Sem permissão");
      setAlerta(EnumAlerta.Falha);
    }

    // console.log("despesa: ", despesa);
  } else {
    throw new Error("Sem permissão");
  }
};

export { confirmarRecebimento, confirmarEntrega };
