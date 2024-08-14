import { BetterOmit } from "@/utils/BetterOmmit";
import { Box, BoxProps, HStack, IconButton, Input } from "@chakra-ui/react";
import { FC } from "react";
import { AttachmentIcon, SendIcon } from "../icons";

export type ChatInputProps = BetterOmit<BoxProps, 'children'> ;

export const ChatInput:FC<ChatInputProps> = ({...rest}) => {
    return (
        <Box {...rest} py={4}>
            <HStack>
                <IconButton
                    aria-label="Attach File"
                    icon={<AttachmentIcon />}
                />
                <Input
                    placeholder="Type a message"

                />
                <IconButton
                    aria-label="Send Message"
                    icon={<SendIcon />} 
                />
            </HStack>
        </Box>
    )
}