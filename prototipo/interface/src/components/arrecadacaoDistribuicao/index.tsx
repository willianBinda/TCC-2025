import { Col, Container, Row } from "react-bootstrap";
import "../../css/arrecadacaoDistribuicao/style.css";
import { formatarValor } from "../../services";

function ArrecadacaoDistribuicao({ arrecadacao, distribuicao }: { arrecadacao: bigint; distribuicao: bigint }) {
  return (
    <Container className="container-arrecadacao-distribuicao mt-3">
      <Row className="g-3">
        <Col md={6}>
          <div className="card card-arrecadacao">
            <Row>
              <div className="descricao">
                <Col md={12}>Total Arrecadado</Col>
                <Col md={12}>{formatarValor(arrecadacao)}</Col>
              </div>
            </Row>
          </div>
        </Col>
        <Col md={6}>
          <div className="card card-distribuicao">
            <Row>
              <div className="descricao">
                <Col md={12}>Total Distribuído</Col>
                <Col md={12}>{formatarValor(distribuicao)}</Col>
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ArrecadacaoDistribuicao;
