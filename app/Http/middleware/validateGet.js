const {check, validationResult} = require('express-validator');

exports.validateGet = [
  check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email address!')
    .bail(),
  check('password')
    .trim()
    .isLength({min:6})
    .withMessage('Password must be greater the 6')
    .bail()
    .not()
    .isEmpty()
    .withMessage('Password field cannot be empty')
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];

