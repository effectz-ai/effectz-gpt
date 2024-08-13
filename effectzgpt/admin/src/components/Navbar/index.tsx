import { Box, BoxProps, Flex, Heading, HStack, Spacer} from "@chakra-ui/react";
import React, { FC } from "react";
import { HomeIcon, NotificationIcon } from "../icons";

export type NavbarProps = BoxProps

export const NavBar:FC<NavbarProps> = ({...props} : NavbarProps) => {
    return (
            <Box {...props} bg={'brand.200'} p={6}>
                <Flex>
                    <Box color={'brand.100'}>
                        <Heading size="lg">Configure the AI Model</Heading>
                    </Box>
                    <Spacer/>
                    <Box>
                        <HStack>
                            <HomeIcon width={35} height={35} color='#FFFFFF'/>
                            <NotificationIcon width={35} height={35} color='#FFFFFF'/>
                        </HStack>
                    </Box>
                </Flex>
            </Box>
    
)}
