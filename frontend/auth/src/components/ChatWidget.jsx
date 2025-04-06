import React, { useEffect } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";

function ChatWidget() {
  useEffect(() => {
    // Add a welcome message when the widget loads
    addResponseMessage("Welcome to MediConnect! How can I assist you today?");
  }, []);

  const handleNewUserMessage = (message) => {
    console.log(`New message from user: ${message}`);
    // You can integrate this with your backend or chatbot API
    addResponseMessage("Thank you for your message! We'll get back to you shortly.");
  };

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="MediConnect Chat"
      subtitle="How can we assist you today?"
    />
  );
}

export default ChatWidget;