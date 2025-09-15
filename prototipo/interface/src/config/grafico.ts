import type { EChartsOption } from "echarts-for-react";
import { CORES_GRAFICO } from "./constantes";
import { formatarValor } from "../services";

export const opcoes: EChartsOption = {
  tooltip: {
    trigger: "item",
    // formatter: "{a} <br/>{b}: {c}",
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatter: (params: any) => {
      if (params.name.includes("Percentual")) {
        return `${params.seriesName}<br/>${params.name}: ${params.value}%`;
      }
      return `${params.seriesName}<br/>${params.name}: ${formatarValor(params.value)}`;
    },
  },
  legend: {
    orient: "vertical",
    left: "left",
    top: "middle",
  },
  itemStyle: {
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 2,
  },
  title: [
    {
      text: "Federal",
      left: "25%",
      top: "5%",
      textAlign: "center",
    },
    {
      text: "Estadual",
      left: "50%",
      top: "5%",
      textAlign: "center",
    },
    {
      text: "Municipal",
      left: "75%",
      top: "5%",
      textAlign: "center",
    },
  ],
  color: [
    CORES_GRAFICO.percentualMinimo,
    CORES_GRAFICO.percentualAplicado,
    CORES_GRAFICO.valorAplicado,
    CORES_GRAFICO.valorArrecadado,
    CORES_GRAFICO.valorDistribuido,
  ],
  series: [
    {
      name: "Federal",
      type: "pie",
      radius: "50%",
      center: ["25%", "50%"],
      minAngle: 5,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      //   data: [
      //     { name: "Percentual Mínimo" },
      //     { name: "Percentual Aplicado" },
      //     { name: "Valor Aplicado" },
      //     { name: "Valor Arrecadado" },
      //     { name: "Valor Distribuido" },
      //   ],
    },
    {
      name: "Estadual",
      type: "pie",
      radius: "50%",
      center: ["50%", "50%"],
      minAngle: 5,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      //   data: [
      //     { name: "Percentual Mínimo" },
      //     { name: "Percentual Aplicado" },
      //     { name: "Valor Aplicado" },
      //     { name: "Valor Arrecadado" },
      //     { name: "Valor Distribuido" },
      //   ],
    },
    {
      name: "Municipal",
      type: "pie",
      radius: "50%",
      center: ["75%", "50%"],
      minAngle: 5,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
      //   data: [
      //     { name: "Percentual Mínimo" },
      //     { name: "Percentual Aplicado" },
      //     { name: "Valor Aplicado" },
      //     { name: "Valor Arrecadado" },
      //     { name: "Valor Distribuido" },
      //   ],
    },
  ],
};
