import "../../css/form/index.scss";
import { Button, Card, Form } from "react-bootstrap";
import { useState } from "react";
import { registrar } from "../../services/registrar";
import { useEstadoGlobal } from "../../context/useEstadoGlobal";
import { formatarValorReal } from "../../utils/form";

const Registrar = () => {
  const { contratos, permissoes, setAlerta } = useEstadoGlobal();
  const [valor, setValor] = useState("");
  const [txAnterior, setTxAnterior] = useState("");
  const [justificativa, setJustificativa] = useState("");

  return (
    <Card className="card-registrar">
      <Card.Body>
        <Form
          onSubmit={(e) => {
            registrar(contratos, permissoes, setAlerta, e, valor, justificativa);
          }}
        >
          <Form.Control
            className="campo"
            type="text"
            placeholder="Transação anterior"
            value={txAnterior}
            onChange={(e) => setTxAnterior(e.target.value)}
          />

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

          <Button className="campo botao-registrar" type="submit">
            Registrar
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Registrar;
