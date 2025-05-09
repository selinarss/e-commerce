import { useEffect, useContext } from "react";
import "./ProductList.css";
import ProductItem from "./ProductItem";
import { GlobalContext } from "../context/GlobalContext";

export default function ProductList() {
  const { products, setProducts, setCounts, searchValue } =
    useContext(GlobalContext);
  useEffect(() => {
    fetch("https://dummyjson.com/products") //api çağrısı - promise
      .then((res) => res.json()) //gelen veri json döner.
      .then((data) => {
        console.log("API'den gelen veri:", data);
        if (Array.isArray(data.products)) {
          setProducts(data.products); //veri state içine kaydedilir.
          setCounts(new Array(data.products.length).fill(0));
          //başlangıç değerinin Nan ya da undefined olmaması için product listesinin uzunluğu kadar "0" eklenir.
        } else {
          console.error("API'den gelen ürünler dizi değil:", data.products);
        }
      })
      .catch((error) => console.error("Veri çekme hatasi:", error));
  }, []); //dependency injection = empty || ilk çalıştığında ekrana gelir.
  // amaç : api'yi ekrana getirmek.
  // useEffect sayfa açılınca bir kez çalışmasını sağlar.

  console.log("ProductList çalıştı!");

  return (
    <div className="product-container">
      <ul className="product-ul">
        {products.length > 0 ? (
          products
            .filter((item) =>
              searchValue.trim() === "" //başındaki ve sonundaki boşlukları siler.
                ? true //arama boşsa ürün listesinin tamamını döner
                : item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <div key={item.id}>
                <ProductItem product={item} />
              </div>
            ))
        ) : (
          <p>Ürünler yükleniyor...</p>
        )}
      </ul>
    </div>
  );
}
/*  {movies.map(
            (movie) =>
              movie.title
                .toLowerCase()
                .startsWith(searchValue.toLowerCase()) && (
                <MovieCard movie={movie} key={movie.id}></MovieCard>
              )
          )} */
