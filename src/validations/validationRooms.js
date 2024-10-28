import { handleValidationResult } from "../helpers/validationResult.js";
import { check } from "express-validator";

const roomsValidations = [
  check("room_name")
    .notEmpty()
    .withMessage("El tipo de habitacion es obligatorio")
    .isIn([
      "Dobles Superiores",
      "Departamentos",
      "Doble de Lujo",
      "Suite Superior",
    ])
    .withMessage("El tipo de habitacion debe ser una de las 4 opciones"),
  check("price")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isNumeric()
    .withMessage("El precio tiene que ser un numero")
    .isLength({ min: 4, max: 7 })
    .withMessage("El precio minimo es de 5.000 y maximo de 1.000.000"),
  check("number_rooms")
    .notEmpty()
    .withMessage("El numero de habitacion es obligatorio")
    .matches(/^(1[0-9]|20|[1-9])$/)
    .withMessage("el numero no tiene el formato valido"),
  check("image")
    .notEmpty()
    .withMessage("La imagen es un dato obligatorio")
    .matches(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/)
    .withMessage("El formato de la imagen no es el correcto"),
  check("brief_description")
    .notEmpty()
    .withMessage("La breve descripcion es obligatoria")
    .isLength({ min: 2, max: 100 })
    .withMessage("Debe tener un minimo de 2 caracteres y un maximo de 100"),
  check("broad_description")
    .notEmpty()
    .withMessage("La descripcion amplia es obligatoria")
    .isLength({ min: 50, max: 1000 })
    .withMessage("Debe tener un minimo de 50 caracteres y un maximo de 1000"),
  (req, res, next) => handleValidationResult(req, res, next),
];

export default roomsValidations;