// src/pages/User.jsx
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ProductItem from "../components/ProductItem"; // Bileşeni doğru şekilde import et
import "./Favorites.css";

export const Favorites = () => {
  const { favorites } = useContext(GlobalContext);
  console.log("Favorites dizisi:", favorites); // Favoriler dizisini kontrol et

  return (
    <div className="favorites-grid">
      <h2>Favorilerim</h2>
      {favorites && favorites.length > 0 ? (
        <div className="movies-grid">
          {favorites.map((item) => (
            <div key={item.id}>
              <ProductItem product={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="favorites-empty">
          <h2>Favoriler listen boş</h2>
          <p>
            Favori ürünlerini buradan görebilirsin. Henüz hiçbir ürün eklenmedi.
          </p>
        </div>
      )}
    </div>
  );
};
