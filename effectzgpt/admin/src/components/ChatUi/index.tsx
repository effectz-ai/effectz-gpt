'use client'

import { Box } from "@chakra-ui/react"
import { ChatHeader } from "../ChatHeader"
import { ChatList } from "../ChatList"
import { ChatInput } from "../ChatInput"
import { useState } from "react"

export const ChatUi = () => {
    const [messages, setMessages] = useState([
        { id: 1, message: "What is GenAI? Give a small paragraph", isUser: true },
        { id: 2, message: "Generative AI (genAI) refers to a category of artificial intelligence...", isUser: false },
        { id: 3, message: "What is the difference between GPT-3 and GPT-4?", isUser: true },
        { id: 4, message: "GPT-3 is the third iteration of the Generative Pre-trained Transformer...", isUser: false },
        { id: 5, message: "What is the difference between GPT-3 and GPT-4?", isUser: true },
        { id: 6, message: "GPT-3 is the third iteration of the Generative Pre-trained Transformer...", isUser: false },
        { id: 7, message: "What is the difference between GPT-3 and GPT-4?", isUser: true },
        { id: 1, message: "What is GenAI? Give a small paragraph", isUser: true },
        { id: 2, message: "Generative AI (genAI) refers to a category of artificial intelligence...", isUser: false },
        { id: 3, message: "What is the difference between GPT-3 and GPT-4?", isUser: true },
        { id: 4, message: "GPT-3 is the third iteration of the Generative Pre-trained Transformer...", isUser: false },
        { id: 5, message: "What is the difference between GPT-3 and GPT-4?", isUser: true },
        { id: 6, message: "GPT-3 is the third iteration of the Generative Pre-trained Transformer...", isUser: false },
        { id: 7, message: "What is the difference between GPT-3 and GPT-4?", isUser: true },
        { id: 1, message: "What is GenAI? Give a small paragraph", isUser: true },
        { id: 2, message: "Generative AI (genAI) refers to a category of artificial intelligence...", isUser: false },
        { id: 3, message: "What is the difference between GPT-3 and GPT-4?", isUser: true },
        { id: 4, message: "GPT-3 is the third iteration of the Generative Pre-trained Transformer...", isUser: false },
        { id: 5, message: "What is the difference between GPT-3 and GPT-4?", isUser: true },
        { id: 6, message: "GPT-3 is the third iteration of the Generative Pre-trained Transformer...", isUser: false },
        { id: 7, message: "What is the difference between GPT-3 and GPT-4?", isUser: true },
      ]);
    
      const handleSendMessage = (message: string) => {
        const newMessage = {
          id: messages.length + 1,
          message: message,
          isUser: true,
        };
        setMessages([...messages, newMessage]);
      };
    return (
            <Box p={6}>
                <ChatHeader />
                <ChatList messages={messages}/>
                <ChatInput />
            </Box>
    )
}