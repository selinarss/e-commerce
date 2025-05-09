import React from "react";
import Slider from "react-slick";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import "./ProductItem.css";
import "swiper/css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Font Awesome ikonları ekleniyor
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

export default function ProductItem({ product }) {
  const {
    removeFromFavorites,
    addFavorites,
    isFavorite,
    increment,
    decrement,
    handleAddToCart,
  } = useContext(GlobalContext);

  const favorite = isFavorite(product.id);

  function onFavoriteClick(movieID) {
    console.log("clicked", movieID);
    if (favorite) removeFromFavorites(product.id);
    else addFavorites(product);
  }

  return (
    <li className="product-body">
      <button
        onClick={onFavoriteClick}
        className={`heart-icon ${favorite ? "active" : ""}`}
      >
        <FontAwesomeIcon icon={favorite ? solidHeart : regularHeart} />
      </button>

      <img
        className="product-img"
        src={product.thumbnail}
        alt={product.title}
      />

      <div className="düzelt">
        <p className="product-title">{product.title}</p>

        {/* Yıldız derecelendirmesi kısmı */}
        <div className="product-stars">
          {[0, 1, 2, 3, 4].map((_, index) => {
            //
            return (
              <span
                key={index}
                className={
                  index < product.rating ? "fa fa-star checked" : "fa fa-star"
                }
              ></span>
            );
          })}
          <span className="rating-text">{product.rating}</span>
        </div>
        <p className="product-price">{product.price + " $"}</p>
        <br></br>
        <div className="product-button-div">
          <button
            onClick={() => handleAddToCart(product)}
            //asenkron olduğu için değerdeki değişiklik direkt olarak yansmıyor, bu yüzden doğrudan değer olarak verdim.
            className="product-basket"
          >
            Sepete Ekle
          </button>

          <div className="amountDiv">
            <div className="a">
              <button onClick={() => decrement(product.id)}>-</button> {/*  */}
              <span>{product.count || 0} </span>
              <button onClick={() => increment(product.id)}>+</button>
              {/* onClick={() => increment(product.id)} */}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
