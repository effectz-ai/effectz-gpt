import { Minus } from 'lucide-react';
import { ChatInput, ChatMessages } from "./ui/chat";
import { useChat } from "ai/react";
import { useClientConfig } from "./ui/chat/hooks/use-config";

interface ChatUIProps {
    onClose: () => void
}

export default function ChatPopUp({ onClose }: ChatUIProps) {
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
            } catch (e) {
                console.error(e)
            }
        },
    });

    return (
        <div className="absolute bottom-4 right-4 w-80 h-96 bg-white border rounded-xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center p-2 border-b">
                <h3 className="font-semibold">Chat</h3>
                <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
                    <Minus size={18} />
                </button>
            </div>
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
    )
}

