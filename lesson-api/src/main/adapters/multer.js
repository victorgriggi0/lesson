import multer from "multer";
import { ServerError } from "../../application/erros";

export const adaptMulter = (req, res, next) => {
  const upload = multer().single("picture");
  upload(req, res, (error) => {
    if (error !== undefined) {
      return res.status(500).json({ error: new ServerError(error).message });
    }

    if (req.file !== undefined) {
      req.locals = {
        ...req.locals,
        file: { buffer: req.file.buffer, mimeType: req.file.mimetype },
      };
    }

    next();
  });
};
