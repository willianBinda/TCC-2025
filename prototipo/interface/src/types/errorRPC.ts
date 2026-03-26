import type { Code } from "../enum/EnumProviderRpcError";

export interface ProviderRpcErrorType extends Error {
  message: string;
  code: Code;
  data?: unknown;
}
