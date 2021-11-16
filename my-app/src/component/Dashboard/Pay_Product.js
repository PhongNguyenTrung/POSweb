import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { API_URL } from "../../const";

function Pay_Product() {
  const [data, setData] = useState([]);

  const getDonHang = () => {
    fetch(`${API_URL}/historyBuyProducts`)
      .then((res) => res.json())
      .then((response) => setData(response));
  };

  useEffect(() => getDonHang(), []);

  const changeStatusDonHang = (status, id) => {
    swal({
      title: "Bạn muốn đổi trạng thái của đơn hàng",
      buttons: true,
      dangerMode: true,
      icon: "warning",
    }).then((change) => {
      if (change) {
        const option = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({ status: status }),
        };

        fetch(`${API_URL}/historyBuyProducts/${id}`, option)
          .then((res) => res.json())
          .then((response) => {
            if (typeof response === "object") {
              getDonHang();
            }
          });
      }
    });
  };

  return (
    <div className="pay-product">
      {data &&
        data.map((item) => (
          <div className="historyBuyItem">
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
                <i className="fas fa-chevron-left"></i>
                <ul className="dropdown">
                  <li
                    onClick={(e) =>
                      changeStatusDonHang(e.target.textContent, item.id)
                    }
                  >
                    Đã xác nhận
                  </li>
                  <li
                    onClick={(e) =>
                      changeStatusDonHang(e.target.textContent, item.id)
                    }
                  >
                    Đang giao
                  </li>
                  <li
                    onClick={(e) =>
                      changeStatusDonHang(e.target.textContent, item.id)
                    }
                  >
                    Đã giao
                  </li>
                </ul>
              </p>

              <Link to={`/don_hang/details/${item.ma_don_hang}`}>
                <p className="historyBuyItem-details">Xem chi tiết</p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Pay_Product;
