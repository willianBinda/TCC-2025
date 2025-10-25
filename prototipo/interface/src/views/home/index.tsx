import { useEffect, useState } from "react";
import type { TypeAplicacao } from "../../types/Aplicacao";
import { buscarAplicacao } from "../../services/arrecadacaoDistribuicao";
import ArrecadacaoDistribuicao from "../../components/arrecadacaoDistribuicao";
import Grafico from "../../components/graficos";
import { Tabela } from "../../components/tabela";
import { buscarEventos } from "../../services/tabela";
import type { TypeEventoMestreFormatado } from "../../types/EventoMestre";

const Home = () => {
  const [aplicacao, setAplicacao] = useState<TypeAplicacao[]>([]);
  const [arrecadacao, setArrecadacao] = useState(0n);
  const [distribuicao, setDistribuicao] = useState(0n);
  const [dadosTabela, setDadosTabela] = useState<TypeEventoMestreFormatado[]>([]);
  useEffect(() => {
    buscarAplicacao()
      .then((res) => {
        setAplicacao(res.aplicacoes);
        setArrecadacao(res.valorTotalArrecadado);
        setDistribuicao(res.valorTotalDistribuido);
      })
      .catch(() => {
        // console.log("ERRO: ", err);
      });
    buscarEventos()
      .then((res) => {
        setDadosTabela(res);
      })
      .catch();
  }, []);
  return (
    <>
      <ArrecadacaoDistribuicao arrecadacao={arrecadacao} distribuicao={distribuicao} />
      <Grafico aplicacao={aplicacao} />
      <Tabela dados={dadosTabela} />
    </>
  );
};

export default Home;
