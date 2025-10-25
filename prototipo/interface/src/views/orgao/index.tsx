import { Col, Container, Row } from "react-bootstrap";
import Distribuir from "../../components/distribuir";
import Registrar from "../../components/registrar";
import "../../css/orgao/index.css";
import { useEstadoGlobal } from "../../context/useEstadoGlobal";
import { useEffect, useState } from "react";
import { buscarSaldo } from "../../services/orgao";

const Orgao = () => {
  const { contratos, permissoes } = useEstadoGlobal();
  const [saldo, setSaldo] = useState("");
  useEffect(() => {
    buscarSaldo(contratos, permissoes)
      .then((res) => {
        setSaldo(res);
      })
      .catch(() => {});
  }, [contratos, permissoes]);

  return (
    <Container className="container-formulario">
      <Row>
        <Col md={12} className="saldo">
          Saldo: {saldo}
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Distribuir />
        </Col>

        <Col md={6}>
          <Registrar />
        </Col>
      </Row>
    </Container>
  );
};

export default Orgao;
