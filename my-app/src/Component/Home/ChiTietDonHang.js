import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../const";
import { AuthContext } from "../../Context/Auth";
import { ProductContext } from "../../Context/ProductContext";

function ChiTietDonHang() {
  const params = useParams();

  const [data, setData] = useState({});

  const { loading, setLoading } = useContext(ProductContext);

  const {
    AuthState: { user },
  } = useContext(AuthContext);

  useEffect(() => {
    const getChiTietDonHang = (ma_don_hang) => {
      fetch(`${API_URL}/detailsCart?ma_don_hang=${ma_don_hang}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data[0]);
          setLoading(false);
        });
    };

    setLoading(true);

    getChiTietDonHang(params.ma_don_hang);
  }, []);

  const { detailsCart } = data;

  let body;

  if (user) {
    body = (
      <div className="chi-tiet-don-hang">
        <h1 className="title">Chi tiết đơn hàng</h1>

        <div className="chi-tiet-don-hang-wrap">
          {loading ? (
            <>
              <div className="loading-products">
                <div class="loader"></div>
              </div>
            </>
          ) : (
            <>
              {data ? (
                <>
                  <p className="chi-tiet-don-hang-maDonHang">
                    Mã đơn hàng: {data && data.ma_don_hang}
                  </p>
                  <p className="chi-tiet-don-hang-maDonHang">
                    Địa chỉ: {data && data.address}
                  </p>
                  <p>Sản phẩm</p>
                  {detailsCart &&
                    detailsCart.map((item, index) => (
                      <div className="cart-item" key={index}>
                        <p className="cart-id">{index}</p>
                        <p className="cart-name">{item.name}</p>
                        <img
                          src={item.image}
                          alt="product img"
                          className="cart-img"
                        />
                        <p className="cart-price">${item.price}</p>
                        <div className="soluong">{item.quanlity}</div>
                      </div>
                    ))}

                  <p className="total">Tổng cộng ${data.giaTriDonHang}</p>
                </>
              ) : null}
            </>
          )}
        </div>
      </div>
    );
  } else {
    body = (
      <div className="not-view">
        <p>Bạn không có quyền xem trang này</p>
      </div>
    );
  }

  return <>{body}</>;
}

export default ChiTietDonHang;
