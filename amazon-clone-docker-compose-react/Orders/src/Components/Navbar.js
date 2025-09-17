import { React, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { app } from "../Firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import Logo from "../imgs/logo.png";
import LogoSmall from "../imgs/A-logo.png";
import search from "../imgs/search.png";
import wishlist from "../imgs/wishlist.png";
import cart from "../imgs/cart.png";
import orders from "../imgs/orders.png";
import Default from "../imgs/default.png";
import "./navbar.css";

const auth = getAuth(app);

function Navbar() {
  const CartItems = useSelector((state) => state.CartItemsAdded.CartItems);
  const ListItems = useSelector((state) => state.ItemsAdded.ListItems);
  const OrderItems = useSelector((state) => state.OrderAdded.OrderItems);
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [Products, setProducts] = useState([]);
  const searchResultsRef = useRef(null);

  // Total counts
  const totalQuantity = CartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalLength = OrderItems.reduce(
    (acc, item) => (Array.isArray(item) ? acc + item.length : acc + 1),
    0
  );

  // Fetch products and handle auth
  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user || null));

    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();

    const handleClickOutside = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target)
      ) {
        setSearchText("");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const searchResults = Products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchText.toLowerCase()) ||
      p.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <div className="navbar">
        <div className="left-section">
          <img
            src={Logo}
            className="logo"
            onClick={() => (window.location.href = "http://localhost/home")}
          />
          <img
            src={LogoSmall}
            className="logo2"
            onClick={() => (window.location.href = "http://localhost/home")}
          />

          <div className="search-bar">
            <input
              type="text"
              className="search-box"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="search-btn">
              <img src={search} className="search-img" />
            </button>
          </div>
        </div>

        <div className="right-section">
          <img
            src={wishlist}
            className="wishlist"
            onClick={() =>
              (window.location.href = "http://localhost/home/wishlist")
            }
          />
          <p
            className="list-count"
            style={{ opacity: ListItems.length > 0 ? 1 : 0 }}
          >
            {ListItems.length}
          </p>

          <img
            src={cart}
            className="cart"
            onClick={() => (window.location.href = "http://localhost/home/cart")}
          />
          <p
            className="cart-count"
            style={{ opacity: CartItems.length > 0 ? 1 : 0 }}
          >
            {totalQuantity}
          </p>

          <img
            src={orders}
            className="orders"
            onClick={() =>
              (window.location.href = "http://localhost/home/orders")
            }
          />
          <p
            className="order-count"
            style={{ opacity: OrderItems.length > 0 ? 1 : 0 }}
          >
            {totalLength}
          </p>

          <img
            src={
              user?.photoURL
                ? user.photoURL.replace(/^http:\/\//i, "https://")
                : Default
            }
            className="default"
            onClick={() =>
              (window.location.href = "http://localhost/home/account")
            }
          />
        </div>

        <div className="search-bar2">
          <input
            type="text"
            className="search-box"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="search-btn">
            <img src={search} className="search-img" />
          </button>
        </div>
      </div>

      {searchText && (
        <div
          ref={searchResultsRef}
          className={`search-results ${searchResults.length ? "show" : ""}`}
        >
          {searchResults.map((product) => (
            <div
              className="search-results2"
              key={product.id}
              onClick={() =>
                (window.location.href = `http://localhost/home/product/${product.id}`)
              }
            >
              <div className="product-img">
                <img src={product.image} className="product-image" />
              </div>
              <div className="product-data">
                <p className="product-title">
                  {product.title.length > 50
                    ? product.title.slice(0, 50) + "..."
                    : product.title}
                </p>
                <p className="product-desc">
                  {product.description.length > 50
                    ? product.description.slice(0, 50) + "..."
                    : product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Navbar;
