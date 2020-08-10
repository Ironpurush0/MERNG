import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import "./Signup.css";

const Login = (props) => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      console.log(result);
      props.history.push("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          type="text"
          label="Username"
          placeholder="Username"
          name="username"
          error={errors.username ? true : false}
          value={values.username}
          onChange={onChange}
        />

        <Form.Input
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          error={errors.password && true}
          value={values.password}
          onChange={onChange}
        />

        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
