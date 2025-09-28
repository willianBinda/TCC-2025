import "../../css/form/index.scss";
import { Button, Card, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { buscarFornecedoresAtivos, registrar } from "../../services/registrar";
import { useEstadoGlobal } from "../../context/useEstadoGlobal";
import { formatarValorReal } from "../../utils/form";
import { EnumAlerta } from "../../enum/EnumAlerta";
import { EnumTipoOrgao } from "../../enum/EnumTipoOrgao";

const Registrar = () => {
  const { contratos, permissoes, setAlerta } = useEstadoGlobal();
  const [valor, setValor] = useState("");
  const [txAnterior, setTxAnterior] = useState("");
  const [justificativa, setJustificativa] = useState("");
  const [enderecoFornecedor, setEnderecoFornecedor] = useState("");

  const [fornecedoresAtivos, setFornecedoresAtivos] = useState<string[]>([]);

  useEffect(() => {
    if (!contratos.length || !permissoes.orgao.length) return;
    buscarFornecedoresAtivos(contratos, permissoes)
      .then((res) => {
        setFornecedoresAtivos(res);
      })
      .catch();
  }, [contratos, permissoes]);

  return (
    <Card className="card-registrar">
      <Card.Body>
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

        <Form.Select value={enderecoFornecedor} onChange={(e) => setEnderecoFornecedor(e.target.value)} className="campo">
          <option value="" disabled>
            Fornecedor
          </option>
          {fornecedoresAtivos.map((endereco, index) => (
            <option key={index} value={endereco}>
              {endereco}
            </option>
          ))}
        </Form.Select>

        <Form.Control
          className="campo"
          as="textarea"
          rows={3}
          placeholder="Digite a justificativa"
          value={justificativa}
          onChange={(e) => setJustificativa(e.target.value)}
        />

        <Button
          className="campo botao-registrar"
          onClick={() => {
            registrar(contratos, permissoes, setAlerta, valor, enderecoFornecedor, justificativa, txAnterior)
              .then(() => {
                setValor("");
                setTxAnterior("");
                setJustificativa("");
                setEnderecoFornecedor("");
              })
              .catch(() => {
                setAlerta(EnumAlerta.Falha);
              });
          }}
        >
          Registrar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Registrar;
