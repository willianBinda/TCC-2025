export enum Code {
  requestReject = 4001,
  Unauthorized = 4100,
  UnsupportedMethod = 4200,
  Disconnected = 4900,
  ChainDisconnected = 4901,
  parameterInvalid = -32602,
  internalError = -32603,
  callException = "CALL_EXCEPTION",
}

export const CodeHelper = (code: Code): string => {
  switch (code) {
    case Code.requestReject:
      return "The user rejected the request.";
    case Code.Unauthorized:
      return "The requested method and/or account has not been authorized by the user.";
    case Code.UnsupportedMethod:
      return "The Provider does not support the requested method.";
    case Code.Disconnected:
      return "The Provider is disconnected from all chains.";
    case Code.ChainDisconnected:
      return "The Provider is not connected to the requested chain.";
    case Code.parameterInvalid:
      return "The parameters are invalid.";
    case Code.internalError:
      return "Internal error.";
    case Code.callException:
      return "Erro de contrato";
    default:
      return "Erro desconhecido.";
  }
};
