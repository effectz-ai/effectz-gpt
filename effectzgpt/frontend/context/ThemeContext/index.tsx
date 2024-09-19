'use client'

import { theme } from "@/theme/theme"
import { BetterOmit } from "@/utils/BetterOmmit"
import { ChakraProvider, ChakraProviderProps } from "@chakra-ui/react"
import { FC } from "react"

export type ThemeContextProps = BetterOmit<ChakraProviderProps,'theme'>

export const ThemeContext:FC<ThemeContextProps> = ({children, ...rest}) => (
    <ChakraProvider theme={theme} {...rest} portalZIndex={1000}>
        {children}
    </ChakraProvider>
)