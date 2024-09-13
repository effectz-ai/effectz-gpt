'use client'

import { BetterOmit } from "@/utils/BetterOmmit";
import { Box, BoxProps, Button, Heading, Text, VStack } from "@chakra-ui/react";
import axios from 'axios'
import { FC, useState } from "react";
import { CustomMenuList } from "../Menu";
import { PasswordField } from "../PasswordField";

export type ModelProviderProps = BetterOmit<BoxProps, 'children'>;

export const ModelProvider:FC<ModelProviderProps> = ({...rest}) => {
    const [selectedProvider, setSelectedProvider] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [selectedModal, setSelectedModal] = useState('');

    const handleProviderSelect = (value: string) => {
        setSelectedProvider(value);
        console.log("Selected provider:", value);
    }
    const handleModelSelect = (value: string) => {
        setSelectedModal(value);
        console.log("Selected provider:", value);
    }
    const handleApiKeyChange = (value: string) => {
        setApiKey(value);
        console.log("API Key:", value);
    }

    const updateData = async () => {
        //TODO: Implement API call to update the data
        const payload = {
            provider: selectedProvider,
            apiKey: apiKey,
            model: selectedModal
        };

        try {
            const response = await axios.post('/api/effectzai-endpoint', payload); // Update the endpoint
            console.log('API response:', response.data);
        } catch (error) {
            console.error('Failed to send data to the API:', error);
            if (axios.isAxiosError(error)) {
                console.error('Axios error message:', error.message);
            } else {
                console.error('Error:', error);
            }
        }
    }
    return(
        <Box {...rest} bg='brand.100' rounded={10} p={6}>
            <VStack alignItems='flex-start' w='full'>
                <CustomMenuList 
                    w='full' my={2} 
                    itemList={["Open AI", 'iollama']} 
                    onSelected={handleProviderSelect}
                    heading="Model Provider" 
                    tagline="Select a model provider to chat with. If you're not sure, leave it as Default. "/>
                <PasswordField 
                    w='full' 
                    my={2}
                    onApiKeyChange={handleApiKeyChange} 
                    heading="openAI API Key (*)" 
                    tagline="Get your API key from https://platform.openai.com/api-keys"/>
                <CustomMenuList 
                    w='full' my={2} 
                    itemList={["gpt-3.5-turbo", 'gpt-4', 'gpt-4o']} 
                    onSelected={handleModelSelect}
                    heading="Model" 
                    tagline="Select a model to chat with. If you're not sure, leave it as Default. "/>
                <Button 
                    bg='brand.200' 
                    color='#ffffff' 
                    onClick={updateData}
                    w='full'
                    rounded='full'
                    >Update</Button>
            </VStack>
        </Box>
    )
}