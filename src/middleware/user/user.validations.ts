import { check } from "express-validator";

class UserValidation {

  constructor() { }

  create() {
    return [
      check("firstName")
        .trim()
        .notEmpty()
        .withMessage("firstName field couldn't be empty.")
        .bail()
        .isString()
        .matches(/^[a-zA-Z0-9\s]+$/).withMessage("Special characters in fname not allowed").bail(),

      check("lastName")
        .trim()
        .notEmpty()
        .withMessage("lastname field couldn't be empty.")
        .bail()
        .isString()
        .withMessage("lname should be a string")
        .matches(/^[a-zA-Z0-9\s]+$/).withMessage("Special characters in lname not allowed").bail(),


      check('email')
        .trim()
        .optional({ checkFalsy: true })
        .isEmail()
        .withMessage('email must be valid email')
        .bail(),


      check("password")
        .trim()
        .notEmpty()
        .withMessage("password field couldn't be empty.")
        .bail()
        .exists()
        .withMessage("password field is required.")
        .bail()
        .matches(/^(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[A-Z])(?=.*\d)[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~A-Za-z\d ]{8,}$/)
        .withMessage("The password field should have a minimum of 8 characters with at least 1 uppercase letter, 1 number & 1 special character")
        .bail(),

      check('mobile')
        .exists().withMessage("Mobile field is required.").bail()
        .notEmpty().withMessage("Mobile field couldn't be empty.").bail()
        .isNumeric().withMessage("Mobile field must be an number.").bail()
        .trim(),

      check('address')
        .exists().withMessage("address field is required.").bail()
        .notEmpty().withMessage("address field couldn't be empty.").bail()
        .isString().withMessage("address field must be an string.").bail()
        .trim(),
    ]
  }

  login() {
    return [

      check('email')
        .trim()
        .optional({ checkFalsy: true })
        .isEmail()
        .withMessage('email must be valid email')
        .bail(),


      check("password")
        .trim()
        .notEmpty()
        .withMessage("password field couldn't be empty.")
        .bail()
        .exists()
        .withMessage("password field is required.")
        .bail()
        .matches(/^(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[A-Z])(?=.*\d)[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~A-Za-z\d ]{8,}$/)
        .withMessage("The password field should have a minimum of 8 characters with at least 1 uppercase letter, 1 number & 1 special character")
        .bail()

    ]
  }

}

export const userValidation = new UserValidation();
