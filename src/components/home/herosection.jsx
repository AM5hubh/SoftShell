"use client";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visible after component mounts for animation
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-800 text-white w-full flex items-center justify-center">
      {/* Abstract animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-purple-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-indigo-600 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.05]"></div>

      {/* Hero content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 md:py-32 flex flex-col items-center">
        {/* Logo placeholder */}
        <div
          className={`mb-8 transform transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex items-center">
            <div className=" backdrop-blur-md p-3 rounded-xl">
              <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SoftSell
              </div>
            </div>
          </div>
        </div>

        {/* Main headline */}
        <h1
          className={`text-4xl md:text-6xl font-extrabold text-center mb-6 transform transition-all duration-1000 delay-300 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Transform Unused Software
            <br className="hidden md:block" /> Into Instant Revenue
          </span>
        </h1>

        {/* Subheading */}
        <p
          className={`text-lg md:text-xl text-center text-indigo-100 max-w-2xl mb-8 transform transition-all duration-1000 delay-500 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          SoftSell helps businesses recover value from unused software licenses
          with our secure, transparent marketplace and immediate payment
          processing.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 mb-16 transform transition-all duration-1000 delay-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <button className="bg-white text-indigo-900 px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group">
            Sell My Licenses
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-transparent border-2 border-white/50 backdrop-blur-sm px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-all duration-300">
            Get a Quote
          </button>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 transform transition-all duration-1000 delay-900 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent mb-1">
              $14M+
            </div>
            <div className="text-sm text-indigo-200">Recovered For Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent mb-1">
              5,000+
            </div>
            <div className="text-sm text-indigo-200">Licenses Resold</div>
          </div>
          <div className="text-center col-span-2 md:col-span-1">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-1">
              24 hrs
            </div>
            <div className="text-sm text-indigo-200">Average Payout Time</div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
        >
          <path
            fill="#212121"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
