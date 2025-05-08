import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ProductItem from "../components/ProductItem";

const CategoryPage = () => {
  const { catId } = useParams();// URL'den "beauty" değerini alır
  const { products } = useContext(GlobalContext);
  console.log("bak",products);

  // Kategoriye göre ürünleri filtrele
  const categoryProducts = products.filter(item => item.category === catId);

  return (
    <div className="category-products">
      {categoryProducts.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CategoryPage;