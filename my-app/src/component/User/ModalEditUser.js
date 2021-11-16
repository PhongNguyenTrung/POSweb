import React, { useState } from "react";
import swal from "sweetalert";
import { API_URL } from "../../const";

function ModalEditUser({
  data,
  showModal,
  setShowModal,
  loadUser,
  setLoading,
}) {
  const [dataEidt, setDataEidt] = useState({
    username: data.username,
    email: data.email,
  });

  const handleEditUser = (e) => {
    e.preventDefault();

    setShowModal(false);

    setLoading(true);

    const option = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(dataEidt),
    };

    fetch(`${API_URL}/users/${data.id}`, option)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data === "object") {
          swal({
            title: "Cập nhật thông tin thành công",
            icon: "success",
            buttons: "OK",
          });
          loadUser();
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleOnchange = (e) => {
    setDataEidt({ ...dataEidt, [e.target.name]: e.target.value });
  };
  return (
    <div className="overlay" style={{ display: showModal ? "flex" : "none" }}>
      <form
        onSubmit={handleEditUser}
        className="form-custom"
        style={{ height: "auto" }}
      >
        <div className="modal-close" onClick={() => setShowModal(false)}>
          <i class="fas fa-times"></i>
        </div>
        <h1 className="title">Chỉnh sửa</h1>
        <div className="container">
          <label htmlFor="uname">
            <b>Username</b>
          </label>
          <input
            type="username"
            placeholder="Enter Username"
            name="username"
            required
            value={dataEidt.username}
            onChange={handleOnchange}
          />

          <label htmlFor="uname">
            <b>Email</b>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            required
            value={dataEidt.email}
            onChange={handleOnchange}
          />

          <button type="submit">Cập nhật lại thông tin</button>
        </div>
      </form>
    </div>
  );
}

export default ModalEditUser;
