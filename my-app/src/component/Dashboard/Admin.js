import React, { useContext, useEffect, useState } from "react";
import { useRouteMatch, Switch, Route, NavLink } from "react-router-dom";
import ProductsManages from "./ProductsManages";
import FormCreateNewProduct from "./FormCreateNewProduct";
import FormEditProduct from "./FormEditProduct";
import UserManages from "../User/UserManages";
import { API_URL } from "../../const";
import { AuthContext } from "../../Context/Auth";
import Pay_Product from "./Pay_Product";

function Admin() {
  const match = useRouteMatch(); 

  const { role, setRole } = useContext(AuthContext);

  useEffect(() => {
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
          if (result.roleId === "user") {
            setRole("user");
          } else if (result.roleId === "admin") {
            setRole("admin");
          } else {
            setRole(null);
          }
        })
        .catch((error) => console.log("error", error));
    };

    loadUser();
  }, []);

  const [showCategory, setShowCategory] = useState(false);

  return (
    <>
      {role === "admin" ? (
        <div className="admin">
          <div
            className="nav-menu-mobile"
            onClick={() => setShowCategory(!showCategory)}
          >
            <i class="fas fa-bars text-black"></i>
          </div>
          <div
            className="category"
            style={{ right: showCategory ? "0px" : "-800px" }}
            onClick={() => setShowCategory(false)}
          >
            <ul className="category-list">
              <li className="category-item">
                <NavLink
                  exact
                  activeClassName="active"
                  className="category-link"
                  to={`${match.path}`}
                >
                  Qu???n l?? s???n ph???m
                </NavLink>
              </li>
              <li className="category-item">
                <NavLink
                  exact
                  activeClassName="active"
                  className="category-link"
                  to={`${match.path}/products/add`}
                >
                  Th??m s???n ph???m m???i
                </NavLink>
              </li>
              <li className="category-item">
                <NavLink
                  exact
                  activeClassName="active"
                  className="category-link"
                  to={`${match.path}/users`}
                >
                  Qu???n l?? ng?????i d??ng
                </NavLink>
              </li>

              <li className="category-item">
                <NavLink
                  exact
                  activeClassName="active"
                  className="category-link"
                  to={`${match.path}/don-hang`}
                >
                  C??c ????n h??ng ch??a x??? l??
                </NavLink>
              </li>
            </ul>
          </div>

          <Switch>
            <Route path={`${match.path}`} component={ProductsManages} exact />
            <Route
              path={`${match.path}/products/add`}
              component={FormCreateNewProduct}
              exact
            />
            <Route
              path={`${match.path}/products/edit/:id`}
              component={FormEditProduct}
              exact
            />
            <Route path={`${match.path}/users`} component={UserManages} exact />
            <Route
              path={`${match.path}/don-hang`}
              component={Pay_Product}
              exact
            />
          </Switch>
        </div>
      ) : (
        <div className="not-view">
          <p>B???n ko c?? quy???n xem trang n??y</p>
        </div>
      )}
    </>
  );
}

export default Admin;
