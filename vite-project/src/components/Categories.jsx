import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Categories.css";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

const Categories = () => {
  const { setCurrentCategories } = useContext(GlobalContext);
  const location = useLocation();
  const navigate = useNavigate(); //sayfa yönlendirme

  const categories = [
    { name: "beauty", label: "Güzellik" },
    { name: "fragrances", label: "Parfümler" },
    { name: "furniture", label: "Mobilya" },
    { name: "groceries", label: "Market Ürünleri" },
    { name: "home-decoration", label: "Ev Dekorasyonu" },
    { name: "kitchen-accessories", label: "Mutfak Aksesuarları" },
    { name: "laptops", label: "Dizüstü Bilgisayarlar" },
    { name: "mens-shirts", label: "Erkek Gömlekleri" },
    { name: "mens-shoes", label: "Erkek Ayakkabıları" },
    { name: "mens-watches", label: "Erkek Saatleri" },
    { name: "mobile-accessories", label: "Mobil Aksesuarlar" },
    { name: "motorcycle", label: "Motosiklet" },
    { name: "skin-care", label: "Cilt Bakımı" },
    { name: "smartphones", label: "Akıllı Telefonlar" },
    { name: "sports-accessories", label: "Spor Aksesuarları" },
    { name: "sunglasses", label: "Güneş Gözlükleri" },
    { name: "tablets", label: "Tabletler" },
    { name: "tops", label: "Üst Giyim" },
    { name: "vehicle", label: "Araç" },
    { name: "womens-bags", label: "Kadın Çantaları" },
    { name: "womens-dresses", label: "Kadın Elbiseleri" },
    { name: "womens-jewellery", label: "Kadın Takıları" },
    { name: "womens-shoes", label: "Kadın Ayakkabıları" },
    { name: "womens-watches", label: "Kadın Saatleri" },
  ];

  const handleCategoryClick = async (catName) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${catName}`
      );
      const data = await response.json();
      setCurrentCategories(data.products);
      console.log("real data", data.products);
    } catch (error) {
      console.error("Arama hatası:", error);
    }
    navigate(`/product/category/${catName}`);
  };

  // Eğer sepet sayfasındaysak Categories bileşenini gösterme
  if (location.pathname === "/card") {
    return null;
  }
  if (location.pathname === "/user") {
    return null;
  }

  return (
    <>
      <div className="categories-container">
        <ul>
          {categories.map((category) => (
            <li
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.label}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Categories;
