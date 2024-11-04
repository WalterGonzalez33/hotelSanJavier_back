import { check, validationResult } from "express-validator";


const validacionUsuario = [
  check("email")
    .notEmpty()
    .withMessage("El email del usuario es un dato obligatorio"),
  (req, res, next) => validationResult(req, res, next),

  check("username")
    .notEmpty()
    .isLength({
      min: 2,
      max: 25,
    })
    .withMessage("El nombre del usuario es obligatorio"),
  (req, res, next) => validationResult(req, res, next),

  check("password")
    .notEmpty()
    .isLength({
      min: 6,
    })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .withMessage("la contraseña es obligatorio"),
  (req, res, next) => validationResult(req, res, next),

  check("status").notEmpty().withMessage("El estado es un dato obligatorio"),
  (req, res, next) => validationResult(req, res, next),

  check("roll").notEmpty().withMessage("El roll es un dato obligatorio"),
  (req, res, next) => validationResult(req, res, next),
];

export default validacionUsuario;
