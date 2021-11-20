import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";

function LoginForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);

  const handleOnChangeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!alert("Đăng nhập thành công")) document.location = "/";
  };
  return (
    <>
        <form className="form-custom" 
        onSubmit={handleLogin}
        >
          <h1 style={{marginTop: "5vh", marginBottom: "1vh"}}> Đăng nhập </h1>
          <div className="container">
            <label htmlFor="uname">
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Nhập email"
              name="email"
              required
              value={data.email}
              onChange={handleOnChangeInput}
            />

            <div className="password">
              <label htmlFor="psw">
                <b>Mật khẩu</b>
              </label>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                name="password"
                required
                value={data.password}
                onChange={handleOnChangeInput}
              />
              <i
                onClick={() => setShowPass(!showPass)}
                class={showPass ? "far fa-eye" : "far fa-eye-slash"}
              ></i>
            </div>

            <button type="submit">Đăng nhập</button>

            <span>
              Nếu bạn chưa có tài khoản: <Link to="/register">Đăng ký ngay</Link>
            </span>
          </div>
        </form>
    </>
  );
}

export default LoginForm;
