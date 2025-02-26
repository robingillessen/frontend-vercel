"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import ValidationText from "@/components/validation-text";
import { SourcesSidebar } from "@/components/sources-sidebar";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SquarePen, WandSparkles } from "lucide-react";
import { schema } from "@/lib/schemes";
import { Message } from "@/lib/types";
import { InitialHomepageView } from "@/components/initial-homepage-view"; 
import { ChatView } from "@/components/chat-view";
import { MainContent } from "@/components/main-content";
import { Disclaimer } from "@/components/disclaimer";
import { ChatInput } from "@/components/chat-input";
const handleNewChat = () => {
  // refresh the page
  window.location.reload();
} 


export default function Home() {
  const [text, setText] = useState("");
  const [validationText, setValidationText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { openSidebar, isOpen } = useSidebarStore();
  
  // Track if we're at the initial state or in a chat
  const [chatStarted, setChatStarted] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents default newline insertion

      const result = schema.safeParse({ text });
      if (result.success) {
        // Start chat if not already started
        if (!chatStarted) {
          setChatStarted(true);
        }
        
        // Add user message to chat
        const newMessage: Message = { role: 'user', content: text };
        setMessages([...messages, newMessage]);
        
        // Clear 
        setText("");
        setValidationText("");  
        
     
        openSidebar();
        
        // Here you would normally call an API to get a response
        // For now, let's simulate a response after a delay
        setTimeout(() => {
          const assistantMessage: Message = { 
            role: 'assistant', 
            content: "Dit is een demo antwoord. Hier zou het echte antwoord van de AI komen."
          };
          setMessages(prev => [...prev, assistantMessage]);
        }, 1000);
      } else {
        console.error("Validation error:", result.error);
        const errorMessage =
          result.error.issues[0]?.message || "Er is een validatiefout opgetreden";
        setValidationText(errorMessage);
      }
    }
  };



  return (
    <div className="flex h-screen">
      {/* Main content area */}
      <div className={`flex flex-col transition-all duration-300 ${isOpen ? 'w-[70%]' : 'w-full'}`}>
        {!isOpen && <Image
          className="absolute top-0 w-1/2 left-0 translate-x-1/2 object-contain max-h-[400px]"
          src="/logo-compact-blauw.svg"
          alt="Logo Rijksoverheid"
          width={500}
          height={500}
        />}
        
        <div className="flex-1 flex flex-col h-fit justify-center">
          <MainContent messages={messages} handleNewChat={handleNewChat} chatStarted={chatStarted} />
          
        
          <div className={cn("p-4 w-full flex justify-center", isOpen ? "border-t" : "border-t-0")}>
            
         <ChatInput text={text} setText={setText} handleKeyDown={handleKeyDown} isOpen={isOpen} validationText={validationText} />
            
          </div>
           
        </div>
          <Disclaimer />
      </div>
      <SourcesSidebar />
    </div>
  );
}