import React, { useState, useEffect } from "react";
import "./home.css";
import Delivery from "../imgs/delivery.png";
import Popular from "./Category/Popular";
import Navbar from "./Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Set page title
  document.title = "Amazon";

  // Check if user is signed in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // User is not signed in, redirect
        window.location.href = "http://localhost/auth";
      }
    });
    return () => unsubscribe();
  }, []);

  // Scroll handler
  const handleScroll = () => {
    window.scrollTo({
      top: scrollPosition + 750,
      behavior: "smooth",
    });
    setScrollPosition(scrollPosition + 750);
    setTimeout(() => {
      setScrollPosition(0);
    }, 100);
  };

  return (
    <>
      <Navbar />
      <div className="content">
        {/* Poster Section */}
        <div className="poster-area">
          <div className="poster-data">
            <p className="poster-head">Free Delivery!</p>
            <p className="poster-desc">
              Don't miss it out! Only today, get free{" "}
              <b style={{ fontSize: "22px" }}>Next Day</b> delivery on all
              your orders.
            </p>
          </div>
          <button onClick={handleScroll} className="browse-btn">
            Browse products
          </button>
        </div>
        <img src={Delivery} className="delivery" alt="Delivery" />

        {/* Category Section */}
        <Popular />
      </div>
    </>
  );
}

export default Home;
