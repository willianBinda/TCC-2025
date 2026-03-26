enum TipoEvento {
  Distribuicao,
  Despesa,
}

const TipoEventoHelper = (tipo: TipoEvento) => {
  switch (tipo) {
    case TipoEvento.Distribuicao:
      return "Distribuição";
    case TipoEvento.Despesa:
      return "Despesa";
    default:
      return "";
  }
};

const ObterDescricaoPorNome = (tipo: string) => {
  switch (tipo) {
    case "EventoDistribuicao":
      return TipoEventoHelper(TipoEvento.Distribuicao);
    case "EventoDespesa":
      return TipoEventoHelper(TipoEvento.Despesa);
    default:
      return "";
  }
};

const ObterTipoEventoPorNome = (tipo: string) => {
  switch (tipo) {
    case "EventoDistribuicao":
      return TipoEvento.Distribuicao;
    case "EventoDespesa":
      return TipoEvento.Despesa;
    default:
      return "";
  }
};

const enumTipoEvento = {
  TipoEvento,
  TipoEventoHelper,
  ObterDescricaoPorNome,
  ObterTipoEventoPorNome,
};

export default enumTipoEvento;
