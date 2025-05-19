import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";
import ProductItem from "./ProductItem";

export const Pagination = () => {
  const [items, setItems] = useState([]); //bütün ürünler
  const [totalItems, setTotalItems] = useState(0); //bütün ürün sayısı
  const [currentPage, setCurrentPage] = useState(0); //sayfa numarası
  const itemsPerPage = 32; //sayfa başına ürün sayısı
  console.log("a", items);
  console.log("b", totalItems);
  console.log("c", currentPage);

  useEffect(() => {
    const getItems = async () => {
      try {
        // Önce toplam ürün sayısını alalım
        const totalResponse = await fetch("https://dummyjson.com/products");
        const totalData = await totalResponse.json();
        setTotalItems(totalData.total);
        console.log("d", totalData.total);
        // Sonra mevcut sayfa için ürünleri alalım.
        const response = await fetch(
          `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
            currentPage * itemsPerPage //32 - 64 - 96 - 128 - 160 - 192 - 194
          }`
        );
        console.log("e", currentPage * itemsPerPage);

        const data = await response.json();
        setItems(data.products);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };
    getItems();
  }, [currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  /*
<div className="product-list">
        {items.map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </div>
  */

  return (
    <>
      <div className="product-list">
        {items.map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={"← Önceki"}
        nextLabel={"Sonraki →"}
        breakLabel={"..."}
        pageCount={Math.ceil(totalItems / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
        disabledClassName={"disabled"}
        forcePage={currentPage}
      />
    </>
  );
};
