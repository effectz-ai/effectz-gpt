'use client'

import { BetterOmit } from "@/utils/BetterOmmit";
import { Box, BoxProps, Button, Container, Heading, Text, Textarea, VStack } from "@chakra-ui/react";
import { FC, useState } from "react";

export type RagConfigFormProps = BetterOmit<BoxProps, 'children'> & {
    onInputChange?:(input:string) => void
}

export const RagConfigForm:FC<RagConfigFormProps> = ({onInputChange,...rest}) => {
    const [value, setValue] = useState('');
    const handleInputChange = (e:any) => {
        const inputValue = e.target.value
        setValue(inputValue)
        if(onInputChange){
            onInputChange(inputValue)
        }
    }
    return(
        <Box {...rest}>
            <Container maxW='full'>
                <VStack alignItems='flex-start'>
                    <Heading size='md'>Custom prompt</Heading>
                    <Textarea
                        value={value}
                        onChange={handleInputChange}
                        placeholder="Enter Your Prompt"
                        bg='#FFFFFF'
                     />
                    <Text color='brand.300'>Use system prompt to define the responsibilities and behaviors of the assistant.</Text>
                    <Button 
                        bg='brand.200' 
                        color='#FFFFFF' 
                        w='full'
                        rounded='full'
                        onClick={handleInputChange}
                        >Update</Button>
                </VStack>

            </Container>
        </Box>
    )
}