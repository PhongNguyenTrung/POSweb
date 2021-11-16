import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import swal from "sweetalert";
import { API_URL } from "../../const";

function FormEditProduct() {
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    status: "0",
    writer: "",
  });

  const [image, setImage] = useState("");

  const history = useHistory();

  const params = useParams();

  useEffect(() => {
    const getDataProductFromApi = () => {
      fetch(`${API_URL}/products/${params.id}`)
        .then((res) => res.json())
        .then((respon) => {
          setData({
            name: respon.name,
            price: respon.price,
            description: respon.description,
            status: respon.status,
            writer: respon.writer,
          });
          setImage(respon.image);
        });
    };

    getDataProductFromApi();
  }, []);

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      data.name === "" ||
      data.description === "" ||
      data.writer === "" ||
      data.price === ""
    ) {
      swal({
        title: "Edit thành công",
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
      urlencoded.append("price", Number.parseFloat(data.price));
      urlencoded.append("description", data.description);
      urlencoded.append("status", data.status);
      urlencoded.append("writer", data.writer);
      urlencoded.append("image", image);

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(`${API_URL}/products/${params.id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (typeof result === "object") {
            swal({
              title: "Sửa thành công",
              text: "Bấm ok để quay lại trang quản lý",
              icon: "success",
              button: "OK",
            });
            history.push("/admin");
          } else {
            swal({
              title: "Sửa thất bại",
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

  return (
    <>
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
            <select name="status" value={data.status} onChange={handleOnChange}>
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

          <button type="submit">Edit</button>
        </div>
      </form>
    </>
  );
}

export default FormEditProduct;
