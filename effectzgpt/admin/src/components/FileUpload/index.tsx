'use client';

import { BetterOmit } from "@/utils/BetterOmmit";
import { Box, BoxProps, Button, Input, Tag, TagCloseButton, TagLabel, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { FC, useRef } from "react";

export type FileUploadProps = BetterOmit<BoxProps, 'children'> & {
    onUpload: (file:File | null) => void;
    file: File | null;
}

export const FileUpload:FC<FileUploadProps> = ({file,onUpload,...rest}) => {
    const fileUploadRef = useRef<HTMLInputElement>(null);
    return (
        <Box {...rest}>
            <Input
                type='file'
                ref={fileUploadRef}
                display='none'
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                    if(e.target.files && e.target.files.length > 0) {
                        const selectedFile = e.target.files[0];
                        onUpload(selectedFile);
                }}}
                accept='application/pdf'
            />
            {file ? (
                <Wrap 
                    m={2}
                >
                <WrapItem 
                    key={file.name}
                    rounded={10}
                >
                    <Tag>
                        <TagLabel>{file.name}</TagLabel>
                        <TagCloseButton onClick={() => onUpload(null)} />
                    </Tag>
                </WrapItem>
            </Wrap>
            ):(
                <Button
                    onClick={() => fileUploadRef.current?.click()}
                    m={2}
                    bg='#FFFFFF'
                    size='sm'
                    rounded='full'
                >Select File...</Button>
            )}        
        </Box>
    )
}