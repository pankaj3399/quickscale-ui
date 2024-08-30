import React, { useState, useEffect, useRef } from "react";
import {
  FaRegCommentDots,
  FaUser,
  FaInfoCircle,
} from "react-icons/fa";
import { MdClose, MdSend } from "react-icons/md";
import logo from "../../assets/dashboard/phonelogo.png";
import HoverTable from "components/HoverTable/HoverTable";

const ChatPopup = ({ darkmode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! Ask me anything...",
      info: "",
      showTable: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [typingMessage, setTypingMessage] = useState("");
  const [showTooltip, setShowTooltip] = useState(false); // New state for tooltip visibility
  const messagesEndRef = useRef(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { sender: "user", text: input };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      simulateBotResponse(updatedMessages);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const simulateBotResponse = (currentMessages) => {
    const botMessage =
      "Sure! The total revenue extracted from the document is xxxyxx. You can find it in the xyz field in the extracted data panel. Would you like to make any changes?";
    setTypingMessage("");
    let index = -1;

    const interval = setInterval(() => {
      if (index < botMessage.length - 1) {
        index++;
        setTypingMessage((prev) => prev + botMessage[index]);
      } else {
        clearInterval(interval);
        setTypingMessage("");
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "bot",
            text: botMessage,
            info: botMessage,
            showTable: false,
          },
        ]);
      }
    }, 50);
  };

  const toggleTableVisibility = (index) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg, idx) =>
        idx === index ? { ...msg, showTable: !msg.showTable } : msg
      )
    );
  };

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, typingMessage]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div
          className={`h-[28rem] w-96 overflow-hidden rounded-[20px] bg-white text-[#202a4f] shadow-lg dark:bg-[#1a1a46] dark:text-white md:h-[full] md:w-[28rem] lg:h-[96vh] lg:w-[23rem]`}
        >
          <div className="flex justify-between border-b border-[#E2E9EF] p-4 dark:border-gray-500">
            <h2 className="gap flex items-center text-lg font-bold">DocBot</h2>
            <button
              className="flex items-center justify-center rounded-full bg-[#E0E6E5] px-1 dark:bg-[#1a1a46]"
              onClick={togglePopup}
            >
              {isOpen ? (
                <MdClose className="font-bold text-white" size={18} />
              ) : (
                <FaRegCommentDots className="text-white" size={18} />
              )}
            </button>
          </div>
          <div
            className={`custom-scrollbar h-[calc(100%-8.5rem)] overflow-y-auto bg-white p-4 dark:bg-[#1a1a46]`}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-4 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="mr-2 flex h-8 min-w-8 items-center justify-center rounded-full bg-[#70D2C2] dark:bg-[#293357]">
                    <img
                      src={logo}
                      className="h-[18px] max-h-full max-w-full"
                      alt=""
                    />
                  </div>
                )}
                <span
                  className={`inline-block max-w-[340px] rounded-xl px-2 py-1 ${
                    msg.sender === "user"
                      ? "bg-[#70D2C2] text-white"
                      : "text-black bg-gray-200 dark:bg-[#293357] dark:text-white"
                  }`}
                >
                  {msg.text}
                </span>
                {msg.sender === "bot" &&
                  msg.info ===
                    "Sure! The total revenue extracted from the document is xxxyxx. You can find it in the xyz field in the extracted data panel. Would you like to make any changes?" && (
                    <div className="relative ml-2 mt-[65px] flex h-[30px] min-w-[30px] cursor-pointer items-center justify-center rounded-full border border-[#A7C9C9]">
                      <FaInfoCircle
                        className="text-[#A7C9C9]"
                        size={16}
                        onClick={toggleTooltip}
                      />
                    </div>
                  )}
                {msg.sender === "user" && (
                  <div className="ml-2 flex h-8 min-w-8 items-center justify-center rounded-full bg-[#70D2C2]">
                    <FaUser className="text-white" size={16} />
                  </div>
                )}
              </div>
            ))}
            {showTooltip && (
              <div className="absolute right-[100%] top-[50%] z-[100]  mt-[60px]  w-[330px] -translate-y-1/2 transform rounded-lg bg-white p-2 text-sm shadow-lg dark:bg-[#293357] dark:text-white">
                <p>
                  <HoverTable />
                </p>
              </div>
            )}
            {typingMessage && (
              <div className="mb-2 flex justify-start text-left">
                <div className="mr-2 flex h-8 min-w-8 items-center justify-center rounded-full bg-[#70D2C2] dark:bg-[#293357]">
                  <img src={logo} className="w-[18px]" alt="" />
                </div>
                <span className="text-black inline-block max-w-[340px] rounded-xl bg-gray-200 px-2 py-1 dark:bg-[#293357] dark:text-white">
                  {typingMessage}
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="border-t border-[#E2E9E5] p-4 dark:border-gray-500">
            <div className="relative flex items-center">
              <input
                type="text"
                className={`text-black h-12 w-full rounded-full bg-[#E0E6E5] px-4 py-2 pr-12 placeholder-gray-500 focus:outline-none dark:bg-[#293357] dark:text-white`}
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="absolute right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#70D2C2] dark:bg-[#293357]"
                onClick={handleSend}
              >
                <MdSend className="text-white" size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="absolute z-[-10] mt-[60px] flex">
        <div className="fixed bottom-[25px] right-[90px] z-50 rounded border bg-white px-[10px] py-[4px] font-medium shadow">
          Need Help 👋
        </div>
        <button
          className="fixed bottom-4 right-4 z-50 rounded-full bg-[#70D2C2] p-4 text-white shadow-lg focus:outline-none dark:border dark:bg-[#1a1a46]"
          onClick={togglePopup}
        >
          {isOpen ? (
            <MdClose size={24} />
          ) : (
            <>
              <img src={logo} className="w-[24px]" alt="" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatPopup;
