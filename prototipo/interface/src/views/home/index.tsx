import { useEffect, useState } from "react";
import type { TypeAplicacao } from "../../types/Aplicacao";
import { buscarAplicacao } from "../../services/arrecadacaoDistribuicao";
import ArrecadacaoDistribuicao from "../../components/arrecadacaoDistribuicao";
import Grafico from "../../components/graficos";

const Home = () => {
  const [aplicacao, setAplicacao] = useState<TypeAplicacao[]>([]);
  const [arrecadacao, setArrecadacao] = useState(0n);
  const [distribuicao, setDistribuicao] = useState(0n);
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
  }, []);
  return (
    <>
      <ArrecadacaoDistribuicao arrecadacao={arrecadacao} distribuicao={distribuicao} />
      <Grafico aplicacao={aplicacao} />
      <div>Interface</div>
    </>
  );
};

export default Home;
