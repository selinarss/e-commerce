import "./Cart.css";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Total from "./Total";

const Cart = ({ product, quantity }) => {
  const { cartIncrement, cartDecrement, removeFromCart } =
    useContext(GlobalContext);
  //const cart = inCard(product.id);
  console.log("Sepetteki total ürün miktari", quantity);

  return (
    <>
      <div className="cartContainer">
        <div className="mainDiv">
          <div className="cartItem">
            <div className="imageDiv">
              <img
                className="image"
                src={product.thumbnail}
                alt={product.title}
              />
            </div>

            <div className="productDetails">
              <h1>{product.title}</h1>
              <span>{product.description}</span>

              <div className="amountTrashDiv">
                <div className="amountDiv">
                  <div className="b">
                    <button onClick={() => cartDecrement(product.id)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => cartIncrement(product.id)}>+</button>
                    <div className="icon-buttonDiv">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="trash-icon"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
{
  /*className="orderTotalDiv" */
}
export default Cart;
