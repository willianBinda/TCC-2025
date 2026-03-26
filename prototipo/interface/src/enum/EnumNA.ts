enum TipoNA {
  NA,
}

const TipoNAHelper = (tipo?: TipoNA) => {
  switch (tipo) {
    case undefined:
      return "N/A";
    case TipoNA.NA:
      return "N/A";
    default:
      return "N/A";
  }
};

const enumNA = {
  TipoNA,
  TipoNAHelper,
};

export default enumNA;
