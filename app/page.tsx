"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { z } from "zod";
import ValidationText from "@/components/validation-text";
import { SourcesSidebar } from "@/components/sources-sidebar";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";

const schema = z.object({
  text: z
    .string()
    .min(1, { message: "Vul een vraag in" })
    .refine((text) => text.length < 100, { message: "Vraag is te lang" }),
});

const handleNewChat = () => {
  // refresh the page
  window.location.reload();
} 

// Define interfaces for chat messages
interface Message {
  role: 'user' | 'assistant';
  content: string;
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
        
        // Clear input
        setText("");
        setValidationText(""); 
        
        // Open sidebar to show sources
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

  // Main content component that changes based on chat state
  const MainContent = () => {
    if (!chatStarted) {
      // Initial landing view
      return (
        <div className="flex flex-col items-center justify-center h-fit relative ">
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold text-center pb-5">
              Vraag het aan jouw digitale jurist
            </h1>
            <p className="text-center pb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At totam
              necessitatibus, autem, id consectetur ea et cumque debitis quasi animi
              repellendus possimus aspernatur ut perferendis neque voluptatum iure sunt
              earum.
            </p>
          </div>
        </div>
      );
    } else {
      // Chat view
      return (
        <div className="flex flex-col h-full pt-10">
          {/* Chat messages */}
          {/* New chat button, just a refresh button */}
          <div className="flex justify-start pl-4">
            <Button onClick={handleNewChat} variant="outline">
              <SquarePen strokeWidth={2.5} className="font-bold"/>New Chat
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`mb-4 p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-gray-100 ml-auto max-w-[80%]' 
                    : 'bg-primary text-white mr-auto max-w-[80%]'
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>
        </div>
      );
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
          <MainContent />
          
          {/* Input area always at the bottom */}
          <div className={cn("p-4 w-full flex justify-center", isOpen ? "border-t" : "border-t-0")}>
            <Textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Stel een vraag over de AVG, Woo of archiefwet"
              className={cn("transition-all duration-300", isOpen ? "w-full" : "max-w-3xl")}
            />
            {validationText && (
              <ValidationText 
                className="text-center pt-2" 
                text={validationText} 
                mood="error" 
                size="small" 
              />
            )}
            
          </div>
           
        </div>
        <p className="text-xs text-center mt-2 pb-3">
              <strong>Jouw digitale jurist</strong> kan fouten maken, het is belangrijk
              om antwoorden te controleren
            </p>
      </div>
      
      {/* Sidebar component */}
      <SourcesSidebar />
    </div>
  );
}