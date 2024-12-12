import { MessageCircle } from 'lucide-react';

interface ChatButtonProps {
    onClick: () => void
}

export default function ChatButton({ onClick }: ChatButtonProps) {
    return (
        <button
            onClick={onClick}
            className="rounded-full p-3 bg-green-900 text-white hover:bg-green-600"
        >
            <MessageCircle size={24} />
        </button>
    )
}

