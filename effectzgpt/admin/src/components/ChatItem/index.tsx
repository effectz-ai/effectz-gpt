import { BetterOmit } from "@/utils/BetterOmmit";
import { Box, BoxProps, HStack, IconButton, Text } from "@chakra-ui/react";
import { FC } from "react";
import { EffectzIcon, RepeatIcon, UserIcon } from "../icons";

export type ChatItemProps = BetterOmit<BoxProps, 'children'> & {
    message: string;
    isUser?: boolean;
};

export const ChatItem:FC<ChatItemProps> = ({message,isUser,...rest}) => {
    return (
        <Box {...rest}>
                {isUser && (
                    <HStack>
                        <IconButton
                            aria-label=""
                            icon={<UserIcon />}
                        />
                        <Text>{message}</Text>
                    </HStack>
                    
                )}
                {!isUser && (
                    <HStack>
                        <IconButton
                            aria-label=""
                            icon={<EffectzIcon />}
                        />
                        <Text>{message}</Text>
                    </HStack>
                    
                )}
        </Box>
    )
}