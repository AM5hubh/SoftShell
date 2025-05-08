"use client";
import { useState, useEffect } from "react";
import { Upload, DollarSign, CheckCircle } from "lucide-react";

export default function HowItWorksSection() {
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const steps = [
    {
      id: "step1",
      icon: <Upload className="w-10 h-10" />,
      title: "Upload License Details",
      description:
        "Submit your unused software license information through our secure portal for an instant assessment.",
    },
    {
      id: "step2",
      icon: <CheckCircle className="w-10 h-10" />,
      title: "Get Valuation",
      description:
        "Our AI-powered system instantly analyzes the market value of your licenses based on current demand.",
    },
    {
      id: "step3",
      icon: <DollarSign className="w-10 h-10" />,
      title: "Get Paid",
      description:
        "Accept our offer and receive payment within 24 hours via your preferred payment method.",
    },
  ];

  return (
    <section className="py-20 " id="how-it-works">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div
          id="hiw-header"
          className={`animate-on-scroll text-center mb-16 transform transition-all duration-1000 ease-out ${
            visibleItems.includes("hiw-header")
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold  mb-4">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Turn your unused software licenses into cash with our simple
            three-step process.
          </p>
        </div>

        {/* Steps container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection line (visible on md screens and up) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 z-0"></div>

          {/* Steps */}
          {steps.map((step, index) => (
            <div
              key={step.id}
              id={step.id}
              className={`animate-on-scroll flex flex-col items-center text-center relative z-10 transform transition-all duration-1000 ease-out delay-${
                index * 200
              } ${
                visibleItems.includes(step.id)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* Step number */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xl mb-4">
                {index + 1}
              </div>

              {/* Icon container with animation */}
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white mb-5 shadow-lg group hover:shadow-xl transition-all duration-300">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div
          id="hiw-cta"
          className={`animate-on-scroll flex justify-center mt-16 transform transition-all duration-1000 ease-out ${
            visibleItems.includes("hiw-cta")
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center group">
            Start Your Valuation
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
