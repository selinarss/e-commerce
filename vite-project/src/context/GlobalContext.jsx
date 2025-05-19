import { createContext, useEffect, useState } from "react";

// GlobalContext'i oluşturuyoruz
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [counts, setCounts] = useState([]);
  const [countsObject, setCountsObject] = useState({});
  const [addToCart, setaddToCart] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [items, setItems] = useState([]); //bütün ürünler
  const [filterData, setFilterData] = useState([]);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  //amount'u addToCart içinde tut, countsObjectehiç gerek yok!
  //Bu context sayesinde başka bileşenler, bu dosyada tanımlanan global verilere ulaşabilir.
  //ilk olarak local strogeden veri çektik!
  useEffect(() => {
    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Ürünleri API'den yükle

  const addFavorites = (product) => {
    setFavorites((prev) => [...prev, product]);
  };

  const removeFromFavorites = (productID) => {
    setFavorites((prev) => prev.filter((product) => product.id !== productID));
  };

  const isFavorite = (productID) => {
    return favorites.some((product) => product.id === productID);
  };
  //items state'i: Anasayfada görüntülenen tüm ürünlerin listesi.
  //Her ürünün count adlı bir sayacı vardır
  const increment = (id) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, count: (item.count || 0) + 1 } : item)));
  }; //Henüz sepete eklenmemiş ürünler içindir. count

  const decrement = (id) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id && item.count > 0 ? { ...item, count: item.count - 1 } : item)));
  };

  // Sepetteki ürünün miktarını artırma fonksiyonu (sepet için ayrı)
  //Bu fonksiyon, sepetteki ürünlerin quantity (adet) değerini 1 azaltır.
  const cartIncrement = (id) => {
    setaddToCart(
      (prevCart) => prevCart.map((item) => (item.product.id === id ? { ...item, quantity: item.quantity + 1 } : item)) //quantity = sepetteki ürünün kaç adet olduğunu temsil eder.
    );
  };

  // Sepetteki ürünün miktarını azaltma fonksiyonu (sepet için ayrı)
  const cartDecrement = (id) => {
    setaddToCart((prevCart) =>
      prevCart.map((item) => (item.product.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
    );
  };

  const handleAddToCart = (product) => {
    const currentCount = product.count || 0;
    if (currentCount === 0) {
      console.log("Adet 0, sepete eklenmedi.");
      return;
    }

    setaddToCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + currentCount
              }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: currentCount }];
      }
    });

    console.log(`Ürün sepete eklendi, ID: ${product.id}, Adet: ${currentCount}`);
  };

  const removeFromCart = (productID) => {
    setaddToCart((prev) => prev.filter((item) => item.product.id !== productID));
    console.log(`Ürün silindi, ID: ${productID}`);
  };

  // Güncellenmiş sepetteki ürünleri her değişiklikte görebilmek için
  //bunu ekleyince sildiklerimi görebildim!
  useEffect(() => {
    console.log("Güncellenmiş sepetteki ürünler:", addToCart);
  }, [addToCart]);

  return (
    <GlobalContext.Provider
      value={{
        products,
        setProducts,
        counts,
        setCounts,
        countsObject,
        setCountsObject,
        addToCart,
        setaddToCart,
        searchValue,
        setSearchValue,
        addFavorites,
        removeFromFavorites,
        isFavorite,
        favorites,
        increment,
        decrement,
        cartIncrement,
        cartDecrement,
        handleAddToCart,
        removeFromCart,
        items,
        setItems,
        filterData,
        setFilterData,
        data,
        setData,
        searchInput,
        setSearchInput,
        showResults,
        setShowResults,
        currentCategories,
        setCurrentCategories,
        activeCategory,
        setActiveCategory
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
