import { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initialState = { user: null };

if (localStorage.getItem("graphql_jwt_token")) {
  const decodedToken = jwtDecode(localStorage.getItem("graphql_jwt_token"));

  if (decodedToken.exp * 1000 < Date.now())
    localStorage.removeItem("graphql_jwt_token");
  else initialState.user = decodedToken;
}

const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
});

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        user: payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (data) => {
    localStorage.setItem("graphql_jwt_token", data.token);
    dispatch({ type: "LOGIN", payload: data });
  };

  const logout = () => {
    localStorage.removeItem("graphql_jwt_token");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
