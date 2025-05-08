"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpFromDot } from "lucide-react";

const ScrollTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {visible && (
        <button
          onClick={scrollToTop}
          className="fixed w-12 h-12 bottom-12 md:bottom-8 right-5  bg-gradient-to-br from-indigo-900 to-purple-800 text-white py-2 px-4 rounded-full shadow-md hover:bottom-10 transition-all duration-300 z-50 flex justify-center items-center"
        >
          <ArrowUpFromDot />
        </button>
      )}
    </div>
  );
};

export default ScrollTop;
