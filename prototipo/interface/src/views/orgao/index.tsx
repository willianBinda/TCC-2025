import { Col, Container, Row } from "react-bootstrap";
import Distribuir from "../../components/distribuir";
import Registrar from "../../components/registrar";

const Orgao = () => {
  return (
    <Container className="container-formulario">
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
