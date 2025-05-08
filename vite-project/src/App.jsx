import "./App.css";
import ProductList from "./components/ProductList.jsx";
import ProductItem from "./components/ProductItem.jsx";
import { Header } from "./components/Header.jsx";
import { GlobalContext } from "./context/GlobalContext.jsx";
import { GlobalProvider } from "./context/GlobalContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./pages/RootLayout";
import { User } from "./pages/User.jsx"; // User'ı doğru bir şekilde import ediyoruz
import { Favorites } from "./pages/Favorites.jsx";
import { ShoppingCart } from "./pages/ShoppingCart.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import CategoryPage  from "./pages/CategoryPage.jsx";

function App() {
  // const [totalObject, setTotalObject] = useState({});

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "/user", element: <User /> },
        { path: "/favorites", element: <Favorites /> },
        { path: "/card", element: <ShoppingCart /> },
        { path: "/category/:catId", element: <CategoryPage /> },
      ],
    },
  ]);

  return (
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  );
}

export default App;
