import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { CLEAN_CART } from "../../const";
import CartItem from "./CartItem";
import { API_URL } from "../../const";
import { v4 as uuidv4 } from "uuid";
import swal from "sweetalert";
import { AuthContext } from "../../Context/Auth";
import { useHistory } from "react-router-dom";
import { Input, Radio } from 'antd';
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
    if (user) {
      if (document.getElementById("Takeaway").checked)
      return setShowModal(true);
      setLoading(true);
      return luu_don_hang();
    }

    else {
      swal({
        title: "Bạn cần đăng nhập để mua hàng",
        icon: "warning",
        buttons: "OK",
      });

      history.push("/login");
    }
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

          if (document.getElementById("Takeaway").checked)
          swal({
            title: "Cảm ơn quý khách đã mua hàng",
            text: "Chúng tôi sẽ giao hàng đến địa chỉ của bạn trong thời gian sớm nhất",
            icon: "success",
            buttons: "OK",
          });
          else {
            if (document.getElementById("Cash").checked)
              swal({
                title: "Cảm ơn quý khách đã mua hàng",
                text: "Vui lòng thanh toán cho nhân viên tại quầy",
                icon: "success",
                buttons: "OK",
              });
            else if (document.getElementById("Card").checked){
              swal({
                title: "Cảm ơn quý khách đã mua hàng",
                text: "Vui lòng thanh toán qua thẻ ngân hàng",
                icon: "success",
                buttons: "OK",
              });
              history.push("/card");
            }
            else
            swal({
              title: "Cảm ơn quý khách đã mua hàng",
              text: "Vui lòng thanh toán cho qua Momo",
              icon: "success",
              buttons: "OK",
            });
        }
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

  const { TextArea } = Input;
  // Chỉ chọn một
  const [value, setValue] = React.useState(1);
  const [value2, setValue2] = React.useState(2);
  const onChange = e => {
    setValue(e.target.value);
    if (document.getElementById("Takeaway").checked){
      setValue2(e.target.value2)
      document.getElementById("Momo").disabled=true;
      document.getElementById("Card").disabled=true;
    }
    else{
      document.getElementById("Momo").disabled=false;
      document.getElementById("Card").disabled=false;
    }
  };
  const onChange2 = e => {
    setValue2(e.target.value);
  };
  return (
    <>
      {loading ? (
        <div className="loading">
          <div className="line-loading"></div>
        </div>
      ) : null}
      <div className="cart">
        <h1 className="cart-title">Giỏ hàng</h1>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <CartItem key={item.id} data={item} index={index} />
          ))
        ) : (
          <div className="cart-no">
            <h1>Không có sản phẩm nào</h1>
          </div>
        )}

        
        <div className="additional">
          <h1>Phương thức dùng bữa: {' '} 
          <Radio.Group name="PlaceMethod" onChange={onChange} value={value}>
          <Radio value={1}>Ăn tại chỗ</Radio>
          <Radio value={2} id="Takeaway">Mang đi</Radio>
          </Radio.Group>
          </h1>
          <h1>Phương thức thanh toán: {' '} 
          <Radio.Group name="PayMethod" id="PayMethod" onChange={onChange2} value={value2}>
          <Radio value={"Cash"} id="Cash">Tiền mặt</Radio>
          <Radio value={"Momo"} id="Momo">Momo</Radio>
          <Radio value={"Card"} id="Card">Thẻ ngân hàng</Radio>
          </Radio.Group>
          </h1>
          <h1>Mã giảm giá: {'   '} 
            <Input placeholder="Nhập mã giảm giá" style={{marginLeft: "3vw", width: "20vw"}} />
          </h1>
          <h1>Yêu cầu đi kèm: {'   '} 
          <TextArea rows={4} placeholder="Nhập các yêu cầu đi kèm với món ăn"/>
          </h1>
        </div>

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
