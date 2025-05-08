"use client";
import { useState, useEffect } from "react";

export default function TestimonialsSection() {
  const [visibleItems, setVisibleItems] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

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

    const elements = document.querySelectorAll(".testimonial-animate");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      id: 1,
      quote:
        "SoftSell helped our company recover over $50,000 from unused enterprise software licenses we'd forgotten about. The process was seamless and the payment arrived within hours of accepting their offer.",
      name: "Sarah Johnson",
      title: "IT Director",
      company: "Nexus Solutions",
      avatar: "https://i.pravatar.cc/150?img=32",
      rating: 5,
    },
    {
      id: 2,
      quote:
        "As a fast-growing startup, we needed to free up capital quickly. SoftSell's platform allowed us to liquidate excess licenses and reinvest in areas that directly supported our growth. Their valuation was fair and the process was remarkably fast.",
      name: "Michael Chen",
      title: "CFO",
      company: "Elevate Tech",
      avatar: "https://i.pravatar.cc/150?img=11",
      rating: 5,
    },
    {
      id: 3,
      quote:
        "When our company downsized, we were left with dozens of unused software licenses. SoftSell not only provided a fair market price but also handled all the complex transfer paperwork. I couldn't recommend them more highly.",
      name: "Jessica Williams",
      title: "Operations Manager",
      company: "Pinnacle Group",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
    },
  ];

  // Generate star rating
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <section className="py-20 overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div
          id="testimonials-header"
          className={`testimonial-animate text-center mb-16 transform transition-all duration-1000 ease-out ${
            visibleItems.includes("testimonials-header")
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Don't just take our word for it. See what businesses like yours have
            achieved with SoftSell.
          </p>
        </div>

        {/* Main testimonial carousel */}
        <div
          id="testimonial-carousel"
          className={`testimonial-animate relative bg-gray-50 rounded-2xl shadow-lg p-8 mb-16 overflow-hidden transform transition-all duration-1000 ease-out ${
            visibleItems.includes("testimonial-carousel")
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500 opacity-5 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500 opacity-5 rounded-full translate-x-24 translate-y-24"></div>

          {/* Quote marks */}
          <div className="absolute top-8 left-8 text-indigo-300 opacity-20">
            <svg width="40" height="40" fill="currentColor" viewBox="0 0 32 32">
              <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
            </svg>
          </div>

          {/* Testimonial content */}
          <div className="relative z-10">
            <div className="relative h-64">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out transform ${
                    index === activeTestimonial
                      ? "opacity-100 translate-x-0"
                      : index < activeTestimonial
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-6">
                      <div className="flex justify-center mb-3">
                        {renderStars(testimonial.rating)}
                      </div>
                      <p className="md:text-lg text-gray-700 italic text-center">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    <div className="flex items-center">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5">
                        <div className="rounded-full overflow-hidden bg-white w-full h-full">
                          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-2xl font-bold text-gray-500">
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4 text-left">
                        <h4 className="font-bold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-600">
                          {testimonial.title}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center mt-8">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? "bg-indigo-600 w-6"
                      : "bg-gray-300 hover:bg-indigo-400"
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div
          id="trust-indicators"
          className={`testimonial-animate transform transition-all duration-1000 ease-out delay-300 ${
            visibleItems.includes("trust-indicators")
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold mb-2">
              Trusted by Companies Worldwide
            </h3>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[
              "Acme Inc.",
              "TechFlow",
              "Globex",
              "Initech",
              "Stark Industries",
            ].map((company, index) => (
              <div key={index} className="text-gray-400 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
