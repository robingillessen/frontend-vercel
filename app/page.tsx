"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { z } from "zod";
import ValidationText from "@/components/validation-text";

const schema = z.object({
  text: z.string().min(1, { message: "Vul een vraag in" }),
});

export default function Home() {
  const [text, setText] = useState("");
  const [validationText, setValidationText] = useState("");
  

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents default newline insertion, if that's desired
      try {
        const result = schema.safeParse({ text });
        if (result.success) {
          console.log("Enter pressed with text:", text);
          setText("");
          // Add your custom logic here, for example, sending a message.
        } else {
          console.error("Validation error:", result.error);
          setValidationText('Er is een fout opgetreden');
        }
      } catch (error) {
        console.error("Validation error:", error);
        setValidationText("Er is een fout opgetreden");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <Image
        className="absolute top-0 w-1/2 left-0 translate-x-1/2 object-cover"
        src="/logo-compact-blauw.svg"
        alt="Logo Rijksoverheid"
        width={500}
        height={500}
      />
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
        {/* Pass the onKeyDown event to the Textarea component */}
        <Textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {validationText && (
          <ValidationText className="text-center pt-2" text={validationText} mood="error" size="small" />
        )}
      </div>
      <p className="text-xs absolute bottom-0 left-0 right-0 text-center pb-4">
        <strong>Jouw digitale jurist</strong> kan fouten maken, het is belangrijk
        om antwoorden te controleren
      </p>
    </div>
  );
}