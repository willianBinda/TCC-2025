import type { EChartsOption } from "echarts-for-react";
import { CORES_GRAFICO } from "./constantes";
import { formatarValor } from "../services";

export const opcoes: EChartsOption = {
  legend: {
    orient: "horizontal",
    bottom: 0,
    left: "center",
    data: ["Valor Arrecadado", "Valor Distribuido", "Valor Aplicado"],
  },
  tooltip: {
    trigger: "axis", // melhor para barras agrupadas
    axisPointer: { type: "shadow" },
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: (params: any) => {
      // params é array quando trigger: "axis"
      if (Array.isArray(params)) {
        const data = params[0].data; // objeto do dataset.source
        let html = `${data.orgao}<br/>`;
        for (const p of params) {
          // nome da série (ex: "Valor Arrecadado")
          const serieName = p.seriesName;
          // mapear a serieName para o campo raw correspondente:
          const keyRaw =
            serieName === "Valor Arrecadado"
              ? "valorArrecadadoRaw"
              : serieName === "Valor Distribuido"
              ? "valorDistribuidoRaw"
              : "valorAplicadoRaw";

          // recupere o raw e converta para BigInt (se existir)
          const raw = data?.[keyRaw];
          const valorFormatado = raw ? formatarValor(BigInt(raw)) : formatarValor(p.value);

          html += `${p.marker} ${serieName}: ${valorFormatado}<br/>`;
        }
        return html;
      } else {
        // caso trigger: "item" (params é objeto)
        const data = params.data;
        const serieName = params.seriesName;
        const keyRaw =
          serieName === "Valor Arrecadado"
            ? "valorArrecadadoRaw"
            : serieName === "Valor Distribuido"
            ? "valorDistribuidoRaw"
            : "valorAplicadoRaw";
        const raw = data?.[keyRaw];
        const valorFormatado = raw ? formatarValor(BigInt(raw)) : formatarValor(params.value);
        return `${data.orgao}<br/>${serieName}: ${valorFormatado}`;
      }
    },
  },
  color: [CORES_GRAFICO.valorArrecadado, CORES_GRAFICO.valorDistribuido, CORES_GRAFICO.valorAplicado],
  dataset: {
    dimensions: [
      "orgao",
      "valorArrecadado",
      "valorArrecadadoRaw",
      "valorDistribuido",
      "valorDistribuidoRaw",
      "valorAplicado",
      "valorAplicadoRaw",
    ],
    source: [], // preenchido dinamicamente
  },
  xAxis: { type: "category" },
  yAxis: {},
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [
    { name: "Valor Arrecadado", type: "bar", encode: { x: "orgao", y: "valorArrecadado" }, label: { show: false } },
    { name: "Valor Distribuido", type: "bar", encode: { x: "orgao", y: "valorDistribuido" }, label: { show: false } },
    { name: "Valor Aplicado", type: "bar", encode: { x: "orgao", y: "valorAplicado" }, label: { show: false } },
    {
      name: "Percentuais",
      type: "custom",
      tooltip: { show: false },
      renderItem: (params, api) => {
        const categoriaIndex = api.value(0);
        const xValue = api.coord([categoriaIndex, 0])[0];
        const valores = [
          api.value(1), // valor arrecadado
          api.value(3), // valor distribuído
          api.value(5), // valor aplicado
        ];
        const maxY = Math.max(...valores.map((v) => Number(v) || 0));

        const percentMinimo = api.value(7);
        const percentAplicado = api.value(8);

        const coord = api.coord([categoriaIndex, maxY]);
        const x = coord[0];
        const y = coord[1] - 20; // desloca um pouco acima das barras

        return {
          type: "group",
          children: [
            {
              type: "text",
              style: {
                text: `Mínimo: ${percentMinimo}%  •  Aplicado: ${percentAplicado}%`,
                x,
                y,
                textAlign: "center",
                textVerticalAlign: "bottom",
                fontSize: 12,
                fontWeight: "bold",
                fill: "#333",
              },
            },
          ],
        };
      },
      encode: { x: "orgao" },
      z: 10, // garante que fique acima das barras
    },
  ],
};

// export const opcoes: EChartsOption = {
//   tooltip: {
//     trigger: "item",
//     // formatter: "{a} <br/>{b}: {c}",
//     //eslint-disable-next-line @typescript-eslint/no-explicit-any
//     formatter: (params: any) => {
//       if (params.name.includes("Percentual")) {
//         return `${params.seriesName}<br/>${params.name}: ${params.value}%`;
//       }
//       return `${params.seriesName}<br/>${params.name}: ${formatarValor(params.value)}`;
//     },
//   },
//   legend: {
//     orient: "vertical",
//     left: "left",
//     top: "middle",
//   },
//   itemStyle: {
//     borderRadius: 10,
//     borderColor: "#fff",
//     borderWidth: 2,
//   },
//   title: [
//     {
//       text: "Federal",
//       left: "25%",
//       top: "5%",
//       textAlign: "center",
//     },
//     {
//       text: "Estadual",
//       left: "50%",
//       top: "5%",
//       textAlign: "center",
//     },
//     {
//       text: "Municipal",
//       left: "75%",
//       top: "5%",
//       textAlign: "center",
//     },
//   ],
//   color: [
//     CORES_GRAFICO.percentualMinimo,
//     CORES_GRAFICO.percentualAplicado,
//     CORES_GRAFICO.valorAplicado,
//     CORES_GRAFICO.valorArrecadado,
//     CORES_GRAFICO.valorDistribuido,
//   ],
//   series: [
//     {
//       name: "Federal",
//       type: "pie",
//       radius: "50%",
//       center: ["25%", "50%"],
//       minAngle: 5,
//       label: {
//         show: false,
//         position: "center",
//       },
//       emphasis: {
//         itemStyle: {
//           shadowBlur: 10,
//           shadowOffsetX: 0,
//           shadowColor: "rgba(0, 0, 0, 0.5)",
//         },
//       },
//     },
//     {
//       name: "Estadual",
//       type: "pie",
//       radius: "50%",
//       center: ["50%", "50%"],
//       minAngle: 5,
//       label: {
//         show: false,
//         position: "center",
//       },
//       emphasis: {
//         itemStyle: {
//           shadowBlur: 10,
//           shadowOffsetX: 0,
//           shadowColor: "rgba(0, 0, 0, 0.5)",
//         },
//       },
//     },
//     {
//       name: "Municipal",
//       type: "pie",
//       radius: "50%",
//       center: ["75%", "50%"],
//       minAngle: 5,
//       label: {
//         show: false,
//         position: "center",
//       },
//       emphasis: {
//         itemStyle: {
//           shadowBlur: 10,
//           shadowOffsetX: 0,
//           shadowColor: "rgba(0, 0, 0, 0.5)",
//         },
//       },
//     },
//   ],
// };
