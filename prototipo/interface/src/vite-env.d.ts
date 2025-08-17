/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * URL base da API usada pelo front-end
   * Definida em .env como VITE_API_URL
   */
  readonly VITE_RPC_URL: string;

  /**
   * Ambiente atual (development, production, etc.)
   */
  readonly MODE: string;

  /**
   * Indica se o build foi feito em modo de desenvolvimento
   */
  readonly DEV: boolean;

  /**
   * Indica se o build foi feito em modo de produção
   */
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
