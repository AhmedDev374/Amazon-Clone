import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./orders.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Done from "../imgs/order-done.png";
import OrderNow from "../imgs/order-now.gif";
import Delete from "../imgs/delete-order.png";
import LowerNav from "./LowerNav";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Orders() {
  // Ensure fallback: empty array if null/undefined
  const OrderItems = useSelector((state) => state.OrderAdded.OrderItems) || [];

  document.title = "Orders section";


  useEffect(() => {
    // 🔒 Protect Orders page → redirect if not signed in
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "http://localhost/auth";
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="orders-section">
        <div
          style={
            OrderItems.length === 0
              ? { textAlign: "center", height: "48vh" }
              : { textAlign: "unset", height: "fit-content" }
          }
          className={OrderItems.length > 0 ? "ordered-data animate" : "ordered-data"}
        >
          <div
            style={
              OrderItems.length !== 0
                ? { justifyContent: "space-between" }
                : { justifyContent: "center" }
            }
            className="head-texts"
          >
            <p
              style={
                OrderItems.length === 0
                  ? { marginBottom: "0px" }
                  : { marginBottom: "16px" }
              }
              className="order-head-text"
            >
              Your Orders
            </p>
            {OrderItems.length > 0 && (
              <button
                onClick={() => {
                  localStorage.removeItem("OrderItems");
                  window.location.reload();
                }}
                className="delete-orders"
              >
                <img src={Delete} className="delete-order-btn" alt="Delete orders" />
                <p style={{ margin: 0 }}>Clear Data</p>
              </button>
            )}
          </div>

          {OrderItems.length === 0 && (
            <div className="order-now-section">
              <div className="empty-order">
                <img src={OrderNow} className="no-orders" alt="No orders" />
                <div className="no-orders-txt"></div>
              </div>
            </div>
          )}

          <div className="all-orders">
            {OrderItems.map((order, i) =>
              (order || []).map((item) => (
                <NavLink to={`/product/${item.id}`} key={item.id} className="nav-link2">
                  <div className="order">
                    <img src={item.image} className="order-img" alt={item.title} />
                    <div className="order-text">
                      <p className="order-head">{item.title}</p>
                      <p className="order-category">{item.category}</p>
                      <p className="order-quantity">
                        Number of items: <b>{item.quantity}</b>
                      </p>
                      {(item.category === "men's clothing" ||
                        item.category === "women's clothing") && (
                        <p className="order-size">
                          Size: <b>{item.size}</b>
                        </p>
                      )}
                      <div className="order-success">
                        <img src={Done} className="order-done" alt="Done" />
                        <p
                          style={{
                            marginLeft: "5px",
                            marginTop: 0,
                            marginBottom: 0,
                          }}
                          className="order-dispatch"
                        >
                          Ordered successfully! Soon to be dispatched!
                        </p>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="lowerNav">
        <LowerNav />
      </div>
      <Footer />
    </>
  );
}

export default Orders;
