import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { CLEAN_CART } from "../../const";
import CartItem from "./CartItem";
import { API_URL } from "../../const";
import { v4 as uuidv4 } from "uuid";
import swal from "sweetalert";
import { AuthContext } from "../../Context/Auth";
import { useHistory } from "react-router-dom";

function Cart() {
  const {
    ProductState: { cart },
    dispatch,
  } = useContext(ProductContext);

  const {
    AuthState: { user },
  } = useContext(AuthContext);

  const history = useHistory();

  const payCart = () => {
    if (user) return setShowModal(true);

    swal({
      title: "Bạn cần đăng nhập để mua hàng",
      icon: "warning",
      buttons: "OK",
    });

    history.push("/login");
  };

  const { loading, setLoading } = useContext(ProductContext);

  const [showModal, setShowModal] = useState(false);

  const random = uuidv4();

  const [tong_don_hang, setTong_don_hang] = useState();

  useEffect(() => {
    const totalPrice = (array) => {
      return array.reduce((total, item) => {
        return (total += Number(item.price * item.quanlity));
      }, 0);
    };

    setTong_don_hang(totalPrice(cart));
  }, [cart]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const [data, setData] = useState({
    userId: localStorage.getItem("idUser"),
    email: "",
    name: "",
    address: "",
    phone: "",
    ma_don_hang: random,
    price: "",
    status: "Chờ xác nhận",
  });

  const handleOnChangeModal = (e) => {
    setData({ ...data, [e.target.name]: e.target.value, price: tong_don_hang });
  };

  const luu_chi_tiet_don_hang = () => {
    const data_fecth_api = {
      ma_don_hang: data.ma_don_hang,
      detailsCart: cart,
      giaTriDonHang: data.price,
      address: data.address,
    };

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data_fecth_api),
    };

    fetch(`${API_URL}/detailsCart`, option)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data === "object") {
          dispatch({ type: CLEAN_CART, payload: [] });

          setLoading(false);

          swal({
            title: "Cảm ơn quý khách đã mua hàng",
            text: "Chúng tôi sẽ liên hệ với bạn sớm nhất",
            icon: "success",
            buttons: "OK",
          });
        }
      });
  };

  const luu_don_hang = () => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    };

    fetch(`${API_URL}/historyBuyProducts`, option)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data === "object") {
          luu_chi_tiet_don_hang();
        }
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    luu_don_hang();

    setData({
      ...data,
      email: "",
      name: "",
      address: "",
      phone: "",
      ma_don_hang: random,
    });
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <div className="line-loading"></div>
        </div>
      ) : null}
      <div className="cart">
        <h1 className="cart-title">Cart</h1>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <CartItem key={item.id} data={item} index={index} />
          ))
        ) : (
          <div className="cart-no">
            <h1>Không có sản phẩm nào</h1>
          </div>
        )}

        <div className="pay">
          <h1>Tổng cộng: {tong_don_hang}k VND</h1>

          <div className="pay-to-win" onClick={payCart}>
            Thanh toán
          </div>
        </div>
      </div>

      <form
        onSubmit={handleOnSubmit}
        style={{ display: showModal ? "flex" : "none" }}
        className="modal"
      >
        <div className="modal-container">
          <div className="container">
            <label htmlFor="uname">
              <b>Email</b>
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={handleOnChangeModal}
              value={data.email}
            />

            <label htmlFor="psw">
              <b>Họ tên</b>
            </label>
            <input
              type="text"
              name="name"
              required
              onChange={handleOnChangeModal}
              value={data.name}
            />

            <label htmlFor="psw">
              <b>Địa chỉ</b>
            </label>
            <input
              type="text"
              name="address"
              required
              onChange={handleOnChangeModal}
              value={data.address}
            />

            <label htmlFor="psw">
              <b>Số điện thoại</b>
            </label>
            <input
              type="number"
              name="phone"
              required
              onChange={handleOnChangeModal}
              value={data.phone}
            />

            <button
              type="submit"
              onClick={() => {
                setShowModal(false);
                setLoading(true);
              }}
            >
              Xác nhận đơn hàng
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Cart;
