import React, { useContext, useEffect, useState } from "react";	
import { useParams, useHistory } from "react-router-dom";	
import { API_URL } from "../../const";	
import { ProductContext } from "../../Context/ProductContext";	
import swal from "sweetalert";	
import Review from "./Review"; 	
import Couter from "./Couter";	
import LoadingDetails from "../Loading/LoadingDetails";	
function ProductDetails() {	
  const params = useParams();	
  const history = useHistory();	
  const [data, setData] = useState({});	
  const { addToCart } = useContext(ProductContext);	
  const [loading, setLoading] = useState(true);	
  useEffect(() => {	
    const getProductDetails = (id) => {	
      fetch(`${API_URL}/products/${id}`)	
        .then((res) => res.json())	
        .then((data) => {	
          return setData(data);	
        });	
    };	
    getProductDetails(params.id);	
  }, []);	
  useEffect(() => {	
    const timer = setTimeout(() => setLoading(false), 1000);	
    return () => clearTimeout(timer);	
  }, []);	
  return (	
    <div className="details">	
      <h2 className="details-title">Chi tiết món ăn</h2>	
      {loading ? (	
        <LoadingDetails />	
      ) : (	
        <>	
          <div className="details-page">	
            <div className="details-img">	
              <img src={data.image} alt="product img" />	
            </div>	
            <div className="details-infomation">	
              <div>	
                <h3 className="details-name">{data.name}</h3>	
                <small style={{ fontSize: "13px"}}>Món ăn #{data.id}</small>	
                <h4 className="details-price">{data.price}k VND</h4>	
              </div>	
              <div className="add-product">	
                <Couter />	
                <div	
                  className="add-button"	
                  onClick={() => {	
                    if (data.status === "1") {	
                      addToCart(data);	
                      history.push("/cart");	
                    } else {	
                      swal({	
                        title: "Sản phẩm này đã hết",	
                        icon: "warning",	
                        buttons: "OK",	
                        dangerMode: true,	
                      });	
                    }	
                  }}	
                >	
                  Thêm vào giỏ hàng	
                </div>	
              </div>	
              <p className="details-des">Mô tả: {data.description}</p>	
              <p className="status" style={{
                fontSize: "16px",
                fontWeight: "400"
              }}>	
                Trạng thái: {data.status === "0" ? "Hết hàng" : "Còn hàng"}	
              </p>	
              <p className="details-des">	
                Đăng bởi: {data.writer ? data.writer : "Admin"}	
              </p>	
            </div>	
          </div>	
        </>	
      )}	
      <Review idProduct={params.id} />	
    </div>	
  );	
}	
export default ProductDetails;