'use client'

import { Button, Menu, MenuButton, MenuItem, MenuList, Text, Heading, Box, BoxProps, VStack } from "@chakra-ui/react";
import { FC, useState } from "react";
import { ArrowDownIcon } from "../icons";
import { BetterOmit } from "@/utils/BetterOmmit";

export type CustomMenuListProps = BetterOmit<BoxProps,'children'> & {
    itemList: string[];
    tagline: string;
    heading?: string;
    onSelected?: (item: string) => void;
}

export const CustomMenuList:FC<CustomMenuListProps> = ({...props}) => {
    const [selectedItem, setSelectedItem] = useState(props.itemList[0])
    const handleMenuItemClick = (item: string) => {
        setSelectedItem(item)
        if(props.onSelected){
            props.onSelected(item)
        }
    }
    return (
        <Box  {...props}>
            <VStack alignItems='flex-start'>
                <Menu matchWidth={true}>
                    <Heading size='md'>{props.heading}</Heading>
                    <MenuButton bg='#FFFFFF' as={Button} rightIcon={<ArrowDownIcon />} w='full' textAlign='left'>
                        {selectedItem}
                    </MenuButton>
                    <MenuList>
                        {props.itemList.map((item, index) => (
                            <MenuItem key={index} onClick={() => handleMenuItemClick(item)}>{item}</MenuItem>
                        ))}
                    </MenuList>
                </Menu>
                <Text color={'brand.300'} as='i'>{props.tagline}</Text>
            </VStack>
        </Box>
    )
}