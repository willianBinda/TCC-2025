import { Button, Card, Form } from "react-bootstrap";
import { EnumTipoOrgao, EnumTipoOrgaoHelper } from "../../enum/EnumTipoOrgao";
import { useState } from "react";
import "../../css/form/index.scss";
import { distribuir } from "../../services/distribuir";
import { useEstadoGlobal } from "../../context/useEstadoGlobal";
import { formatarValorReal } from "../../utils/form";

const Distribuir = () => {
  const { contratos, permissoes, setAlerta } = useEstadoGlobal();

  const [destino, setDestino] = useState("");
  const [valor, setValor] = useState("");
  const [txAnterior, setTxAnterior] = useState("");
  const [justificativa, setJustificativa] = useState("");

  return (
    <Card className="card-distribuir">
      <Card.Body>
        <Form.Select value={destino} onChange={(e) => setDestino(e.target.value)} className="campo">
          <option value="" disabled>
            Destino
          </option>
          {!permissoes.orgao.includes(EnumTipoOrgao.FEDERAL)
            ? Array.from(EnumTipoOrgaoHelper.entries()).map(([key, label]) => (
                <option key={key.toString()} value={key.toString()}>
                  {label}
                </option>
              ))
            : Array.from(EnumTipoOrgaoHelper.entries())
                .filter(([key]) => key !== EnumTipoOrgao.FEDERAL)
                .map(([key, label]) => (
                  <option key={key.toString()} value={key.toString()}>
                    {label}
                  </option>
                ))}
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
            distribuir(contratos, permissoes, setAlerta, valor, justificativa, destino)
              .then(() => {
                setDestino("");
                setValor("");
                setTxAnterior("");
                setJustificativa("");
              })
              .catch(() => {});
          }}
        >
          Distribuir
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Distribuir;
