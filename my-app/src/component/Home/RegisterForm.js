import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import swal from "sweetalert";

function RegisterForm() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    comfirmPassword: "",
  });

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
      if (!alert("Đăng ký thành công")) document.location = "/";
    }
  };

  return (
    <>
        <form className="form-custom-reg" onSubmit={handleRegister}>
          <h1 style={{marginTop: "2vh", marginBottom: "1vh"}}> Đăng ký thành viên mới</h1>
          <div className="container">
            <label htmlFor="uname">
              <b>Tên khách hàng</b>
            </label>
            <input
              type="username"
              placeholder="Nhập tên của khách hàng"
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
              placeholder="Nhập email"
              name="email"
              required
              value={data.email}
              onChange={handleOnChangeInput}
            />

            <label htmlFor="psw">
              <b>Mật khẩu</b>
            </label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              name="password"
              required
              value={data.password}
              onChange={handleOnChangeInput}
            />

            <label htmlFor="psw">
              <b>Xác nhận lại mật khẩu</b>
            </label>
            <input
              type="password"
              placeholder="Nhập lại mật khẩu"
              name="comfirmPassword"
              required
              value={data.comfirmPassword}
              onChange={handleOnChangeInput}
            />

            <button type="submit">Đăng ký</button>

            <span>
              Nếu bạn đã có tài khoản <Link to="/login">Đăng nhập ngay</Link>{" "}
            </span>
          </div>
        </form>
      )
    </>
  );
}

export default RegisterForm;
