import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../Context/Auth";

function RegisterForm() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    comfirmPassword: "",
  });

  const {
    regsiterUser,
    AuthState: { user },
  } = useContext(AuthContext);

  const handleOnChangeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (data.comfirmPassword !== data.password) {
      swal({
        title: "Mật khẩu không trùng khớp",
        icon: "error",
        buttons: "OK",
      });
    } else {
      regsiterUser(data);
    }
  };

  return (
    <>
      {user ? (
        <Redirect to="/" />
      ) : (
        <form className="form-custom" onSubmit={handleRegister}>
          <h1 className="title">Đăng ký thành viên mới</h1>
          <div className="container">
            <label htmlFor="uname">
              <b>Username</b>
            </label>
            <input
              type="username"
              placeholder="Enter Username"
              name="username"
              required
              value={data.username}
              onChange={handleOnChangeInput}
            />

            <label htmlFor="uname">
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              required
              value={data.email}
              onChange={handleOnChangeInput}
            />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              value={data.password}
              onChange={handleOnChangeInput}
            />

            <label htmlFor="psw">
              <b>Comfirm Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Comfirm Password"
              name="comfirmPassword"
              required
              value={data.comfirmPassword}
              onChange={handleOnChangeInput}
            />

            <button type="submit">Register</button>

            <span>
              Nếu bạn đã có tài khoản <Link to="/login">Đăng nhập ngay</Link>{" "}
            </span>
          </div>
        </form>
      )}
    </>
  );
}

export default RegisterForm;
