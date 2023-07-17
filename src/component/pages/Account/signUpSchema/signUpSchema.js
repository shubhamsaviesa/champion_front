import * as Yup from "yup";

export const signupSchema = Yup.object({
  firstname: Yup.string()
    .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-ž0-9\s\-\/.]+$/, "Please enter valid name")
    .max(40)
    .required(),
  lastname: Yup.string()
    .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-ž0-9\s\-\/.]+$/, "Please enter valid name")
    .max(40)
    .required(),
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username must be Alphanumeric with more than 4 and less than 10 character"
    )
    .max(40)
    .required(),
  mobilenumber: Yup.string()
    .min(10)
    .required("Please enter your mobilenumber "),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please fill the password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
