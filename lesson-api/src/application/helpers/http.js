const { response } = require("express");

/**
 *
 * @param {response} res
 */
const HttpResponse = (res) => {
  const ok = (data) =>
    res
      .status(200)
      .json({ ...data })
      .send();

  const created = (data) =>
    res
      .status(201)
      .json({ ...data })
      .send();

  const badRequest = (message, error) =>
    res
      .status(400)
      .json({ error: error ?? "bad_request", message })
      .send();

  const unauthorized = (message, error) =>
    res
      .status(401)
      .json({ error: error ?? "unauthorized", message })
      .send();

  const notFound = (message, error) =>
    res
      .status(401)
      .json({ error: error ?? "not_found", message })
      .send();

  const forbidden = (message, error) =>
    res
      .status(403)
      .json({ error: error ?? "forbidden", message })
      .send();

  const serverError = (message, error) =>
    res
      .status(500)
      .json({ error: error ?? "server_error", message })
      .send();

  return {
    ok,
    badRequest,
    unauthorized,
    forbidden,
    serverError,
    notFound,
    created,
  };
};

module.exports = { HttpResponse };
