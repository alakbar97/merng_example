import { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";

import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";
import { REGISTER_USER } from "../utils/graphql";

const Register = ({ history }) => {
  const [errors, setErrors] = useState({});

  const context = useContext(AuthContext);

  const { handleInputChange, handleSubmit, values } = useForm(() => addUser(), {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
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
        <h1>Register</h1>
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
          label="Email"
          placeholder="Email..."
          name="email"
          value={values.email}
          onChange={handleInputChange}
          type="text"
          error={!!errors.email}
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
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleInputChange}
          type="password"
          error={!!errors.confirmPassword}
        />
        <Button type="submit" primary>
          Register
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

export default Register;
