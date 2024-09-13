import { BetterOmit } from "@/utils/BetterOmmit";
import { Box, BoxProps, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { ChatItem } from "../ChatItem";

type Message = {
    id: number;
    message: string;
    isUser?: boolean;
}
export type ChatListProps = BetterOmit<BoxProps, 'children'> & {
    messages: Message[];
} ;

export const ChatList:FC<ChatListProps> = ({messages,...rest}) => {
    return (
        <Box {...rest}>
            <VStack alignItems='flex-start' maxH='80vh' overflowY='scroll'>
                {
                    messages.map((message) => (
                        <ChatItem p={2} key={message.id} message={message.message} isUser={message.isUser} />
                    ))
                }
            </VStack>
        </Box>
    )
}