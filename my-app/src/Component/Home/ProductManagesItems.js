import React from "react";
import { Link } from "react-router-dom";

function ProductManagesItems({ index, data, deleteFunc }) {
  return (
    <>
      <div className="product-manages-item">
        <p className="product-manages-id">{index}</p>
        <p className="product-manages-name">{data.name}</p>
        <p className="product-manages-img">
          <img src={data.image} alt={data.name} />
        </p>
        <p className="product-manages-price">{data.price}</p>
        <div className="review-action">
          <Link to={`/admin/products/edit/${data.id}`}>
            <div className="review-edit">
              <i class="fas fa-pen"></i>
            </div>
          </Link>
          <div className="review-delete" onClick={() => deleteFunc(data.id)}>
            <i class="fas fa-trash"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductManagesItems;
