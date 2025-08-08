import { useForm } from "react-hook-form";
import { useAuthContext } from "../context/AuthProvider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

type LoginFormInput = {
  email: string;
  password: string;
};

// specifies a minimum of 6 characters, 1 upper and 1 lower case, and a number
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

const validation = Yup.object().shape({
  email: Yup.string().email().required("Email is required."),
  password: Yup.string()
    .matches(passwordRules, {
      message:
        "Password must be at least 6 characters, and contain 1 uppercase letter, 1 lowercase letter, and one digit",
    })
    .required("Password is required."),
});

Yup.setLocale({
  string: {
    email: "Enter a valid email",
  },
});

export default function Login() {
  const { loginUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({ resolver: yupResolver(validation) });

  const handleLogin = async (form: LoginFormInput) => {
    loginUser(form.email, form.password);
  };

  return (
    <>
      <Navbar bg="primary">
        <Navbar.Brand className="mx-3" href="/">
          Volunteer App
        </Navbar.Brand>
      </Navbar>
      <Container className="my-5 w-25">
        <Form noValidate onSubmit={handleSubmit(handleLogin)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter an email"
              {...register("email")}
            ></Form.Control>
            {errors.email && (
              <Form.Text className="text-danger">
                {errors.email.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-1">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
            ></Form.Control>
            {errors.password && (
              <Form.Text className="text-danger">
                {errors.password.message}
              </Form.Text>
            )}
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="mx-auto my-3 justify-content-center"
          >
            Sign in
          </Button>
        </Form>
        <p style={{ textAlign: "center" }}>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </Container>
    </>
  );
}
