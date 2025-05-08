import { useLocation, useNavigate } from "react-router-dom";
import "./Categories.css";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Categories = () => {
  const { products, setProducts } = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate(); //sayfa yönlendirme

  const handleCategoryClick = (catId) => {
    navigate(`/category/${catId}`);
  };

  // Eğer sepet sayfasındaysak Categories bileşenini gösterme
  if (location.pathname === "/card") {
    return null;
  }
  if (location.pathname === "/user") {
    return null;
  }

  return (
    <div className="categories-container">
      <ul>
        <li onClick={() => handleCategoryClick("beauty")}>Güzellik</li>
        <li onClick={() => handleCategoryClick("fragrances")}>Parfümler</li>
        <li onClick={() => handleCategoryClick("furniture")}>Mobilya</li>
        <li onClick={() => handleCategoryClick("groceries")}>Market Ürünleri</li>
      </ul>
    </div>
  );
};
/*
beauty
fragrances
furniture
groceries
*/
export default Categories;
