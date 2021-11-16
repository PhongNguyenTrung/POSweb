import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/Auth";
import { API_URL } from "../../const";
import swal from "sweetalert";
import ModalEditUser from "./ModalEditUser";

function About() {
  const {
    AuthState: { user },
    loadUser,
  } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleUploadFile = (e) => {
    const files = e.target.files[0];

    let data = new FormData();

    data.append("file", files);
    data.append("upload_preset", "xhkmjqak");

    const option = {
      method: "POST",
      body: data,
    };

    setLoading(true);

    fetch("https://api.cloudinary.com/v1_1/annnn/image/upload", option)
      .then((res) => res.json())
      .then(async (dataRes) => {
        if (dataRes) {
          handleEditAvatar(dataRes.url);
        }
      })
      .catch((error) => {
        setLoading(false);
        swal({
          title: "Upload thất bại",
          text: error,
          icon: "error",
          button: "OK",
        });
      });
  };

  const handleEditAvatar = (image) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    const urlencoded = new URLSearchParams();
    urlencoded.append("avatar", image);
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    fetch(`${API_URL}/users/${user.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (typeof result === "object") {
          setLoading(false);
          swal({
            title: "Thay đổi thành công",
            icon: "success",
            button: "OK",
          });
          loadUser();
        }
      })
      .catch((error) => console.log(error));
  };

  let about;

  if (!user) {
    about = (
      <div className="not-view">
        <p>Bạn không có quyền xem trang này</p>
      </div>
    );
  } else {
    about = (
      <>
        {loading ? (
          <div className="loading">
            <div className="line-loading"></div>
          </div>
        ) : null}
        <div className="about">
          <div className="about-wrap">
            <div className="about-avatar">
              <img
                src={
                  user.avatar
                    ? user.avatar
                    : "https://pdp.edu.vn/wp-content/uploads/2021/05/hinh-anh-avatar-cho-con-gai-1.jpg"
                }
                alt="avatar"
              />
              <label className="about-edit-avatar" htmlFor="avatar">
                Đổi ảnh đại diện
              </label>
              <input
                type="file"
                id="avatar"
                placeholder="Thay đổi ảnh đại diện"
                onChange={handleUploadFile}
              />
            </div>
            <div className="about-info">
              <h1>{user.username}</h1>
              <p>{user.email}</p>
            </div>
            <div className="about-action">
              <button onClick={() => setShowModal(true)} className="about-edit">
                Chỉnh sửa thông tin
              </button>
              <button className="about-edit-password">
                Chỉnh sửa mật khẩu
              </button>
            </div>
          </div>

          <ModalEditUser
            data={user}
            setShowModal={setShowModal}
            showModal={showModal}
            loadUser={loadUser}
            setLoading={setLoading}
          />
        </div>
      </>
    );
  }

  return <>{about}</>;
}

export default About;
