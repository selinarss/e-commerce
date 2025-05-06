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

  const addFavorites = (product) => {
    setFavorites((prev) => [...prev, product]);
  };

  const removeFromFavorites = (productID) => {
    setFavorites((prev) => prev.filter((product) => product.id !== productID));
  };

  const isFavorite = (productID) => {
    return favorites.some((product) => product.id === productID);
  };

  const increment = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, count: (product.count || 0) + 1 }
          : product
      )
    );
  };

  const decrement = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.count > 0
          ? { ...product, count: product.count - 1 }
          : product
      )
    );
  };

  const inCard = (productID) => {
    return addToCart.some((product) => product.id === productID);
  };

  const handleAddToCart = (product) => {
    if ((product.count || 0) === 0) {
      console.log("Adet 0, sepete eklenmedi.");
      return;
    }

    setaddToCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + product.count }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: product.count || 1 }];
      }
    });
  };

  const removeFromCart = (productID) => {
    setaddToCart((prev) =>
      prev.filter((item) => item.product.id !== productID)
    );
    console.log(`Ürün silindi, ID: ${productID}`); // İşlem bildirimi
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
        handleAddToCart,
        inCard,
        removeFromCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
