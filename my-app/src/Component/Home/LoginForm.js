import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../../Context/Auth";

function LoginForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);

  const handleOnChangeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const {
    LoginUsers,
    AuthState: { user },
  } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!data.password || !data.email) {
      return null;
    } else {
      await LoginUsers(data);
    }
  };

  return (
    <>
      {user ? (
        <Redirect to="/" />
      ) : (
        <form className="form-custom" onSubmit={handleLogin}>
          <div className="imgcontainer">
            <img
              src="https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-cho-con-gai-1.jpg"
              alt="Avatar"
              className="avatar"
            />
          </div>

          <div className="container">
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

            <div className="password">
              <label htmlFor="psw">
                <b>Password</b>
              </label>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter Password"
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

            <button type="submit">Login</button>

            <span>
              Nếu bạn chưa có tài khoản <Link to="/register">Đăng ký ngay</Link>
            </span>
          </div>
        </form>
      )}
    </>
  );
}

export default LoginForm;
