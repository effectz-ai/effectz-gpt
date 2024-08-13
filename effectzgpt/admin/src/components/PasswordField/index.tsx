'use client'

import { BetterOmit } from "@/utils/BetterOmmit"
import { Box, BoxProps, Heading, Input, InputGroup, InputRightElement, Text, useClipboard, VStack } from "@chakra-ui/react"
import { FC, useState } from "react";
import { EyeIcon, EyeOffIcon } from "../icons";
import { CopyIcon } from "../icons/CopyIcon";

export type PasswordFieldProps = BetterOmit<BoxProps, 'children'> & {
    tagline?: string
    heading?: string
};

export const PasswordField:FC<PasswordFieldProps> = ({...rest}) => {
    const [show, setShow] = useState(false);
    const {onCopy, value, setValue, hasCopied} = useClipboard('');
    const handleClick = () => setShow(!show)
    return(
        <Box {...rest}>
            <VStack alignItems='flex-start'>
                <Heading size='md'>{rest.heading}</Heading>
                <InputGroup>
                    <Input 
                        type={show ? 'text' : 'password'}
                        value={value}
                        placeholder='API Key'
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <InputRightElement>
                        {
                            show ? <EyeOffIcon onClick={handleClick} /> : <EyeIcon onClick={handleClick} />
                        }
                        {
                            hasCopied ? <CopyIcon color='green' /> : <CopyIcon onClick={onCopy} />
                        }
                    </InputRightElement>
                </InputGroup>
                <Text color='brand.300' as='i'> {rest.tagline} </Text>
            </VStack>
        </Box>
    )
}
