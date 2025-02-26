import React, { useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { SquarePen } from "lucide-react";
import { Message } from "@/lib/types";

interface ChatViewProps {
  messages: Message[];
  handleNewChat: () => void;
}

export const ChatView = ({ messages, handleNewChat }: ChatViewProps) => {
  // Check if the last message is from the user (which would indicate we're waiting for assistant response)
  const isWaitingForResponse =
    messages.length > 0 && messages[messages.length - 1].role === "user";

  // Add ref for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change or when waiting for a response
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isWaitingForResponse]);

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] pt-10 overflow-hidden ">
      {/* Chat messages */}
      {/* New chat button, just a refresh button */}
      <div className="flex justify-start pl-4">
        <Button onClick={handleNewChat} variant="outline">
          <SquarePen strokeWidth={2.5} className="font-bold" />
          New Chat
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg ${
              message.role === "user"
                ? "bg-gray-100 ml-auto max-w-[80%]"
                : "bg-white text-black mr-auto max-w-[80%]"
            }`}
          >
            {message.content}
          </div>
        ))}

        {/* Show loading message if waiting for a response */}
        {isWaitingForResponse && (
          <div className="mb-4 p-3 rounded-lg bg-white text-black mr-auto max-w-[80%]">
            <div className="flex items-center">
              <div className="ml-2 flex space-x-1">
                <div
                  className="h-2 w-2 rounded-full bg-lintblauw animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="h-2 w-2 rounded-full bg-lintblauw animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="h-2 w-2 rounded-full bg-lintblauw animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Invisible div at the end for scrolling */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
