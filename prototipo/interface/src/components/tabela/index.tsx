import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Container, Table } from "react-bootstrap";
import type { TypeEvento } from "../../types/Evento";
import type { TypeEventoMestre } from "../../types/EventoMestre";
import { formatarValor } from "../../services";
const columns = [
  {
    accessorKey: "data",
    header: "Data",
  },
  // {
  //   accessorKey: "origem",
  //   header: "Origem",
  // },
  // {
  //   accessorKey: "destino",
  //   header: "Destino",
  // },
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
function Tabela({ dados }: { dados: TypeEvento<TypeEventoMestre> }) {
  console.log(dados);
  const table = useReactTable({
    data: dados.map((e) => {
      return {
        data: e.data,
        valor: formatarValor(e.agrs.valor),
        justificativa: e.agrs.justificativa,
      };
    }),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container>
      <Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr key={index}>
              {headerGroup.headers.map((header, i) => (
                <th key={i}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={index}>
              {row.getVisibleCells().map((cell, i) => (
                <td key={i}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export { Tabela };
