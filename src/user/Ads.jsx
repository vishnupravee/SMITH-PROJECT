import React, { useEffect, useState } from "react";
import "../user/Ads.css";

// Import your images from assets
import ad1 from "../assets/ChatGPT Image Sep 1, 2025, 10_11_01 AM.png";
import ad2 from "../assets/ChatGPT Image Sep 1, 2025, 10_17_38 AM.png";

const Ads = () => {
  const images = [ad1, ad2]; // Add more if needed
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // change every 5 sec
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="ads-banner">
      <img
        src={images[currentIndex]}
        alt="Advertisement"
        className="ads-image"
      />
    </div>
  );
};

export default Ads;