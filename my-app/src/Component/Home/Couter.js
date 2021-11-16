import React, { useContext, useEffect } from "react";
import { ProductContext } from "../../Context/ProductContext";

function Couter() {
  const { couter, setCouter } = useContext(ProductContext);

  useEffect(() => {
    return () => setCouter(1);
  }, []);

  return (
    <>
      <div className="couter">
        <div
          className="coutet-prew"
          onClick={() => {
            if (couter <= 1) {
              return setCouter(1);
            } else {
              return setCouter(couter - 1);
            }
          }}
        >
          <i className="fas fa-minus"></i>
        </div>
        <div className="coutet-number">{couter}</div>
        <div className="coutet-next" onClick={() => setCouter(couter + 1)}>
          <i className="fas fa-plus"></i>
        </div>
      </div>
    </>
  );
}

export default Couter;
