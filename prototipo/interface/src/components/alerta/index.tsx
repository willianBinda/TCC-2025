import { useEffect } from "react";
import { useEstadoGlobal } from "../../context/useEstadoGlobal";
import "../../css/alerta/index.scss";
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
    return <Alert className="alerta">Nenhuma carteira encontrada! Instale uma carteira compativel com a web3</Alert>;
  } else {
    return null;
  }
}

export default Alerta;
