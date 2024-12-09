"use client";

import { useChat } from "ai/react";
import { ChatInput, ChatMessages } from "./ui/chat";
import { useClientConfig } from "./ui/chat/hooks/use-config";
import ChatGenImage from "@/components/ui/chat/chat-message/chat-genimage";
import {AutismPreChat} from "@/components/ui/chat/chat-message/Autism-pre-chat";

export default function ChatSection() {
  const { backend } = useClientConfig();
  const {
    messages,
    input,
    isLoading,
    handleSubmit,
    handleInputChange,
    reload,
    stop,
    append,
    setInput,
  } = useChat({
    api: `${backend}/api/chat`,
    headers: {
      "Content-Type": "application/json", // using JSON because of vercel/ai 2.2.26
    },
    onError: (error: unknown) => {
      if (!(error instanceof Error)) throw error;
      try {
        const message = JSON.parse(error.message);
        alert(message.detail);
      } catch (e){
        console.error(e)
      }
    },
  });

  return (
      <div className="flex w-full h-full">
        <div className="flex-grow space-y-4 flex flex-col">
          <ChatMessages
            messages={messages}
            isLoading={isLoading}
            reload={reload}
            stop={stop}
            append={append}
          />
          <ChatInput
            input={input}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
            isLoading={isLoading}
            messages={messages}
            append={append}
            setInput={setInput}
          />
        </div>
        <AutismPreChat append={append}/>
      </div>
  );
}
