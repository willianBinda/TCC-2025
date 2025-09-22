import { createContext, useEffect, useState, type ReactNode } from "react";
import type { EstadosContextType } from "../types/Context";
import { EnumAlerta } from "../enum/EnumAlerta";
import { ethers } from "ethers";
import {
  ABI_ESTADUAL,
  ABI_FEDERAL,
  ABI_MUNICIPAL,
  ENDERECO_CONTRATO_ESTADUAL,
  ENDERECO_CONTRATO_FEDERAL,
  ENDERECO_CONTRATO_MUNICIPAL,
} from "../config/constantes";
import type { PermissoesUsuarioType } from "../types/Permissao";
import type { ContratosType } from "../types/Contrato";
import { EnumTipoOrgao } from "../enum/EnumTipoOrgao";

const ContextoEstados = createContext<EstadosContextType | undefined>(undefined);

function ProvedorEstados({ children }: { children: ReactNode }) {
  const [alerta, setAlerta] = useState(EnumAlerta.Nenhum);
  const [enderecoUsuario, setEnderecoUsuario] = useState("");
  const [contratos, setContratos] = useState<ContratosType>([]);
  const [permissoes, setPermissoes] = useState<PermissoesUsuarioType>({ fornecedor: [], orgao: [] });

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

    const _contratos = [
      { nome: EnumTipoOrgao.FEDERAL, contrato: new ethers.Contract(ENDERECO_CONTRATO_FEDERAL, ABI_FEDERAL, signer) },
      { nome: EnumTipoOrgao.ESTADUAL, contrato: new ethers.Contract(ENDERECO_CONTRATO_ESTADUAL, ABI_ESTADUAL, signer) },
      { nome: EnumTipoOrgao.MUNICIPAL, contrato: new ethers.Contract(ENDERECO_CONTRATO_MUNICIPAL, ABI_MUNICIPAL, signer) },
    ];

    const permissoes: PermissoesUsuarioType = {
      orgao: [],
      fornecedor: [],
    };

    for (const contrato of _contratos) {
      const temOrgao = await contrato.contrato.temPermissaoOrgao();
      const temFornecedor = await contrato.contrato.temPermissaoFornecedor();

      if (temOrgao) {
        permissoes.orgao.push(contrato.nome);
      }
      if (temFornecedor) permissoes.fornecedor.push(contrato.nome);
    }

    setPermissoes(permissoes);
    setContratos(_contratos);
    setEnderecoUsuario(signer.address);
  };

  return (
    <ContextoEstados.Provider value={{ connectar, alerta, setAlerta, enderecoUsuario, contratos, permissoes }}>
      {children}
    </ContextoEstados.Provider>
  );
}

export { ContextoEstados, ProvedorEstados };
