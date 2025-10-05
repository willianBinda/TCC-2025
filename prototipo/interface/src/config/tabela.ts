import type { TypeEventoMestreFormatado } from "../types/EventoMestre";

export const colunas = [
  {
    accessorKey: "data",
    header: "Data",
  },
  {
    accessorKey: "origem",
    header: "Origem",
  },
  {
    accessorKey: "destino",
    header: "Destino",
  },
  {
    accessorKey: "valor",
    header: "Valor",
  },
  {
    accessorKey: "justificativa",
    header: "Justificativa",
    // cell: (info) => <strong>{info.getValue()}</strong>,
  },
];

export const detalhesEvento: { key: keyof TypeEventoMestreFormatado; label: string }[] = [
  { key: "orgao", label: "Endereço do do orgão" },
  { key: "fornecedor", label: "Endereço do fornecedor" },
  { key: "tipoEvento", label: "Tipo de transação" },
  { key: "descricaoSituacao", label: "Situação do gasto" },
  { key: "txAnterior", label: "Transação anterior" },
];
