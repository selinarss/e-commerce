import "./Header.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const { setSearchValue, searchValue } = useContext(GlobalContext);

  const handleSearch = (e) => {
    e.preventDefault(); // ← Sayfa yenilenmesini engeller.
    setSearchValue("");
  };

  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/");
  }

  const { addToCart } = useContext(GlobalContext);

  const totalItemCount = addToCart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = addToCart.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  );

  return (
    <div className="HeaderTopDiv">
      <h1 onClick={navigateHandler}>Shopping House</h1>
      <form onSubmit={handleSearch} className="search-container">
        <input
          type="text"
          placeholder="Aradığınız ürün, kategori veya markayı yazınız."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <button type="submit" className="search-button">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </button>
      </form>

      <div className="login-basketDiv">
        <div className="cart-shopping-div">
          <NavLink to="/user" className="nav-link">
            <i className="fa-regular fa-user"></i>
            User
          </NavLink>
        </div>

        <div className="cart-shopping-div">
          <NavLink to="/favorites" className="nav-link">
            <i className="fa-regular fa-heart"></i>
            Favoriler
          </NavLink>
        </div>

        <div className="cart-shopping-div">
          <NavLink to="/card" className="nav-link">
            <i className="fa-solid fa-cart-shopping"></i>
            Sepetim
            <span>{totalItemCount}</span>
          </NavLink>
        </div>
        <div className="totalDiv">
          <span className="span">Total: {totalPrice.toFixed(2)}</span>
          {/*Sayıyı virgülden sonra 2 basamak olacak şekilde yuvarlar. */}
        </div>
      </div>
    </div>
  );
};
