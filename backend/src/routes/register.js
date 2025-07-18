import express from "express";
import registerUser from "../controllers/registerController.js";
import check from "express-validator";

const router = express.Router();
router.post(
  "/",
  [
    // input validation on registration attempts
    check("email")
      .trim()
      .notEmpty()
      .withMessage("Enter a valid email")
      .isEmail()
      .withMessage("Enter a valid email"),
    check("password")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Enter a password.")
      .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minSymbols: 1,
        minNumbers: 1,
      })
      .withMessage(
        "Password needs to be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one symbol."
      ),
  ],
  registerUser
);

export default router;
