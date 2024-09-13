import { BetterOmit } from "@/utils/BetterOmmit";
import { Icon, IconProps } from "@chakra-ui/react";
import { FC } from "react";

export type ArrowDownIconProps = BetterOmit<IconProps, 'children' | 'color'> & {
    color?: string
}

export const ArrowDownIcon:FC<ArrowDownIconProps> = ({color,...rest}) => (
    <Icon {...rest}>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill={color}>
                <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
        </svg>
    </Icon>
)