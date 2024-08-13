'use client'

import { BetterOmit } from "@/utils/BetterOmmit";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, BoxProps, Divider, Heading, Text } from "@chakra-ui/react";
import { RagConfigForm } from "../RagConfigForm";
import { useState } from "react";

export type RagConfigProps = BetterOmit<BoxProps, 'children'>;

export const RagConfig = (props: RagConfigProps) => {
    const [inputUpdate, setInputUpdate] = useState('');

    const handleInput = (value: string) => {
        setInputUpdate(value);
    }
    return (
        <Box {...props} bg='brand.100' rounded={10} p={6} boxShadow={"0 0 6px 0"}>
            <Accordion allowToggle>
                <AccordionItem>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                            <Heading size='md'>RAG Config</Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <hr color='#00000025' />
                    <AccordionPanel bg='brand.100'>
                        <Text color='brand.300'>Modify RAG parameters to improve the AI’s performance.</Text>
                        <RagConfigForm onInputChange={handleInput} />
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    )
}