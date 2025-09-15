import { Container } from "react-bootstrap";
import ReactECharts from "echarts-for-react";
import { opcoes } from "../../config/grafico";
import "../../css/grafico/index.css";
import { useEffect, useRef } from "react";
import type { TypeAplicacao } from "../../types/Aplicacao";

function Grafico({ aplicacao }: { aplicacao: TypeAplicacao[] }) {
  const graficoRef = useRef<ReactECharts>(null);

  useEffect(() => {
    const chart = graficoRef.current?.getEchartsInstance();
    if (chart) {
      const series: {
        data: {
          value: bigint;
          name: string;
        }[];
      }[] = [];

      if (!aplicacao || !aplicacao.length) {
        for (let i = 0; i < 3; i++) {
          series.push({
            data: [
              { value: 0n, name: "Percentual Mínimo" },
              { value: 0n, name: "Percentual Aplicado" },
              { value: 0n, name: "Valor Aplicado" },
              { value: 0n, name: "Valor Arrecadado" },
              { value: 0n, name: "Valor Distribuido" },
            ],
          });
        }
      } else {
        for (const item of aplicacao) {
          series.push({
            data: [
              { value: item.percentualMinimo, name: "Percentual Mínimo" },
              { value: item.percentualAplicado, name: "Percentual Aplicado" },
              { value: item.valorAplicado, name: "Valor Aplicado" },
              { value: item.valorArrecadado, name: "Valor Arrecadado" },
              { value: item.valorDistribuido, name: "Valor Distribuido" },
            ],
          });
        }
      }

      chart.setOption({ series: series });
    }
  }, [aplicacao]);

  return (
    <Container className="container-grafico">
      <ReactECharts option={opcoes} ref={graficoRef} style={{ height: 300, width: "100%" }} />
    </Container>
  );
}

export default Grafico;
