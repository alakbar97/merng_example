import { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import { LOGIN_USER } from "../utils/graphql";

const Login = ({ history }) => {
  const [errors, setErrors] = useState({});

  const context = useContext(AuthContext);

  const { handleInputChange, handleSubmit, values } = useForm(() => login(), {
    username: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      history.push("/");
    },
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit} className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <Form.Input
          label="User Name"
          placeholder="Username..."
          name="username"
          value={values.username}
          onChange={handleInputChange}
          type="text"
          error={!!errors.username}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          value={values.password}
          onChange={handleInputChange}
          type="password"
          error={!!errors.password}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {!!Object.keys(errors).length && (
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

export default Login;
