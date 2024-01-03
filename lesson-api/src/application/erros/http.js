class ServerError extends Error {
  constructor(error) {
    super("Server failed. Try again later");
    this.name = "ServerError";
    this.stack = error?.stack;
  }
}

class UnauthorizedError extends Error {
  constructor() {
    super("unauthorized");
    this.name = "UnauthorizedError";
  }
}

class ForbiddenError extends Error {
  constructor() {
    super("Access denied");
    this.name = "ForbiddenError";
  }
}

module.exports = { ServerError, UnauthorizedError, ForbiddenError };
