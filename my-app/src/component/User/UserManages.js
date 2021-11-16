import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../../const";
import { ProductContext } from "../../Context/ProductContext";
import swal from "sweetalert";

function UserManages() {
  const { loading, setLoading } = useContext(ProductContext);

  const getAllUsers = () => {
    fetch(`${API_URL}/users?roleId=user`)
      .then((res) => res.json())
      .then((users) => {
        if (typeof users === "object") {
          setUsers(users);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    setLoading(true);
    getAllUsers();
  }, []);

  const deleteUser = (id) => {
    swal({
      title: "Bạn có chắc là xóa hok",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const option = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        };

        fetch(`${API_URL}/users/${id}`, option)
          .then((res) => res.json())
          .then((data) => {
            if (typeof data === "object") {
              swal({
                title: "Xóa thành công",
                icon: "success",
                buttons: "OK",
              });
              getAllUsers();
            }
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const [users, setUsers] = useState([]);

  return (
    <>
      <div className="users">
        {loading ? (
          <div className="loading-admin">
            <div class="loader"></div>
          </div>
        ) : (
          users &&
          users.map((user, index) => (
            <div className="users-item" key={index}>
              <p className="users-id">{index}</p>
              <p className="users-name">{user.username}</p>
              <img
                src={
                  user.avatar
                    ? user.avatar
                    : "https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-cho-con-gai-1.jpg"
                }
                alt={user.username}
                className="users-avatar"
              />
              <p className="users-email">{user.email}</p>
              <p className="users-role">{user.roleId}</p>

              <div className="review-action">
                <div className="review-edit">
                  <i class="fas fa-pen"></i>
                </div>
                <div
                  className="review-delete"
                  onClick={() => deleteUser(user.id)}
                >
                  <i class="fas fa-trash"></i>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default UserManages;
