import "../../css/alerta/index.scss";
import { useEffect } from "react";
import { useEstadoGlobal } from "../../context/useEstadoGlobal";
import { Alert } from "react-bootstrap";
import { EnumAlerta } from "../../enum/EnumAlerta";

function Alerta() {
  const { alerta, setAlerta } = useEstadoGlobal();

  useEffect(() => {
    if (alerta !== EnumAlerta.Nenhum) {
      const timer = setTimeout(() => {
        setAlerta(EnumAlerta.Nenhum);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alerta, setAlerta]);

  if (alerta === EnumAlerta.Carteira) {
    return (
      <Alert className="alerta carteira">Nenhuma carteira encontrada! Instale uma carteira compativel com a web3</Alert>
    );
  } else if (alerta === EnumAlerta.Contrato) {
    return <Alert className="alerta contrato">Nenhuma carteira conectada!</Alert>;
  } else if (alerta === EnumAlerta.Formulario) {
    return <Alert className="alerta formulario">Preencha os campos obrigatórios</Alert>;
  } else if (alerta === EnumAlerta.Falha) {
    return <Alert className="alerta falha">Ocorreu um erro ao executar uma função do contrato!</Alert>;
  } else {
    return null;
  }
}

export default Alerta;
