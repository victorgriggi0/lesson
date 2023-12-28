import { ForbiddenError, ServerError, UnauthorizedError } from "../erros";

export const ok = (data) => ({
  statusCode: 200,
  data,
});

export const badRequest = (error) => ({
  statusCode: 400,
  data: error,
});

export const unauthorized = () => ({
  statusCode: 401,
  data: new UnauthorizedError(),
});

export const forbidden = () => ({
  statusCode: 403,
  data: new ForbiddenError(),
});

export const serverError = (error) => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined),
});
