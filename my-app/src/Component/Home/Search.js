import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../const";
import { ProductContext } from "../../Context/ProductContext";

function Search() {
  const [result, setResult] = useState();

  const [showFilter, setShowFilter] = useState(false);
  const { loading, setLoading } = useContext(ProductContext);

  const params = useParams();

  useEffect(() => {
    const searchApi = (keyword) => {
      fetch(`${API_URL}/products?q=${keyword}`)
        .then((response) => response.json())
        .then((dataRes) => {
          if (typeof dataRes === "object") {
            setResult(dataRes);
            setLoading(false);
          }
        })
        .catch((error) => console.log("error", error));
    };

    setLoading(true);

    searchApi(params.keyword);
  }, [params.keyword]);

  const sortDesc = (array) => {
    const resultArray = array.sort((a, b) => {
      return a.price - b.price;
    });

    // từ bé đến lớn, tứ tự tăng dần

    setResult([...resultArray]);
  };

  const sortAsc = (array) => {
    const resultArray = array.sort((a, b) => {
      return b.price - a.price;
    });

    // từ lớn đến bé, thứ tự tăng dần
    setResult([...resultArray]);
  };

  let renderViewSearch;

  if (loading) {
    renderViewSearch = (
      <>
        <div className="loading-products">
          <div className="loader"></div>
        </div>
      </>
    );
  } else {
    renderViewSearch =
      result &&
      result.map((item) => (
        <div key={item.id} className="product">
          <>
            <Link to={`/product/${item.id}`}>
              <img src={item.image} alt={item.name} />
            </Link>
            <div className="wrapProduct">
              <Link className="product-name-link" to={`/product/${item.id}`}>
                <h2 className="product-name">{item.name}</h2>
              </Link>
              <p className="product-price">${item.price}</p>
            </div>
            <Link to={`/product/${item.id}`} className="view-details">
              View Details
            </Link>
          </>
        </div>
      ));
  }

  return (
    <>
      <div className="search-top">
        <h1 className="search-title-1">Kết quả tìm kiếm</h1>
        <div class="wraper">
          <div className="filter" onClick={() => setShowFilter(!showFilter)}>
            Sắp xếp <i className="fas fa-chevron-left"></i>
          </div>
          <div className="filter-list">
            <ul
              className="filter-item"
              style={{ display: showFilter ? "block" : "none" }}
            >
              <li
                onClick={() => {
                  sortDesc(result);
                  setShowFilter(false);
                }}
                className="filter-item-1"
              >
                Giá từ thấp đến cao
              </li>
              <li
                onClick={() => {
                  sortAsc(result);
                  setShowFilter(false);
                }}
                className="filter-item-1"
              >
                Giá từ cao xuống thấp
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        style={{
          display: loading || (result && result.length === 0) ? "flex" : "grid",
          height: result && result.length === 0 ? "calc(100vh - 186px)" : null,
        }}
        className="products"
      >
        {result && result.length === 0 ? (
          <h1 className="search-title">Không tìm thấy sản phẩm</h1>
        ) : (
          renderViewSearch
        )}
      </div>
    </>
  );
}

export default Search;
