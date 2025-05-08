import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import "./Total.css";

const Total = () => {
  const { addToCart } = useContext(GlobalContext);
  let kargoPrice = 44.99;

  const totalItemCount = addToCart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = addToCart.reduce(
    (total, item) => total + item.quantity * parseFloat(item.product.price),
    0
  );

  return (
    <div className="shopping-div">
      <h2>Sipariş Özeti</h2>
      <p>
        Toplam ürün adedi: <span>{totalItemCount}</span>
      </p>
      <p>
        Ürünün Toplamı: <span>{totalPrice.toFixed(2)} $</span>
      </p>
      <p>
        Kargo Toplam: <span>{kargoPrice} $</span>
      </p>
      <hr />
      <p style={{ fontSize: "20px" }}>
        Toplam:
        <span style={{ color: "orange", fontWeight: "bold" }}>
          {(kargoPrice + totalPrice).toFixed(2)}
        </span>
      </p>
      <button className="order-button">Sipariş Ver</button>
    </div>
  );
};

export default Total;
