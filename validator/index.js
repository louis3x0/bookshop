exports.userSignupValidator = (req, res, next) => {
  req.check("name", "Numele este necesar").notEmpty();
  req
    .check("email", "Email-ul trebuie sa fie intre 3 si 32 de caractere")
    .matches(/.+\@.+\..+/)
    .withMessage("Emailul trebuie sa contina @")
    .isLength({
      min: 4,
      max: 32,
    });
  req.check("password", "Este necesara parola").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Parola trebuie sa contina 6 caractere")
    .matches(/\d/)
    .withMessage("Parola trebuie sa contina un numar");
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};
