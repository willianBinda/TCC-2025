import { createContext, useEffect, useState, type ReactNode } from "react";
import type { EstadosContextType } from "../types/Context";
import { EnumAlerta } from "../enum/EnumAlerta";
import { ethers } from "ethers";

const ContextoEstados = createContext<EstadosContextType | undefined>(undefined);

function ProvedorEstados({ children }: { children: ReactNode }) {
  const [alerta, setAlerta] = useState(EnumAlerta.Nenhum);
  const [enderecoUsuario, setEnderecoUsuario] = useState("");

  function handleAccountsChanged(accounts: string[]) {
    setEnderecoUsuario(accounts[0] ?? "");
  }

  useEffect(() => {
    window.ethereum?.on("accountsChanged", handleAccountsChanged);
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  const connectar = async () => {
    if (!window.ethereum) {
      setAlerta(EnumAlerta.Carteira);
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    setEnderecoUsuario(signer.address);
  };

  return (
    <ContextoEstados.Provider value={{ connectar, alerta, setAlerta, enderecoUsuario }}>
      {children}
    </ContextoEstados.Provider>
  );
}

export { ContextoEstados, ProvedorEstados };
