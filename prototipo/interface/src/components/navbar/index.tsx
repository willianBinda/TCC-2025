import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useEstadoGlobal } from "../../context/useEstadoGlobal";
import "../../css/navbar/style.scss";
import { Link } from "react-router-dom";

function BarraNavegacao() {
  const { connectar, enderecoUsuario } = useEstadoGlobal();
  return (
    <Navbar className="barra-navegacao">
      <Container>
        <Nav>
          <Nav.Link as={Link} to="/" className="texto">
            Início
          </Nav.Link>
          <Nav.Link as={Link} to="/orgao" className="texto">
            Órgão
          </Nav.Link>
        </Nav>
        {definirBotao(enderecoUsuario, connectar)}
      </Container>
    </Navbar>
  );
}

const definirBotao = (enderecoUsuario: string, connectar: () => void) => {
  if (enderecoUsuario) {
    return (
      <Button disabled className="botao-connectar" onClick={connectar}>
        {enderecoUsuario.slice(0, 6)}...{enderecoUsuario.slice(-4)}
      </Button>
    );
  }

  return (
    <Button className="botao-connectar" onClick={connectar}>
      Conectar Carteira
    </Button>
  );
};

export default BarraNavegacao;
