// src/pages/ShoppingCard.jsx
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Cart from "../components/Cart";
import Total from "../components/Total";

export const ShoppingCart = () => {
  const { addToCart } = useContext(GlobalContext);

  return (
    <div>
      <h2>Sepetim</h2>
      {addToCart.length === 0 ? (
        <div className="favorites-empty">
          <h2>Sepet listen boş</h2>
          <p>Henüz hiçbir ürün eklenmedi.</p>
        </div>
      ) : (
        <>
          {addToCart.map((item) => (
            <div key={item.product.id}>
              <Cart product={item.product} />
            </div>
          ))}
          <Total />
        </>
      )}
    </div>
  );
};
