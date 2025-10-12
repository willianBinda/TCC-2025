import {
  getFilteredRowModel,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  type ExpandedState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { Button, Card, Container, Table } from "react-bootstrap";
import type { TypeEventoMestreFormatado } from "../../types/EventoMestre";
import { colunas, detalhesEvento } from "../../config/tabela";
import "../../css/tabela/index.css";
import { Fragment, useState } from "react";
import { EnumTipoSituacao, ObterCssSituacao } from "../../enum/EnumTipoSituacao";
import { confirmarEntrega, confirmarRecebimento } from "../../services/situacaoRegistro";
import { useEstadoGlobal } from "../../context/useEstadoGlobal";
import { getOrigemTransacao } from "../../utils";
import type { PermissoesUsuarioType } from "../../types/Permissao";
import type { TypeTipoSituacao } from "../../types/TipoSituacao";
import type { ContratosType } from "../../types/Contrato";
import type { EnumAlerta } from "../../enum/EnumAlerta";

function Tabela({ dados }: { dados: TypeEventoMestreFormatado[] }) {
  const { contratos, permissoes, setAlerta } = useEstadoGlobal();
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: dados,
    columns: colunas,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { expanded, columnFilters, globalFilter },
    onExpandedChange: (newExpanded) => setExpanded(newExpanded),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <Container>
      <Table className="tabela" striped bordered hover>
        <thead className="tabela-header">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getCanFilter() ? (
                    <input
                      type="text"
                      placeholder={`Filtrar ${header.column.id}`}
                      value={(header.column.getFilterValue() ?? "") as string}
                      onChange={(e) => header.column.setFilterValue(e.target.value)}
                      className="form-control mt-1"
                    />
                  ) : null}
                </th>
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
                                <strong>{label}:</strong> <span className={className}>{String(row.original[key])}</span>{" "}
                                {botaoEntregaRecebimento(
                                  contratos,
                                  permissoes,
                                  row.original.enderecoContrato,
                                  row.original.situacao,
                                  row.original.despesaId,
                                  setAlerta
                                )}
                              </p>
                            );
                          }
                          return (
                            <p key={key as string}>
                              <strong>{label}:</strong> {String(row.original[key])}
                            </p>
                          );
                        })}
                        <div className="container-box">
                          {row.original.blocos.length > 1 &&
                            row.original.blocos.map((tx: string, index: number, arr: string[]) => {
                              const abreviado = `${tx.slice(0, 8)}...${tx.slice(-6)}`;
                              return (
                                <Fragment key={index}>
                                  <div className="box" title={tx}>
                                    {abreviado}
                                  </div>
                                  {index < arr.length - 1 && <span className="arrow">{"------->"}</span>}
                                </Fragment>
                              );
                            })}
                        </div>
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

const botaoEntregaRecebimento = (
  contratos: ContratosType,
  permissoes: PermissoesUsuarioType,
  enderecoContrato: string,
  situacaoEvento: TypeTipoSituacao,
  despesaId: bigint | undefined,
  setAlerta: (alerta: EnumAlerta) => void
) => {
  const tipoOrgao = getOrigemTransacao(enderecoContrato);

  if (
    permissoes.orgao.length > 0 &&
    (situacaoEvento === EnumTipoSituacao.PENDENTE || situacaoEvento === EnumTipoSituacao.ENTREGUE) &&
    tipoOrgao !== undefined &&
    despesaId !== undefined &&
    permissoes.orgao.includes(tipoOrgao)
  ) {
    return (
      <span>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => confirmarRecebimento(contratos, permissoes, setAlerta, despesaId)}
        >
          Confirmar Recebimento
        </Button>
      </span>
    );
  } else if (
    permissoes.fornecedor.length > 0 &&
    (situacaoEvento === EnumTipoSituacao.PENDENTE || situacaoEvento === EnumTipoSituacao.RECEBIDO) &&
    tipoOrgao !== undefined &&
    despesaId !== undefined &&
    permissoes.fornecedor.includes(tipoOrgao)
  ) {
    return (
      <span>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => confirmarEntrega(contratos, permissoes, setAlerta, despesaId)}
        >
          Confirmar Entrega
        </Button>
      </span>
    );
  } else {
    return null;
  }
};

export { Tabela };
