import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { API_URL } from "../../const";
import { AuthContext } from "../../Context/Auth";
import { ProductContext } from "../../Context/ProductContext";

function Don_hang() {
  const idUser = localStorage.getItem("idUser");

  const [historyBuyProduct, setHistoryBuyProduct] = useState([]);

  const { loading, setLoading } = useContext(ProductContext);

  const {
    AuthState: { user },
  } = useContext(AuthContext);

  const getDonHang = () => {
    fetch(`${API_URL}/historyBuyProducts/?userId=${idUser}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data === "object") {
          setHistoryBuyProduct(data);
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    setLoading(true);
    getDonHang();
  }, []);

  const deleteChiTietDonHang = (ma_don_hang) => {
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    fetch(`${API_URL}/detailsCard?ma_don_hang=${ma_don_hang}`, option);
  };

  const deleteDonHang = (id, ma_don_hang) => {
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    fetch(`${API_URL}/historyBuyProducts/${id}`, option)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data === "object") {
          deleteChiTietDonHang(ma_don_hang);

          getDonHang();
          swal({
            title: "Hủy đơn thành công",
            icon: "success",
            buttons: "OK",
          });
        }
      });
  };

  let body;

  if (loading) {
    body = (
      <>
        <div className="loading-products">
          <div class="loader"></div>
        </div>
      </>
    );
  } else if (historyBuyProduct.length !== 0) {
    body = historyBuyProduct.map((item) => (
      <div className="historyBuyItem" key={item.id}>
        <div className="historyBuyItem-info">
          <p className="historyBuyItem-name">{item.name}</p>

          <p className="historyBuyItem-price none"> {item.email}</p>

          <p className="historyBuyItem-price"> {item.phone}</p>
        </div>

        <div className="historyBuyItem-action">
          <p
            style={{
              backgroundColor:
                item.status === "Chờ xác nhận"
                  ? "red"
                  : item.status === "Đã xác nhận"
                  ? "blue"
                  : item.status === "Đang giao"
                  ? "#f39c12"
                  : "green",
            }}
            className="historyBuyItem-status"
          >
            {item.status}
          </p>
          <p
            className="historyBuyItem-delete"
            onClick={() => deleteDonHang(item.id, item.ma_don_hang)}
          >
            Hủy đơn hàng
          </p>

          <Link to={`/don_hang/details/${item.ma_don_hang}`}>
            <p className="historyBuyItem-details">Xem chi tiết</p>
          </Link>
        </div>
      </div>
    ));
  } else {
    body = (
      <div className="not-view">
        <p>
          Không có lịch sử <Link to="/">mua hàng ngay</Link>
        </p>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <div className="historyBuy">
          <h1 className="historyBuy-title">Lịch sử mua hàng</h1>
          {body}
        </div>
      ) : (
        <div className="not-view">
          <p>Bạn không có quyền xem trang này</p>
        </div>
      )}
    </>
  );
}

export default Don_hang;
