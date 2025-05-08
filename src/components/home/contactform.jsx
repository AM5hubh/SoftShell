"use client";

import { useState, useEffect } from "react";
import { Send, Check, AlertCircle } from "lucide-react";

export default function ContactFormSection() {
  const [visibleItems, setVisibleItems] = useState([]);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    licenseType: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    const elements = document.querySelectorAll(".form-animate");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formState.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    // Company validation
    if (!formState.company.trim()) {
      newErrors.company = "Company name is required";
    }

    // License type validation
    if (!formState.licenseType) {
      newErrors.licenseType = "Please select a license type";
    }

    // Message validation (optional)
    if (formState.message && formState.message.length > 500) {
      newErrors.message = "Message must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormState({
            name: "",
            email: "",
            company: "",
            licenseType: "",
            message: "",
          });
        }, 3000);
      }, 1500);
    }
  };

  const licenseTypes = [
    "Enterprise Software",
    "Creative Suite",
    "Development Tools",
    "Operating System",
    "Database Software",
    "Security Software",
    "Cloud Services",
    "Other",
  ];

  return (
    <section
      className="py-20 bg-gray-500/5 relative overflow-hidden"
      id="contact"
    >
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 opacity-5 rounded-full translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500 opacity-5 rounded-full -translate-x-40 translate-y-40"></div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div
          id="contact-header"
          className={`form-animate text-center mb-16 transform transition-all duration-1000 ease-out ${
            visibleItems.includes("contact-header")
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Your Free License Valuation
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Fill out the form below and our team will provide a no-obligation
            quote for your unused software licenses within 24 hours.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div
            id="contact-form-container"
            className={`form-animate bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-1000 ease-out delay-300 ${
              visibleItems.includes("contact-form-container")
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {/* Form header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 md:p-8">
              <div className="flex items-center">
                <div className="bg-white/20 p-3 rounded-full">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <h3 className="ml-4 text-white text-xl font-bold">
                  Contact Us
                </h3>
              </div>
            </div>

            {/* Success message */}
            {isSubmitted && (
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your message has been sent successfully. One of our license
                  experts will contact you shortly.
                </p>
                <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full animate-progress"></div>
                </div>
              </div>
            )}

            {/* Form */}
            {!isSubmitted && (
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8 text-gray-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.name ? "border-red-400" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
                      />
                      {errors.name && (
                        <div className="absolute right-3 top-3 text-red-500">
                          <AlertCircle className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.email ? "border-red-400" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
                      />
                      {errors.email && (
                        <div className="absolute right-3 top-3 text-red-500">
                          <AlertCircle className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Company field */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Company Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.company ? "border-red-400" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
                      />
                      {errors.company && (
                        <div className="absolute right-3 top-3 text-red-500">
                          <AlertCircle className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    {errors.company && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.company}
                      </p>
                    )}
                  </div>

                  {/* License Type field */}
                  <div>
                    <label
                      htmlFor="licenseType"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      License Type *
                    </label>
                    <div className="relative">
                      <select
                        id="licenseType"
                        name="licenseType"
                        value={formState.licenseType}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border text-gray-700 ${
                          errors.licenseType
                            ? "border-red-400"
                            : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 appearance-none bg-white`}
                      >
                        <option value="" disabled>
                          Select license type
                        </option>
                        {licenseTypes.map((type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                      {errors.licenseType && (
                        <div className="absolute right-8 top-3 text-red-500">
                          <AlertCircle className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    {errors.licenseType && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.licenseType}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message field */}
                <div className="mt-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message (Optional)
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Tell us about your software licenses or any specific questions..."
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.message ? "border-red-400" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200`}
                    ></textarea>
                    {errors.message && (
                      <div className="absolute right-3 top-3 text-red-500">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    {formState.message.length}/500 characters
                  </p>
                </div>

                {/* Privacy note */}
                <div className="mt-6 text-sm text-gray-500">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-indigo-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="ml-2">
                      Your information is secure. We'll never share your details
                      with third parties.
                    </p>
                  </div>
                </div>

                {/* Submit button */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-bold text-white shadow-lg flex items-center justify-center transition-all duration-300 ${
                      isSubmitting
                        ? "bg-indigo-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Get Your Free Valuation
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Alternative contact methods */}
          <div
            id="alt-contact"
            className={`form-animate mt-12 text-center transform transition-all duration-1000 ease-out delay-500 ${
              visibleItems.includes("alt-contact")
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-gray-600">
              Prefer to talk directly? Contact us at{" "}
              <span className="font-semibold text-indigo-700">
                hello@softsell.com
              </span>{" "}
              or call{" "}
              <span className="font-semibold text-indigo-700">
                (555) 123-4567
              </span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 3s linear forwards;
        }
      `}</style>
    </section>
  );
}
