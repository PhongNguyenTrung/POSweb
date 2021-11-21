import React, { useContext, useEffect, useState } from "react";
import Pagination from "./Pagination";
import ProductItem from "./ProductItem";
import { API_URL } from "../../const";
import { ProductContext } from "../../Context/ProductContext";
import { Menu, Button, Card,  Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons'

function Product() { 
  const [products, setProducts] = useState([]);
  const [checkAll, setCheckAll] = useState(true);

  const [mainDishes, setMainDishes] = useState([]);
  const [checkMD, setCheckMD] = useState(false);

  const [desserts, setDesserts] = useState([]);
  const [checkDesserts, setCheckDesserts] = useState(false);

  const [drinks, setdrinks] = useState([]);
  const [checkDrinks, setCheckDrinks] = useState(false);

  const [filter, setFilter] = useState('Lọc món ăn');

  const [page, setPage] = useState(1);
  // const [totalPage, setTotalPage] = useState();
  const { loading, setLoading } = useContext(ProductContext);

  const filterAll = () => {
    setCheckAll(true)
    setCheckMD(false)
    setCheckDesserts(false)
    setCheckDrinks(false)
    setFilter('Tất cả món ăn')
  };

  const filterMainDish = () => {
    setCheckAll(false)
    setCheckMD(true)
    setCheckDesserts(false)
    setCheckDrinks(false)
    const mainD = products.filter(product => product.id <= 5)
    setMainDishes([...mainD])
    setFilter('Món ăn chính')
  };

  const filterDessert = () => {
    setCheckAll(false)
    setCheckMD(false)
    setCheckDesserts(true)
    setCheckDrinks(false)
    const de = products.filter(product => product.id > 5 && product.id <= 10)
    setDesserts([...de])
    setFilter('Món ăn tráng miệng')
  };

  const filterDrink = () => {
    setCheckAll(false)
    setCheckMD(false)
    setCheckDesserts(false)
    setCheckDrinks(true)
    const dr = products.filter(product => product.id > 10)
    setdrinks([...dr])
    setFilter('Đồ uống')
  };

  useEffect(() => {
    const getProductsPage = () => {
      fetch(`${API_URL}/products/?_page=${page}&_limit=50`)
        .then((res) => {
          // setTotalPage(Math.ceil(res.headers.get("X-Total-Count") / 5));
          return res.json();
        })
        .then((products) => {
          setProducts(products);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    setLoading(true);

    getProductsPage();
  }, [page]);

  const menu = (
    <Menu>
      <Menu.Item type="text" 
              onClick={() => filterAll()
            }>
              Tất cả món ăn
            </Menu.Item>

            <Menu.Item type="text" 
              onClick={() => filterMainDish()
            }>
              Món ăn chính
            </Menu.Item>

            <Menu.Item type="text" 
              onClick={() => filterDessert()
            }>
              Món ăn tráng miệng
            </Menu.Item>

            <Menu.Item type="text" 
              onClick={() => filterDrink()
            }>
              Đồ uống
            </Menu.Item>
    </Menu>
  );
  return (
    <>
      {loading ? (
        <>
          <div className="loading-products">
            <div class="loader"></div>
          </div>
        </>
      ) : (
        <>
          <h1 className="product-title">Trang chủ</h1>
    
          <div  style={{width: "210px", marginBottom: "-5vh"}}>
            <Dropdown overlay={menu} placement="bottomCenter">
              <Button size="large"> {filter} <DownOutlined /></Button>
            </Dropdown>
          </div>

          <div className="products">
            {products && checkAll &&
              products.map((item) => 
                <ProductItem key={item.id} data={item} />  
            )}

            {mainDishes && checkMD &&
              mainDishes.map((item) => 
                <ProductItem key={item.id} data={item} />
            )}

            {desserts && checkDesserts &&
              desserts.map((item) => 
                <ProductItem key={item.id} data={item} />
            )}

            {drinks && checkDrinks &&
              drinks.map((item) => 
                <ProductItem key={item.id} data={item} />
            )}

            

            
          </div>
        </>
      )}
      {/* <Pagination totalPage={totalPage} page={page} setPage={setPage} /> */}
    </>
  );
}

export default Product;
