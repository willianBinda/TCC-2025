import { flexRender, getCoreRowModel, getExpandedRowModel, useReactTable, type ExpandedState } from "@tanstack/react-table";
import { Button, Card, Container, Table } from "react-bootstrap";
import type { TypeEventoMestreFormatado } from "../../types/EventoMestre";
import { colunas, detalhesEvento } from "../../config/tabela";
import "../../css/tabela/index.css";
import { Fragment, useState } from "react";
import { ObterCssSituacao } from "../../enum/EnumTipoSituacao";

function Tabela({ dados }: { dados: TypeEventoMestreFormatado[] }) {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const table = useReactTable({
    data: dados,
    columns: colunas,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: { expanded },
    onExpandedChange: (newExpanded) => setExpanded(newExpanded),
  });

  return (
    <Container>
      <Table className="tabela" striped bordered hover>
        <thead className="tabela-header">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
              <th></th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <tr>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
                <td>
                  <Button size="sm" onClick={() => row.toggleExpanded()} variant="secondary">
                    {row.getIsExpanded() ? "-" : "+"}
                  </Button>
                </td>
              </tr>

              {row.getIsExpanded() && (
                <tr>
                  <td colSpan={row.getVisibleCells().length + 1}>
                    <Card className="m-2 p-3 shadow-sm">
                      <Card.Title>Detalhes</Card.Title>
                      <Card.Body>
                        {detalhesEvento.map(({ key, label }) => {
                          if (key === "descricaoSituacao") {
                            const { className } = ObterCssSituacao(row.original.situacao);
                            return (
                              <p key={key as string}>
                                <strong>{label}:</strong> <span className={className}>{String(row.original[key])}</span>
                              </p>
                            );
                          }
                          return (
                            <p key={key as string}>
                              <strong>{label}:</strong> {String(row.original[key])}
                            </p>
                          );
                        })}
                      </Card.Body>
                    </Card>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export { Tabela };
