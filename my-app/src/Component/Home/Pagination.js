import React from "react";

function Pagination({ page, totalPage, setPage }) {
  const loopPage = (totalPage) => {
    let divElement = [];
    for (let i = 1; i <= totalPage; i++) {
      divElement.push(i);
    }

    return divElement;
  };

  const renderPage = loopPage(totalPage);

  return (
    <div className="page-wrap">
      <div className="pagination">
        <button
          className="first-page"
          onClick={() => {
            setPage(1);
          }}
        >
          First
        </button>
        <button
          style={{
            backgroundColor: page <= 1 ? "grey" : "#04aa6d",
            cursor: page <= 1 ? "not-allowed" : "pointer",
          }}
          className="prev-page"
          onClick={() => {
            if (page <= 1) {
              return null;
            } else {
              return setPage(page - 1);
            }
          }}
        >
          Prev
        </button>

        {renderPage.map((item) => (
          <div
            style={{
              backgroundColor: page === item ? "#3498db" : "#fff",
              color: page === item ? "#fff" : "#333",
            }}
            key={item}
            onClick={() => {
              setPage(item);
            }}
            className="page"
          >
            {item}
          </div>
        ))}
        <button
          style={{
            backgroundColor: page === totalPage ? "grey" : "#04aa6d",
            cursor: page === totalPage ? "not-allowed" : "pointer",
          }}
          className="next-page"
          onClick={() => {
            if (page >= totalPage) {
              return null;
            } else {
              return setPage(page + 1);
            }
          }}
        >
          Next
        </button>
        <button
          className="end-page"
          onClick={() => {
            setPage(totalPage);
          }}
        >
          End
        </button>
      </div>
    </div>
  );
}

export default Pagination;
