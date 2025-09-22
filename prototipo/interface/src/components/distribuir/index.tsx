import { Button, Card, Form } from "react-bootstrap";
import { EnumTipoOrgaoHelper } from "../../enum/EnumTipoOrgao";
import { useState } from "react";
import "../../css/form/index.scss";

const Distribuir = () => {
  const [destino, setDestino] = useState("");
  const [valor, setValor] = useState("");
  const [txAnterior, setTxAnterior] = useState("");
  const [justificativa, setJustificativa] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (destino === "" || valor === "" || justificativa.trim() === "") {
      alert("Preencha todos os campos antes de distribuir!");
      return;
    }

    const valorNumerico = Number(valor.replace(/\D/g, "")) / 100;

    console.log({
      destino,
      valor: valorNumerico,
      justificativa,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;

    v = v.replace(/\D/g, "");

    const numero = Number(v) / 100;

    const formatted = numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });

    setValor(formatted);
  };

  return (
    <Card className="card-distribuir">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Select value={destino} onChange={(e) => setDestino(e.target.value)} className="campo">
            <option value="" disabled>
              Destino
            </option>
            {Array.from(EnumTipoOrgaoHelper.entries()).map(([key, label]) => (
              <option key={key.toString()} value={key.toString()}>
                {label}
              </option>
            ))}
          </Form.Select>

          <Form.Control
            className="campo"
            type="text"
            placeholder="Transação anterior"
            value={txAnterior}
            onChange={(e) => setTxAnterior(e.target.value)}
          />

          <Form.Control className="campo" type="text" placeholder="Digite o valor" value={valor} onChange={handleChange} />

          <Form.Control
            className="campo"
            as="textarea"
            rows={3}
            placeholder="Digite a justificativa"
            value={justificativa}
            onChange={(e) => setJustificativa(e.target.value)}
          />

          <Button className="campo botao-destino" type="submit">
            Distribuir
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Distribuir;
