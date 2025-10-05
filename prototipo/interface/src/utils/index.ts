import { ENDERECO_CONTRATO_ESTADUAL, ENDERECO_CONTRATO_FEDERAL, ENDERECO_CONTRATO_MUNICIPAL } from "../config/constantes";
import { EnumTipoOrgao } from "../enum/EnumTipoOrgao";

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

export { getOrigemTransacao };
