import { cn } from '@/lib/utils'
import { WandSparkles } from 'lucide-react'
import React from 'react'
import { Textarea } from './ui/textarea'
import ValidationText from './validation-text'

interface ChatInputProps {
  text: string;
  setText: (text: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isOpen: boolean;
  validationText: string;
}

export const ChatInput = ({ text, setText, handleKeyDown, isOpen, validationText }: ChatInputProps) => {
  return (
    <div className="relative w-full flex items-center justify-center flex-col">
    <div className={cn("w-full relative h-fit", { "max-w-3xl": !isOpen })}>
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Stel een vraag over de AVG, Woo of archiefwet"
        className={cn("transition-all duration-300 relative pr-16", isOpen ? "w-full" : "max-w-3xl")}
      />
      <WandSparkles className="ml-4 absolute top-1/2 right-12 -translate-y-1/2" />
    </div>
    {validationText && (
    <ValidationText 
      className="text-center pt-2" 
      text={validationText} 
      mood="error" 
      size="small" 
    />
  )}
  </div>
  )
}

