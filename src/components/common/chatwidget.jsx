"use client";
import { useState, useEffect, useRef } from "react";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [inputText, setInputText] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "How do I sell my license?",
    "What's your refund policy?",
    "How do I reset my password?",
    "Do you offer discounts?",
  ];

  // Mock OpenAI API call
  const callOpenAI = async (userMessage) => {
    setIsThinking(true);

    try {
      const response = await openai.completions.create({
        model: "gpt-4o-mini", // Using the free tier model
        store: true,
        messages: [{ role: "user", content: userMessage }],
      });

      setIsThinking(false);
      console.log(response);
      return response.choices[0].message;
    } catch (error) {
      console.error("OpenAI API Error:", error);

      // Check for specific error types
      if (error.status === 429) {
        // Rate limit or quota exceeded error
        console.log(
          "Rate limit exceeded or out of quota. Using fallback responses."
        );
        return handleFallbackResponse(userMessage);
      } else {
        // Generic error handling
        setIsThinking(false);
        return "I'm sorry, I encountered an error. Please try again later.";
      }
    }
  };

  // Fallback response handler
  const handleFallbackResponse = (userMessage) => {
    let response = "I'm not sure about that. Could you provide more details?";

    if (
      userMessage.toLowerCase().includes("license") ||
      userMessage.toLowerCase().includes("sell")
    ) {
      response =
        "To sell your license, go to your account dashboard, select the license you wish to sell, and click on the 'Transfer License' button. You'll need the email of the person you're selling to.";
    } else if (userMessage.toLowerCase().includes("refund")) {
      response =
        "Our refund policy allows for full refunds within 30 days of purchase. Please contact support with your order number to process your refund.";
    } else if (userMessage.toLowerCase().includes("password")) {
      response =
        "To reset your password, click on the 'Forgot Password' link on the login page. We'll send a reset link to your email address.";
    } else if (userMessage.toLowerCase().includes("discount")) {
      response =
        "We offer discounts for educational institutions, non-profits, and bulk purchases. Contact our sales team for more information.";
    }

    setIsThinking(false);
    return response;
  };

  const handleSend = async () => {
    if (inputText.trim() === "") return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Get AI response
    const response = await callOpenAI(inputText);

    // Add AI response
    const botMessage = {
      id: messages.length + 2,
      text: response,
      sender: "bot",
    };
    setMessages((prev) => [...prev, botMessage]);
  };

  const handleQuestionClick = (question) => {
    setInputText(question);
    handleSend();
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative">
      {/* Chat Toggle Button */}
      <button
        className="fixed bottom-5 right-5 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Widget */}
      <div
        className={`fixed bottom-20 right-5 w-80 md:w-96 bg-white rounded-lg shadow-xl z-40 overflow-hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
          <div className="font-medium">Customer Support</div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-3 rounded-lg max-w-3/4 ${
                message.sender === "bot"
                  ? "bg-gray-100 self-start"
                  : "bg-blue-100 self-end"
              }`}
            >
              {message.text}
            </div>
          ))}
          {isThinking && (
            <div className="bg-gray-100 p-3 rounded-lg self-start flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        <div className="p-2 border-t border-gray-200 flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm"
              onClick={() => {
                setInputText(question);
                setTimeout(() => handleSend(), 10);
              }}
            >
              {question}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-200 flex">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="ml-2 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center"
            onClick={handleSend}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
