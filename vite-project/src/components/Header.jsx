import "./Header.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useContext, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const inputRef = useRef(); // input elementine erişim için referans
  const {
    setData, //API'den gelen verileri kaydeder.
    setFilterData, //	Ekranda gösterilecek verileri tutar (filtrelenmiş).
    data, //	Daha önce alınmış tüm ürünleri içerir.
    searchInput, //Input kutusundaki metni temsil eder.
    setSearchInput, //Input değiştiğinde günceller.
    setShowResults, //	Arama sonuçlarının görünüp görünmeyeceğini kontrol eder.
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  // API çağrısı: arama input değeri değiştikçe API'dan sonuç getir
  // useEffect'i tamamen kaldırıyoruz. yoksa 2 kee fetchler

  const handleSearchSubmit = async (e) => {
    e.preventDefault(); //Sayfanın yenilenmesini önler

    if (searchInput.trim() === "") {
      setFilterData(data); // Boşsa eski tüm verileri göster
      setShowResults(false);
      return;
    }

    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchInput}` //searchınput ile apiye istek
      );
      const result = await response.json();
      setData(result.products); // API’den gelen ürünleri kaydet
      setFilterData(result.products); // Bu ürünleri filtreli liste olarak göster
      setShowResults(true); // Sonuçları göster
    } catch (error) {
      console.error("Arama hatası:", error);
    }
  };

  // Reset butonuna basıldığında çalışan fonksiyon
  const handleReset = () => {
    setSearchInput(""); // Arama input'unu temizle
    setShowResults(false); // Sonuçları gösterme
    if (inputRef.current) {
      inputRef.current.value = ""; // input elemanının değerini sıfırla
    }
  };

  // Anasayfaya dönmek için fonksiyon
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
      <form
        onSubmit={handleSearchSubmit}
        onReset={handleReset}
        className="search-container"
      >
        {/* Ref atıyoruz */}
        <input
          ref={inputRef} // useRef ile input referansı
          type="text"
          placeholder="Aradığınız ürün, kategori veya markayı yazınız."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button type="submit" className="search-button">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
        </button>

        <button type="reset" className="reset-button">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </form>

      {/* Diğer içerikler */}
      <div className="login-basketDiv">
        <div className="cart-shopping-div">
          <NavLink to="/user" className="nav-link">
            <i className="fa-regular fa-user"></i> User
          </NavLink>
        </div>
        <div className="cart-shopping-div">
          <NavLink to="/favorites" className="nav-link">
            <i className="fa-regular fa-heart"></i> Favoriler
          </NavLink>
        </div>
        <div className="cart-shopping-div">
          <NavLink to="/card" className="nav-link">
            <i className="fa-solid fa-cart-shopping"></i> Sepetim
            <span>{totalItemCount}</span>
          </NavLink>
        </div>
        <div className="totalDiv">
          <span className="span">Total: {totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
