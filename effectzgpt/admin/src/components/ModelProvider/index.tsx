'use client'

import { BetterOmit } from "@/utils/BetterOmmit";
import { Box, BoxProps, Heading, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { CustomMenuList } from "../Menu";
import { PasswordField } from "../PasswordField";

export type ModelProviderProps = BetterOmit<BoxProps, 'children'>;

export const ModelProvider:FC<ModelProviderProps> = ({...rest}) => {
    return(
        <Box {...rest} bg='brand.100' rounded={10}>
            <VStack alignItems='flex-start' w='full'>
                <CustomMenuList w='full' my={2} itemList={["Open AI", 'iollama']} heading="Model Provider" tagline="Select a model provider to chat with. If you're not sure, leave it as Default. "/>
                <PasswordField w='full' my={2} heading="openAI API Key (*)" tagline="Get your API key from https://platform.openai.com/api-keys"/>
                <CustomMenuList w='full' my={2} itemList={["gpt-3.5-turbo", 'gpt-4', 'gpt-4']} heading="Model" tagline="Select a model to chat with. If you're not sure, leave it as Default. "/>
            </VStack>
        </Box>
    )
}