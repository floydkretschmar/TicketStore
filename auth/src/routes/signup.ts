import express, { Request, Response } from "express";
import { body, ValidationError, validationResult } from "express-validator";

const router = express.Router();

type SignupRequest = {
  email: string;
  password: string;
};

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("The provided e-mail is not valid."),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .isStrongPassword({ minLength: 4, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })
      .withMessage(
        "The password must be anywhere between 4 and 20 characters long and contain both upper- and lower-case characters, as well as numbers."
      ),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    } else {
      const request = req.body as SignupRequest;
      return res.send(`User ${request.email} with password ${request.password} created.`);
    }
  }
);

export { router as signupRouter };
