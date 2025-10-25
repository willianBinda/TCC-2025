import { ENDERECO_CONTRATO_ESTADUAL, ENDERECO_CONTRATO_FEDERAL, ENDERECO_CONTRATO_MUNICIPAL } from "../config/constantes";
import { EnumTipoOrgao } from "../enum/EnumTipoOrgao";
import { EnumTipoSituacao } from "../enum/EnumTipoSituacao";
import type { PermissoesUsuarioType } from "../types/Permissao";
import type { TypeTipoSituacao } from "../types/TipoSituacao";

const getOrigemTransacao = (endereco_contrato: string) => {
  switch (endereco_contrato) {
    case ENDERECO_CONTRATO_FEDERAL:
      return EnumTipoOrgao.FEDERAL;
    case ENDERECO_CONTRATO_ESTADUAL:
      return EnumTipoOrgao.ESTADUAL;
    case ENDERECO_CONTRATO_MUNICIPAL:
      return EnumTipoOrgao.MUNICIPAL;
    default:
      return;
  }
};

const verificarPermissaoBotaoRecebimento = (
  permissoes: PermissoesUsuarioType,
  enderecoContratoEvento: string,
  situacao: TypeTipoSituacao,
  despesaId: bigint | undefined
) => {
  const tipoOrgao = getOrigemTransacao(enderecoContratoEvento);
  if (
    (situacao === EnumTipoSituacao.PENDENTE || situacao === EnumTipoSituacao.ENTREGUE) &&
    despesaId !== undefined &&
    tipoOrgao !== undefined &&
    permissoes.orgao.length > 0 &&
    permissoes.orgao.includes(tipoOrgao)
  )
    return true;

  return false;
};

export { getOrigemTransacao, verificarPermissaoBotaoRecebimento };
