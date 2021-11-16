import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import swal from "sweetalert";
import { API_URL } from "../../const";

function FormCreateNewProduct() {
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    status: "0",
    writer: "",
  });

  const history = useHistory();

  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

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
      .then((dataRes) => {
        if (dataRes) {
          setImage(dataRes.url);
          setLoading(false);
          swal({
            title: "Upload thành công",
            text: "Thêm thông tin rồi ấn add thôi nào",
            icon: "success",
            button: "OK",
          });
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

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    Number(data.price);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (
      data.name === "" ||
      data.description === "" ||
      data.writer === "" ||
      data.price === "" ||
      image === ""
    ) {
      swal({
        title: "Add thất bại",
        text: "Đừng để trống các trường !!!",
        icon: "error",
        button: "OK",
      });

      return;
    } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("name", data.name);
      urlencoded.append("price", data.price);
      urlencoded.append("description", data.description);
      urlencoded.append("image", image);
      urlencoded.append("status", data.status);
      urlencoded.append("writer", data.writer);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(`${API_URL}/products`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (typeof result === "object") {
            swal({
              title: "Thêm mới thành công",
              text: "Bấm ok để quay lại trang quản lý",
              icon: "success",
              button: "OK",
            });
            history.push("/admin");
          } else {
            swal({
              title: "Thêm mới that bai",
              text: "Bấm ok để quay lại trang quản lý",
              icon: "error",
              button: "OK",
            });
            history.push("/admin");
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  useEffect(() => {
    return () => setImage("");
  }, []);

  return (
    <>
      {loading ? (
        <div className="loading">
          <div className="line-loading"></div>
        </div>
      ) : null}
      <form onSubmit={handleOnSubmit} className="margin-top-0 form-custom">
        <div className="container">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            value={data.name}
            onChange={handleOnChange}
          />

          <input
            type="number"
            placeholder="Nhập giá bán"
            name="price"
            required
            value={data.price}
            onChange={handleOnChange}
          />

          <textarea
            placeholder="Description"
            cols="30"
            rows="5"
            value={data.description}
            name="description"
            onChange={handleOnChange}
          ></textarea>

          <div class="custom-select">
            <select name="status" onChange={handleOnChange}>
              <option value="0">Hết hàng</option>
              <option value="1">Còn hàng</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Người bán"
            name="writer"
            required
            value={data.writer}
            onChange={handleOnChange}
          />

          <input
            type="file"
            placeholder="Upload an image"
            onChange={handleUploadFile}
          />

          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
}

export default FormCreateNewProduct;
