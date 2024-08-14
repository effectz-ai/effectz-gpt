import { BetterOmit } from "@/utils/BetterOmmit";
import { Box, BoxProps, Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { FC } from "react";

export type AdditionalApiKeyProps = BetterOmit<BoxProps, 'children'>

export const AdditionalApiKeys:FC<AdditionalApiKeyProps> = ({...rest}) => {
    return(
        <Box {...rest} bg='brand.100' p={6} rounded={10} >
            <Heading size='md' mb={4}>Additional API Keys</Heading>
            <hr />
            <VStack alignItems='flex-start'>
                <Container maxW='full' my={4}>
                    <Box my={2}>
                        <Heading size='sm' mb={1}>Cohere API Key</Heading>
                        <Input 
                            placeholder='Paste API Key'
                            bg='#FFFFFF'
                            rounded={10}
                        />
                    </Box>
                    <Box my={2}>
                        <Heading size='sm' mb={1}>Lalamaparse API Key</Heading>
                        <Input 
                            placeholder='Paste API Key'
                            bg='#FFFFFF'
                            rounded={10}
                        />
                    </Box>
                    <Button bg='brand.200' color='#FFFFFF' w='full' rounded='full'>Update</Button>
                </Container>
            </VStack>
        </Box>
    )
}