import { Container } from "react-bootstrap";
import ReactECharts from "echarts-for-react";
import { opcoes } from "../../config/grafico";
import "../../css/grafico/index.css";
import { useEffect, useRef } from "react";
import type { TypeAplicacao } from "../../types/Aplicacao";
import { formatEther } from "ethers";

function Grafico({ aplicacao }: { aplicacao: TypeAplicacao[] }) {
  const graficoRef = useRef<ReactECharts>(null);

  useEffect(() => {
    const chart = graficoRef.current?.getEchartsInstance();
    if (!chart) return;

    // const source = (
    //   aplicacao && aplicacao.length
    //     ? aplicacao
    //     : [
    //         { valorArrecadado: 0n, valorDistribuido: 0n, valorAplicado: 0n, percentualMinimo: 0, percentualAplicado: 0 },
    //         { valorArrecadado: 0n, valorDistribuido: 0n, valorAplicado: 0n, percentualMinimo: 0, percentualAplicado: 0 },
    //         { valorArrecadado: 0n, valorDistribuido: 0n, valorAplicado: 0n, percentualMinimo: 0, percentualAplicado: 0 },
    //       ]
    // ).map((item, index) => {
    //   // converta para number para plotagem (ajuste a função de conversão conforme sua unidade)
    //   // EXEMPLO usando formatEther (se o bigint for wei):
    //   const numArrecadado = Number(formatEther(item.valorArrecadado)); // ou outro conversor
    //   const numDistribuido = Number(formatEther(item.valorDistribuido));
    //   const numAplicado = Number(formatEther(item.valorAplicado));

    //   return {
    //     orgao: index === 0 ? "Federal" : index === 1 ? "Estadual" : "Municipal",
    //     valorArrecadado: numArrecadado,
    //     valorArrecadadoRaw: item.valorArrecadado.toString(),
    //     valorDistribuido: numDistribuido,
    //     valorDistribuidoRaw: item.valorDistribuido.toString(),
    //     valorAplicado: numAplicado,
    //     valorAplicadoRaw: item.valorAplicado.toString(),
    //     percentualMinimo: item.percentualMinimo,
    //     percentualAplicado: item.percentualAplicado,
    //   };
    // });

    const defaultOrgaos = ["Federal", "Estadual", "Municipal"];

    const source = (
      aplicacao && aplicacao.length
        ? aplicacao
        : Array(3).fill({
            valorArrecadado: 0n,
            valorDistribuido: 0n,
            valorAplicado: 0n,
            percentualMinimo: 0,
            percentualAplicado: 0,
          })
    ).map((item, index) => {
      const numArrecadado = Number(formatEther(item.valorArrecadado));
      const numDistribuido = Number(formatEther(item.valorDistribuido));
      const numAplicado = Number(formatEther(item.valorAplicado));

      return {
        orgao: defaultOrgaos[index], // atribui o nome correto
        valorArrecadado: numArrecadado,
        valorArrecadadoRaw: item.valorArrecadado.toString(),
        valorDistribuido: numDistribuido,
        valorDistribuidoRaw: item.valorDistribuido.toString(),
        valorAplicado: numAplicado,
        valorAplicadoRaw: item.valorAplicado.toString(),
        percentualMinimo: item.percentualMinimo ?? 0,
        percentualAplicado: item.percentualAplicado ?? 0,
      };
    });

    chart.setOption({ dataset: { source } }, { replaceMerge: ["dataset"] });
  }, [aplicacao]);

  return (
    <Container className="container-grafico">
      <ReactECharts option={opcoes} ref={graficoRef} style={{ height: 300, width: "100%" }} />
    </Container>
  );
}

export default Grafico;
