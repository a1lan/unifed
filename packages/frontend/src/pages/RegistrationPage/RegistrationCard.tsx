/*
 * CS3099 Group A3
 */

import { ReactElement, useState } from "react";
import { Redirect } from "react-router";
import { Formik, Form, Field } from "formik";
import { Alert } from "@material-ui/lab";
import { validateUsername, validateName, validateEmail, validatePassword } from "@unifed/shared";

import {
  Button,
  Card,
  Link,
  CardContent,
  TextField,
  Snackbar,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

import { passwordClient } from "../../helpers";
import { PasswordStrengthMeter } from "../../components/PasswordStrengthMeter";
import { PasswordField } from "../../components/PasswordField";

interface Values {
  username: string;
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

function validate({ username, name, email, password, repeatPassword }: Values) {
  const errors: Partial<Values> = {};
  if (!validateUsername(username)) {
    errors.username = "Invalid username";
  }
  if (!validateName(name)) {
    errors.name = "Invalid name";
  }
  if (!validateEmail(email)) {
    errors.email = "Invalid email";
  }
  if (!validatePassword(password).valid) {
    errors.password = "Password not strong enough";
  }
  if (repeatPassword !== password) {
    errors.repeatPassword = "Passwords do not match";
  }
  return errors;
}

export function RegistrationCard(): ReactElement {
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  const registerUser = async (values: Values) => {
    try {
      await passwordClient.createUser({
        username: values.username,
        profile: {
          name: values.name,
        },
        email: values.email,
        password: values.password,
      });
      await passwordClient.requestVerificationEmail(values.email);
      setIsAccountCreated(true);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Formik
            initialValues={{
              username: "",
              name: "",
              email: "",
              password: "",
              repeatPassword: "",
            }}
            validate={validate}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={registerUser}
          >
            {({ errors }) => (
              <Form>
                <div>
                  <Field
                    name="username"
                    as={TextField}
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Username"
                    color="primary"
                    helperText={errors.username}
                    error={!!errors.username}
                  />
                </div>
                <div>
                  <Field
                    name="name"
                    as={TextField}
                    fullWidth
                    size="small"
                    margin="dense"
                    variant="outlined"
                    label="Name"
                    color="primary"
                    helperText={errors.name}
                    error={!!errors.name}
                  />
                </div>
                <div>
                  <Field
                    name="email"
                    as={TextField}
                    fullWidth
                    size="small"
                    margin="dense"
                    variant="outlined"
                    label="Email"
                    color="primary"
                    helperText={errors.email}
                    error={!!errors.email}
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    as={PasswordField}
                    fullWidth
                    size="small"
                    margin="dense"
                    variant="outlined"
                    label="Password"
                    color="primary"
                    helperText={errors.password}
                    error={!!errors.password}
                    onKeyUp={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <PasswordStrengthMeter password={password} />
                </div>
                <div>
                  <Field
                    name="repeatPassword"
                    as={PasswordField}
                    fullWidth
                    size="small"
                    margin="dense"
                    variant="outlined"
                    label="Repeat Password"
                    color="primary"
                    helperText={errors.repeatPassword}
                    error={!!errors.repeatPassword}
                  />
                </div>
                <FormControlLabel
                  control={<Checkbox color="primary" required />}
                  label={
                    <span>
                      I have read the{" "}
                      <Link href="/privacy-notice" target="blank">
                        privacy notice
                      </Link>
                    </span>
                  }
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ margin: "1rem 0rem" }}
                  fullWidth
                >
                  Create Account
                </Button>
              </Form>
            )}
          </Formik>
          {isAccountCreated ? <Redirect to="/" /> : null}
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorMessage !== null}
      >
        <Alert severity="error">
          There was an error when creating your account: {errorMessage}.
        </Alert>
      </Snackbar>
    </>
  );
}