"use client";
import { useState, useEffect } from "react";
import { Shield, Clock, TrendingUp, Users } from "lucide-react";

export default function WhyChooseUsSection() {
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
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".feature-animate");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const features = [
    {
      id: "feature1",
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Transactions",
      description:
        "Bank-level encryption and verified buyers ensure your license transfers are 100% secure and compliant with all legal requirements.",
    },
    {
      id: "feature2",
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Maximum Value",
      description:
        "Our AI-powered market analysis ensures you get the highest possible price for your software licenses on the current market.",
    },
    {
      id: "feature3",
      icon: <Clock className="w-6 h-6" />,
      title: "Fast Payouts",
      description:
        "Receive payment within 24 hours of accepting an offer, with multiple payout options including direct deposit and cryptocurrency.",
    },
    {
      id: "feature4",
      icon: <Users className="w-6 h-6" />,
      title: "Dedicated Support",
      description:
        "Our team of license experts is available 24/7 to guide you through the process and answer any questions you may have.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div
          id="why-choose-header"
          className={`feature-animate text-center mb-16 transform transition-all duration-1000 ease-out ${
            visibleItems.includes("why-choose-header")
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose SoftSell
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're revolutionizing software license reselling with our secure
            marketplace, cutting-edge technology, and customer-first approach.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              id={feature.id}
              className={`feature-animate bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform transition-all duration-1000 ease-out delay-${
                index * 150
              } ${
                visibleItems.includes(feature.id)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-start">
                {/* Icon with gradient background */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>

              {/* Animated corner accent */}
              <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute bottom-0 right-0 w-6 h-6 transform rotate-45 translate-x-3 translate-y-3 bg-gradient-to-br from-indigo-400 to-purple-500 opacity-30"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight box */}
        <div
          id="highlight-box"
          className={`feature-animate mt-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-8 text-white shadow-xl relative overflow-hidden transform transition-all duration-1000 ease-out delay-600 ${
            visibleItems.includes("highlight-box")
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-24 h-24 bg-white opacity-10 rounded-full"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold mb-2">
                Ready to Unlock the Value of Your Software?
              </h3>
              <p className="text-indigo-100">
                Join thousands of businesses that have recovered millions in
                software investments.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button className="bg-white text-indigo-800 hover:bg-indigo-100 transition-colors duration-300 font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
