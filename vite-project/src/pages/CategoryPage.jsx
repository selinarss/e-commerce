import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import ProductItem from "../components/ProductItem";
import Categories from "../components/Categories";

const CategoryPage = () => {
  // Eğer kategori adı URL'den alınacaksa, aşağıdaki gibi olabilir:
  // Örneğin, URL /products/category/beauty ise, catId = "beauty"
  const { currentCategories } = useContext(GlobalContext);

  return (
    <div className="category-page-container">
      <div className="products-grid">
        {currentCategories.length > 0 ? (
          currentCategories.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          <p>Bu kategoride ürün bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
