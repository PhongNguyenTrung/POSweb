import { createContext, useEffect, useReducer, useState } from "react";
import { AuthReducer } from "../Reducer/AuthReducer";
import { API_URL, GET_USER } from "../const";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const history = useHistory();

  const [AuthState, dispatch] = useReducer(AuthReducer, {
    user: null,
  });

  const [role, setRole] = useState("user");

  const LoginUsers = (formData) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", formData.email);
    urlencoded.append("password", formData.password);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(`${API_URL}/login`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.accessToken) {
          localStorage.setItem("accessToken", result.accessToken);
          localStorage.setItem("idUser", result.user.id);

          dispatch({ type: GET_USER, payload: result.user });
          swal({
            title: "Login thành công",
            text: "Bấm ok để tiếp tục",
            icon: "success",
            button: "OK",
          });
          history.goBack();
        } else {
          swal({
            title: "Login thất bại",
            text: result,
            icon: "error",
            button: "OK",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: GET_USER, payload: null });
        swal({
          title: "Login thất bại",
          text: "Server not found",
          icon: "error",
          button: "OK",
        });

        console.log(error);
      });
  };

  const regsiterUser = (formData) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", formData.email);
    urlencoded.append("roleId", "user");
    urlencoded.append("password", formData.password);
    urlencoded.append("username", formData.username);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(`${API_URL}/register`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (typeof result === "object") {
          localStorage.setItem("accessToken", result.accessToken);
          localStorage.setItem("idUser", result.user.id);
          dispatch({ type: GET_USER, payload: result.user });
          swal({
            title: "Register thành công",
            text: "Bấm ok để tiếp tục",
            icon: "success",
            button: "OK",
          });
          history.goBack();
          history.goBack();
        } else {
          dispatch({ type: GET_USER, payload: null });
          swal({
            title: "Register thất bại",
            text: result,
            icon: "error",
            button: "OK",
          });
        }
      })
      .catch((error) => {
        dispatch({ type: GET_USER, payload: null });
        swal({
          title: "Register thất bại",
          text: "Server not found",
          icon: "error",
          button: "OK",
        });

        console.log(error);
      });
  };

  const logOutUser = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("idUser");
    localStorage.removeItem("cart");
    dispatch({ type: GET_USER, payload: null });

    swal({
      title: "Đã đăng xuất",
      icon: "success",
      button: "OK",
    });
  };

  const loadUser = () => {
    const option = {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    };

    const idUser = localStorage.getItem("idUser");

    fetch(`${API_URL}/600/users/${idUser}`, option)
      .then((response) => response.json())
      .then((result) => {
        delete result.password;
        if (typeof result === "object") {
          dispatch({ type: GET_USER, payload: result });
        } else {
          dispatch({ type: GET_USER, payload: null });
          localStorage.removeItem("accessToken");
          localStorage.removeItem("idUser");
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    loadUser();
  }, []);

  const AuthData = {
    AuthState,
    LoginUsers,
    logOutUser,
    regsiterUser,
    loadUser,
    role,
    setRole,
  };

  return (
    <AuthContext.Provider value={AuthData}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
