import { useEffect, useContext, useState } from "react";
import "./ProductList.css";
import ProductItem from "./ProductItem";
import { GlobalContext } from "../context/GlobalContext";
import ReactPaginate from "react-paginate";
import { Pagination } from "./Pagination";

export default function ProductList() {
  const { data, products, filterData, showResults, setItems, items } = useContext(GlobalContext);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 32;

  // Tüm ürünleri yükle
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=200")
      .then((res) => res.json())
      .then((data) => {
        // Mevcut ürün miktarlarını koru
        const updatedProducts = data.products.map((newProduct) => {
          const existingProduct = items.find((item) => item.id === newProduct.id);
          return existingProduct ? { ...newProduct, count: existingProduct.count || 0 } : { ...newProduct, count: 0 };
        });
        setItems(updatedProducts);
      });
  }, []); // Sadece component mount olduğunda çalışsın

  // Sayfa ürünlerini yükle.
  useEffect(() => {
    // Toplam ürün sayısını al
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((totalData) => {
        setTotalItems(totalData.total);
        // Sayfa ürünlerini al
        fetch(`https://dummyjson.com/products?limit=${itemsPerPage}&skip=${currentPage * itemsPerPage}`)
          .then((res) => res.json())
          .then((data) => {
            // Mevcut ürün miktarlarını koru
            const updatedProducts = data.products.map((newProduct) => {
              const existingProduct = items.find((item) => item.id === newProduct.id);
              return existingProduct ? { ...newProduct, count: existingProduct.count || 0 } : { ...newProduct, count: 0 };
            });
            setItems(updatedProducts);
          });
      });
  }, [currentPage]); // Sadece sayfa değiştiğinde çalışsın

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Arama butonuna tıklandıysa filtreleme sonuçlarını, tıklanmadıysa normal sayfa ürünlerini göster.
  const displayProducts = showResults && filterData.length > 0 ? filterData : items;

  return (
    <div className="product-container">
      <ul className="product-grid">
        {displayProducts.length > 0 ? (
          displayProducts.map((item) => (
            <div key={item.id}>
              <ProductItem product={item} />
            </div>
          ))
        ) : (
          <p>Ürün bulunamadı.</p>
        )}
      </ul>
      {/* Sadece arama yapılmadığında veya arama sonucu boşsa pagination göster */}
      {(!showResults || filterData.length === 0) && (
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
      )}
    </div>
  );
}
