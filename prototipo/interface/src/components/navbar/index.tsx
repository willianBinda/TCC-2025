import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useEstadoGlobal } from "../../context/useEstadoGlobal";
import "../../css/navbar/style.scss";
import { Link } from "react-router-dom";
import type { PermissoesUsuarioType } from "../../types/Permissao";

function BarraNavegacao() {
  const { connectar, enderecoUsuario, permissoes } = useEstadoGlobal();
  return (
    <Navbar className="barra-navegacao">
      <Container>
        <Nav>
          <Nav.Link as={Link} to="/" className="texto">
            Início
          </Nav.Link>
          {montarRota(permissoes)}
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

const montarRota = (permissoes: PermissoesUsuarioType) => {
  if (permissoes.orgao.length) {
    return (
      <Nav.Link as={Link} to="/orgao" className="texto">
        Órgão
      </Nav.Link>
    );
  } else {
    return null;
  }
};

export default BarraNavegacao;
