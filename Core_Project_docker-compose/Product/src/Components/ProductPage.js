import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import VanillaTilt from "vanilla-tilt";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LowerNav from "./LowerNav";
import Rating from "../imgs/rating.png";
import addedIcon from "../imgs/added.png";
import addIcon from "../imgs/not-added.png";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../Firebase";
import { AddToCart, RemoveCart } from "../action/Cart";

import "./productpage.css";

function ProductPage() {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
const [user, setUser] = useState(null);
const auth = getAuth(app);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [reviews, setReviews] = useState(0);

  const cartItems = useSelector((state) => state.CartItemsAdded.CartItems);
  const addedIds = cartItems.map((item) => item.id);

  const tiltRef = useRef(null);
  const quantity = 1;
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (!user) {
      // If not logged in → redirect
      window.location.href = "http://localhost/auth";
    } else {
      setUser(user);
    }
  });

  return () => unsubscribe();
}, []);
  // Fetch product details
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        const data = await response.json();
        setProduct(data);
        document.title = data.title;
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();

    // random reviews count
    setReviews(Math.floor(Math.random() * 81) + 20);
  }, [productId]);

  // scroll top on change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  // tilt effect
  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 10,
        speed: 100,
        transition: true,
        easing: "ease-out",
      });
    }
  }, [product]);

  // check if product is in cart
  const isAddedToCart = product ? addedIds.includes(product.id) : false;

  // toggle add/remove cart
  const toggleCart = () => {
    if (!product) return;

    if (isAddedToCart) {
      dispatch(RemoveCart(product.id));
    } else {
      dispatch(
        AddToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          size: selectedSize,
          category: product.category,
          quantity,
        })
      );
    }
  };

  // handle buy now (add to cart if not already)
  const handleBuyNow = () => {
    if (product && !isAddedToCart) {
      dispatch(
        AddToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          size: selectedSize,
          category: product.category,
          quantity,
        })
      );
    }
  };

  // fix image url
  const getImageUrl = (imagePath) => {
    return imagePath && imagePath.startsWith("http")
      ? imagePath
      : `https://fakestoreapi.com${imagePath}`;
  };

  const placeholderImage = "/path/to/placeholder.jpg";

  return (
    <>
      <Navbar />
      <div
        className="product-page"
        style={product ? { height: "100%" } : { height: "100vh" }}
      >
        {product ? (
          <div className="product-dataa animate">
            {/* Product Image */}
            <div className="item-image">
              <img
                ref={tiltRef}
                src={getImageUrl(product.image) || placeholderImage}
                alt={product.title}
                className={`item-img ${product.image ? "img-style" : ""}`}
              />
            </div>

            {/* Product Details */}
            <div className="product-details">
              <p className="item-title">{product.title}</p>
              <p className="item-desc">{product.description}</p>

              {/* Rating */}
              <div className="price-section">
                <div className="item-rating">
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src={Rating} className="rating-img" alt="star" />
                  ))}
                  <p className="rating-no">({reviews})</p>
                </div>
              </div>

              <hr className="horizontal" />

              {/* Size Selector */}
              {(product.category === "men's clothing" ||
                product.category === "women's clothing") && (
                <>
                  <div className="cloth-size">
                    <p className="choose">Choose a size</p>
                    <div className="options">
                      {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <p
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`size ${
                            selectedSize === size ? "size-clicked" : ""
                          }`}
                        >
                          {size}
                        </p>
                      ))}
                    </div>
                  </div>
                  <hr className="horizontal" />
                </>
              )}

              {/* Price */}
              <div className="product-actual-price">
                <p className="price-one">Price:</p>
                <p className="price-two">${product.price.toFixed(2)}</p>
                <p className="mrp">${Math.round(product.price * 1.66)}</p>
              </div>

              {/* Buttons */}
              <div className="buying-buttons">
                <a href="http://localhost/home/cart">
                  <button onClick={handleBuyNow} className="buy-btn">
                    Buy Now
                  </button>
                </a>
                <button onClick={toggleCart} className="add-cart-btn">
                  <img
                    src={isAddedToCart ? addedIcon : addIcon}
                    alt="cart icon"
                    className="cart-img"
                  />
                  <p style={{ marginLeft: "8px" }} className="cart-text">
                    {isAddedToCart ? "Added" : "Add"}
                  </p>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="loading-container">
            <p className="loading">Loading...</p>
          </div>
        )}
      </div>

      <div className="lowerNav">
        <LowerNav />
      </div>
      {product && <Footer />}
    </>
  );
}

export default ProductPage;
