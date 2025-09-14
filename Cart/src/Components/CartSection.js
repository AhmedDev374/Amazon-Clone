import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Navbar from "./Navbar";
import Footer from "./Footer";
import LowerNav from "./LowerNav";

import { AddToList, RemoveList } from "../action/List";
import { IncreaseQuantity, DecreaseQuantity, RemoveCart } from "../action/Cart";

import save from "../imgs/save.png";
import saved from "../imgs/saved.png";
import Delete from "../imgs/delete.png";
import Empty from "../imgs/cart-empty.png";

import "./cart.css";

function CartSection() {
  const CartItems = useSelector((state) => state.CartItemsAdded.CartItems);
  const ListItems = useSelector((state) => state.ItemsAdded.ListItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [AddedIds, setAddedIds] = useState([]);
  const [promocode, setPromocode] = useState("");
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);
  const [total, setTotal] = useState(0);

  document.title = "Cart Section";

  const subtotal = CartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = isCodeCorrect ? subtotal * 0.2 : 0;
  const tax = subtotal * 0.05;
  const finalTotal = (subtotal + tax - discount).toFixed(2);

  useEffect(() => {
    // 🔒 Protect Cart Section → redirect if not signed in
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "http://localhost/auth";
      }
    });
    return () => unsubscribe();
  }, []);


  useEffect(() => {
    setAddedIds(ListItems.map((item) => item.id));
  }, [ListItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePromocode = () => {
    const code = promocode.trim();
    if (code === "AhmedDev374") {
      setIsCodeCorrect(true);
      setTotal(finalTotal);
    } else {
      setIsCodeCorrect(false);
      setTotal((subtotal + tax).toFixed(2));
    }
  };

  const isAdded = (itemId) => AddedIds.includes(itemId);

  return (
    <>
      <Navbar />

      <div className="entire-section">
        <p className={CartItems.length ? "cart-head animate" : "cart-head"}>
          Your Cart
        </p>

        <div className={CartItems.length ? "cart-section animate" : "cart-section"} style={{ height: CartItems.length ? "100%" : "40vh" }}>
          <div className="cart-details">
            {CartItems.length === 0 && (
              <div className="empty-cart">
                <img src={Empty} alt="Empty Cart" className="empty-cart-img" />
              </div>
            )}

            {CartItems.map((item) => (
              <div className="cart-data" key={item.id}>
                <img
                  onClick={() => navigate(`/product/${item.id}`)}
                  src={item.image}
                  alt={item.title}
                  className="cart-item-img"
                />
                <div className="cart-all-data">
                  <p className="cart-title">{item.title}</p>
                  <div className="cart-price">
                    <p className="cart-discount">${(item.price * item.quantity).toFixed(2)}</p>
                    {(item.category === "men's clothing" || item.category === "women's clothing") && (
                      <p className="cart-size">Size: {item.size || "Not chosen"}</p>
                    )}
                  </div>

                  <div className="more-buttons">
                    <div className="quantity-section">
                      <button onClick={() => dispatch(IncreaseQuantity(item.id))}>+</button>
                      <p className="total-items">{item.quantity}</p>
                      <button
                        onClick={() => dispatch(DecreaseQuantity(item.id))}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                    </div>

                    <div className="right-btns">
                      <div className="save-btn">
                        <img
                          onClick={() =>
                            isAdded(item.id) ? dispatch(RemoveList(item.id)) : dispatch(AddToList(item))
                          }
                          src={isAdded(item.id) ? saved : save}
                          className="save-img"
                        />
                        <p>Save</p>
                      </div>

                      <div className="delete-btn">
                        <img
                          onClick={() => dispatch(RemoveCart(item.id))}
                          src={Delete}
                          className="delete-img"
                        />
                        <p>Delete</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {CartItems.length > 0 && (
            <div className="checkout-section">
              <div className="congrats">
                <p>
                  Congrats! You're eligible for <b>Free Delivery</b>.
                  <br />
                  Use code <b>AhmedDev374</b> for 20% discount.
                </p>
              </div>

              <hr className="horizontal" />

              <div className="promocode">
                <input
                  type="text"
                  placeholder="Promocode"
                  value={promocode}
                  onChange={(e) => setPromocode(e.target.value)}
                />
                <button className="promocode-btn" onClick={handlePromocode}>
                  Apply
                </button>
              </div>

              {isCodeCorrect && <p className="applied"><b>AhmedDev374</b> has been applied!</p>}
              {!isCodeCorrect && promocode && <p className="applied2">Enter a valid promocode.</p>}

              <hr className="horizontal" />

              <div className="money-data">
                <div className="money-1">
                  <p className="total">Sub-Total</p>
                  <p className="total-price">${subtotal.toFixed(2)}</p>
                </div>

                {isCodeCorrect && (
                  <div className="money-2">
                    <p className="item-discount">Discount</p>
                    <p className="item-discount2">(20%) - ${discount.toFixed(2)}</p>
                  </div>
                )}

                <div className="money-3">
                  <p className="item-delivery">Delivery</p>
                  <p className="item-delivery2">$0.00</p>
                </div>

                <div className="money-4">
                  <p className="item-tax">Tax</p>
                  <p className="item-tax2">(5%) + ${tax.toFixed(2)}</p>
                </div>
              </div>

              <hr className="horizontal" />

              <div className="money-5">
                <p className="total">Total</p>
                <p className="total-price">${isCodeCorrect ? finalTotal : (subtotal + tax).toFixed(2)}</p>
              </div>

              <div className="payment-btn">
                <button
                  className="payment"
                  onClick={() => {
                    localStorage.setItem(
                      "TotalAmount",
                      isCodeCorrect ? finalTotal : (subtotal + tax).toFixed(2)
                    );
                    window.location.href = "http://localhost/home/payment";
                  }}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lowerNav">
        <LowerNav />
      </div>
      <Footer />
    </>
  );
}

export default CartSection;
