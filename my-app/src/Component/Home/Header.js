import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../Context/Auth";
import { ProductContext } from "../../Context/ProductContext";
import { CLEAN_CART } from "../../const";
import PropTypes from "prop-types"

function Header(props) {
  const {
    AuthState: { user },
    logOutUser,

    setRole,
  } = useContext(AuthContext);

  const history = useHistory();

  const {
    ProductState: { cart },
    dispatch,
  } = useContext(ProductContext);

  const logOut = () => {
    logOutUser();
    setRole(null);
    dispatch({ type: CLEAN_CART, payload: [] });
  };

  const [keyword, setKeyword] = useState("");

  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="header">
        <div className="header-logo">
          <Link to="/">
          <img src="https://i.imgur.com/dB2gHrb.png" width="70" height="70"></img>
            RESmart
          </Link>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (keyword !== "") {
              history.push(`/search/${keyword}`);
              setKeyword("");
            } else {
              return null;
            }
          }}
          className="header-search"
        >
          <input
            type="text"
            className="header-search-input"
            placeholder="Search...."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <div className="input-submit">
            <i className="fas fa-search"></i>
          </div>
        </form>

        <div className="header-info">
          <Link to="/cart" className="header-cart">
            Giỏ hàng
            <span>{cart.length}</span>
          </Link>

          <div className="nav-menu-mobile" onClick={() => setShowMenu(true)}>
            <i class="fas fa-bars"></i>
          </div>

          <div
            className="nav-mobile"
            style={{ right: showMenu ? "0px" : "-800px" }}
          >
            <div onClick={() => setShowMenu(false)} className="nav-close">
              <i class="fas fa-times"></i>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (keyword) {
                  history.push(`/search/${keyword}`);
                  setKeyword("");
                  setShowMenu(false);
                } else {
                  return;
                }
              }}
              className="form-mobile"
            >
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
              />
            </form>
            <ul className="nav-mobile-list">
              {user && user.roleId === "admin" ? (
                <li className="nav-mobile-item">
                  <Link
                    onClick={() => setShowMenu(false)}
                    to="/admin"
                    className="nav-mobile-link"
                  >
                    Dashboard
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>

          <div className="header-users">
            {user ? ( 
              <>
                <div className="header-avatar">
                  <img
                    src={
                      user.avatar
                        ? user.avatar
                        : 
                        "https://i.imgur.com/z1RwHwe.jpg"
                    }
                    alt="avatar"
                  />
                  <span className="header-username">{user.username}</span>
                </div>
                <div className="header-user-dropdown">
                  {user.roleId === "admin" ? (
                    <Link to="/admin">Dashboard</Link>
                  ) : null}
                  <Link to="/about">Thông tin cá nhân</Link>
                  <Link to="/don_hang">Lịch sử đặt món</Link>
                  <div className="button-logout" onClick={logOut}>
                    Đăng xuất
                  </div>
                </div>
              </>
            ) : ( 
              <Link to="/login" className="login">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

Header.propTypes = {
  login: PropTypes.bool,
}

Header.defaultProps = {
  login: true,
}
export default Header;
{/* <div className="header-users">
    {props.login ? (
      <>
        <div className="header-avatar">
          <img
            src={
                "https://i.imgur.com/z1RwHwe.jpg"
            }
            alt="avatar"
          />
          // <span className="header-username">Người dùng</span> 
        </div>
        <div className="header-user-dropdown">
          <Link to="/about">About</Link>
          <Link to="/don_hang">Lịch sử mua hàng</Link>
          <div className="button-logout" onClick={logOut}>
            Log Out
          </div>
        </div>
      </>
    ) : ( 
      <Link to="/login" className="login">
        Login
      </Link>
    )}
          </div> 
*/}


// sadasdasdashdk


{/* <div className="header-users">
            {user ? ( 
              <>
                <div className="header-avatar">
                  <img
                    src={
                      // user.avatar
                      //   ? user.avatar
                      //   : 
                        "https://i.imgur.com/z1RwHwe.jpg"
                    }
                    alt="avatar"
                  />
                  <span className="header-username">{user.username}</span>
                </div>
                <div className="header-user-dropdown">
                  {user.roleId === "admin" ? (
                    <Link to="/admin">Dashboard</Link>
                  ) : null}
                  <Link to="/about">About</Link>
                  <Link to="/don_hang">Lịch sử mua hàng</Link>
                  <div className="button-logout" onClick={logOut}>
                    Log Out
                  </div>
                </div>
              </>
            ) : ( 
              <Link to="/login" className="login">
                Login
              </Link>
            )}
          </div> */}