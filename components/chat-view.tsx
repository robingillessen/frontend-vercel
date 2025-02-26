import React from 'react'
import { Button } from './ui/button'
import { SquarePen } from 'lucide-react'
import { Message } from '@/lib/types'

interface ChatViewProps {
  messages: Message[];
  handleNewChat: () => void;
}

export const ChatView = ({ messages, handleNewChat }: ChatViewProps) => {
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
              : 'bg-white text-black mr-auto max-w-[80%]'
          }`}
        >
          {message.content}
        </div>
      ))}
    </div>
  </div>
  )
}

