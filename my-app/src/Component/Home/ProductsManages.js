import React, { useContext, useEffect, useState } from "react";
import ProductManagesItems from "./ProductManagesItems";
import { API_URL } from "../../const";
import swal from "sweetalert";
import { ProductContext } from "../../Context/ProductContext";

function ProductsManages() {
  const [products, setProducts] = useState([]);
  const { loading, setLoading } = useContext(ProductContext);

  const getProduct = () => {
    fetch(`${API_URL}/products`).then((res) =>
      res.json().then((data) => {
        setProducts(data);
        setLoading(false);
      })
    );
  };

  useEffect(() => {
    setLoading(true);
    getProduct();
  }, []);

  const deleteProduct = (id) => {
    swal({
      title: "Bạn có chắc là xóa hok",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const urlencoded = new URLSearchParams();

        const requestOptions = {
          method: "DELETE",
          body: urlencoded,
          redirect: "follow",
        };

        fetch(`${API_URL}/products/${id}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (typeof result === "object") {
              swal({
                title: "Xóa thành công",
                icon: "success",
                button: "OK",
              });

              getProduct();
            }
          })
          .catch((error) => console.log("error", error));
      } else {
        return null;
      }
    });
  };

  let body;

  if (loading) {
    body = (
      <div className="loading-admin">
        <div class="loader"></div>
      </div>
    );
  } else {
    body = products.map((item, index) => (
      <ProductManagesItems
        deleteFunc={deleteProduct}
        index={index}
        data={item}
        key={item.id}
      />
    ));
  }

  return <div className="product-manages">{body}</div>;
}

export default ProductsManages;
