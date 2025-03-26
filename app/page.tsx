"use client";
import { useState } from "react";
import Image from "next/image";
import { SourcesSidebar } from "@/components/sources-sidebar";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/lib/utils";
import { schema } from "@/lib/schemes";
import { Message, LegalData } from "@/lib/types";
import { MainContent } from "@/components/main-content";
import { Disclaimer } from "@/components/disclaimer";
import { ChatInput } from "@/components/chat-input";
import { getMockResponse } from "@/lib/server-util";

const handleNewChat = () => {
  window.location.reload();
};

export default function Home() {
  const [text, setText] = useState("");
  const [validationText, setValidationText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { openSidebar, isOpen, setLegalData } = useSidebarStore();

  // Track if we're at the initial state or in a chat
  const [chatStarted, setChatStarted] = useState(false);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents default newline insertion

      const result = schema.safeParse({ text });
      if (!result.success) {
        setValidationText(
          result.error.issues[0]?.message ||
            "Er is een validatiefout opgetreden"
        );
        return;
      }
      const newMessage: Message = { role: "user", content: text };
      setMessages([...messages, newMessage]);
      setChatStarted(true);
      openSidebar();

      const mockResponse = await getMockResponse();
      if (result.success) {
        setText("");
        setValidationText("");

        setLegalData(mockResponse);

        setTimeout(() => {
          const assistantMessage: Message = {
            role: "assistant",
            content: mockResponse.answer.text,
          };
          setMessages((prev) => [...prev, assistantMessage]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex h-screen">
      {!isOpen && (
        <Image
          className="absolute -top-10 w-1/2 left-0 translate-x-1/2 object-contain max-h-[400px]"
          src="/logo-compact-blauw.svg"
          alt="Logo Rijksoverheid"
          width={500}
          height={500}
        />
      )}
      {/* Main content area */}
      <div className={`flex flex-col transition-all duration-300 w-full`}>
        <div className="flex-1 flex flex-col h-fit justify-center relative">
          <MainContent
            messages={messages}
            handleNewChat={handleNewChat}
            chatStarted={chatStarted}
          />

          <div
            className={cn(
              "p-4 w-full flex justify-center transition-all duration-500",
              isOpen ? "border-t" : "border-t-0"
            )}
          >
            <ChatInput
              text={text}
              setText={setText}
              handleKeyDown={handleKeyDown}
              isOpen={isOpen}
              validationText={validationText}
            />
          </div>
        </div>
        {!isOpen && <Disclaimer />}
      </div>
      <SourcesSidebar />
    </div>
  );
}
