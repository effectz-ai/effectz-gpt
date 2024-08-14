'use client'

import { BetterOmit } from "@/utils/BetterOmmit";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, BoxProps, Button, Heading } from "@chakra-ui/react";
import { FC, useState } from "react";
import { FileUpload } from "../FileUpload";

export type KnowlegeUploadProps = BetterOmit<BoxProps, 'children'>;

export const KnowlegeUpload:FC<KnowlegeUploadProps> = ({...rest}) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (selectedFile: File | null) => {
        setFile(selectedFile);
    };

    const handleSubmit = () => {
    if (file) {
      // TODO:Handle the file upload logic here
      console.log("File to upload:", file);
    }
  };
    return (
        <Box {...rest} bg='brand.100' boxShadow='0 0 6px 0' rounded={10} p={4}>
            <Accordion allowToggle rounded={10}>
                <AccordionItem>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                            <Heading size='md'>RAG Config</Heading>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                    <hr />
                    <AccordionPanel>
                    <FileUpload file={file} onUpload={handleFileChange} />
                    <Button 
                        onClick={handleSubmit}
                        bg='brand.200'
                        color='#FFFFFF'
                        w='full'
                        rounded='full'
                    >Submit</Button>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    )
}