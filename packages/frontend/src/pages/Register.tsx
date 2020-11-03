import React from "react";
import { Formik, Form, Field } from "formik";
import "./../App.scss";
import logo from "./../st-andrews-logo.png";
import { passwordClient } from "../utils/accounts";
import { GraphQLErrorList } from "@accounts/graphql-client";

interface FormValues {
  username: string;
  email: string;
  password: string;
  name: string;
}

async function registerUser(values: FormValues) {
  try {
    await passwordClient.createUser({
      username: values.username,
      email: values.email,
      password: values.password,
      profile: {
        name: values.name,
      },
    });
  } catch (err) {
    if (err instanceof GraphQLErrorList) {
      console.log(err.message);
    }
  }
}

const SignupForm = (): JSX.Element => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    name: "",
  };
  return (
    <div className="container">
      <img src={logo} alt="st andrews logo" width="250" height="300"></img>
      <Formik
        initialValues={initialValues}
        //TODO add validation
        onSubmit={(values) => {
          registerUser(values);
        }}
      >
        <Form>
          <div>
            <label htmlFor="username">Username:</label>
            <Field name="username" />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <Field name="email" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <Field name="password" />
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <Field name="name" />
          </div>
          <button type="submit" className="Submit-button">
            Create Account
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignupForm;