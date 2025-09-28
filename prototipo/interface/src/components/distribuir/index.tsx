import { Button, Card, Form } from "react-bootstrap";
import { EnumTipoOrgao, EnumTipoOrgaoHelper } from "../../enum/EnumTipoOrgao";
import { useState } from "react";
import "../../css/form/index.scss";
import { distribuir } from "../../services/distribuir";
import { useEstadoGlobal } from "../../context/useEstadoGlobal";
import { formatarValorReal } from "../../utils/form";
import type { PermissoesUsuarioType } from "../../types/Permissao";
import { EnumAlerta } from "../../enum/EnumAlerta";

const Distribuir = () => {
  const { contratos, permissoes, setAlerta } = useEstadoGlobal();

  const [destino, setDestino] = useState("");
  const [valor, setValor] = useState("");
  const [txAnterior, setTxAnterior] = useState("");
  const [justificativa, setJustificativa] = useState("");

  if (permissoes.orgao.includes(EnumTipoOrgao.MUNICIPAL)) {
    return null;
  }

  return (
    <Card className="card-distribuir">
      <Card.Body>
        <Form.Select value={destino} onChange={(e) => setDestino(e.target.value)} className="campo">
          <option value="" disabled>
            Destino
          </option>
          {opcoesDestino(permissoes)}
        </Form.Select>

        {!permissoes.orgao.includes(EnumTipoOrgao.FEDERAL) && (
          <Form.Control
            className="campo"
            type="text"
            placeholder="Transação anterior"
            value={txAnterior}
            onChange={(e) => setTxAnterior(e.target.value)}
          />
        )}

        <Form.Control
          className="campo"
          type="text"
          placeholder="Digite o valor"
          value={valor}
          onChange={(e) => formatarValorReal(e, setValor)}
        />

        <Form.Control
          className="campo"
          as="textarea"
          rows={3}
          placeholder="Digite a justificativa"
          value={justificativa}
          onChange={(e) => setJustificativa(e.target.value)}
        />

        <Button
          className="campo botao-destino"
          onClick={() => {
            distribuir(contratos, permissoes, setAlerta, valor, justificativa, destino, txAnterior)
              .then(() => {
                setDestino("");
                setValor("");
                setTxAnterior("");
                setJustificativa("");
              })
              .catch(() => {
                setAlerta(EnumAlerta.Falha);
              });
          }}
        >
          Distribuir
        </Button>
      </Card.Body>
    </Card>
  );
};

const opcoesDestino = (permissoes: PermissoesUsuarioType) => {
  if (!permissoes.orgao.length || permissoes.orgao.includes(EnumTipoOrgao.MUNICIPAL)) {
    return null;
  }

  if (permissoes.orgao.includes(EnumTipoOrgao.FEDERAL))
    return Array.from(EnumTipoOrgaoHelper.entries())
      .filter(([key]) => key !== EnumTipoOrgao.FEDERAL)
      .map(([key, label]) => (
        <option key={key.toString()} value={key.toString()}>
          {label}
        </option>
      ));

  if (permissoes.orgao.includes(EnumTipoOrgao.ESTADUAL))
    return Array.from(EnumTipoOrgaoHelper.entries())
      .filter(([key]) => key !== EnumTipoOrgao.FEDERAL && key !== EnumTipoOrgao.ESTADUAL)
      .map(([key, label]) => (
        <option key={key.toString()} value={key.toString()}>
          {label}
        </option>
      ));
};

export default Distribuir;
