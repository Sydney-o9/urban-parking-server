const { check, validationResult } = require("express-validator");

exports.checkSignupField = [
  check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Must be a valid name")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be within 3 to 20 character !"),
  check("email").normalizeEmail().isEmail().withMessage("Invalid email !"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password is empty !")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long !"),
  check("confirmPassword")
    .trim()
    .not()
    .isEmpty().withMessage("You must Confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Both password must be the same");
      }
      return true;
    }),
];

exports.checkLoginField = check("email")
  .isEmail()
  .withMessage("email / password is required !"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email / password is required !");

exports.validationResult = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) {
    return next();
  }
  const error = result[0].msg;
  res.json({ success: false, message: error });
};
