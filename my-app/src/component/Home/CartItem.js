import React, { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";

function CartItem({ data, index }) {
  const { deleteToCart } = useContext(ProductContext);

  return (
    <>
      <div className="cart-item">
        <p className="cart-id">{index}</p>
        <p className="cart-name">{data.name}</p>
        <img
          onClick={() => deleteToCart(data.id)}
          src={data.image}
          alt="product img"
          className="cart-img"
        />
        <p className="cart-price">{data.price}k VND</p>
        <div className="soluong">{data.quanlity}</div>
        <button
          className="delete-to-card"
          onClick={() => deleteToCart(data.id)}
        >
          Xóa
        </button>
      </div>
    </>
  );
}

export default CartItem;
