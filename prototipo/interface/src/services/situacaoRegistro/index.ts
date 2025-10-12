import { EnumAlerta } from "../../enum/EnumAlerta";
import type { ContratosType } from "../../types/Contrato";
import type { PermissoesUsuarioType } from "../../types/Permissao";
import { pegarContratoOrgao } from "../../utils/form";

const confirmarRecebimento = async (
  contratos: ContratosType,
  permissoes: PermissoesUsuarioType,
  setAlerta: (alerta: EnumAlerta) => void,
  despesaId: bigint | undefined
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
    const tx = await contrato.confirmarRecebimento(despesaId);
    await tx.wait();
  } else {
    throw new Error("Sem permissão");
  }
};

export { confirmarRecebimento };
