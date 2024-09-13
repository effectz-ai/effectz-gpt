import { BetterOmit } from "@/utils/BetterOmmit";
import { Icon, IconProps } from "@chakra-ui/react";
import { FC } from "react";

export type AttachmentIconProps = BetterOmit<IconProps,'children' | 'color'> & {
    color?: string;
}

export const AttachmentIcon:FC<AttachmentIconProps> = ({color,...rest}) => (
    <Icon {...rest}>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill={color}>
            <path d="M14 13.5V8C14 5.79086 12.2091 4 10 4C7.79086 4 6 5.79086 6 8V13.5C6 17.0899 8.91015 20 12.5 20C16.0899 20 19 17.0899 19 13.5V4H21V13.5C21 18.1944 17.1944 22 12.5 22C7.80558 22 4 18.1944 4 13.5V8C4 4.68629 6.68629 2 10 2C13.3137 2 16 4.68629 16 8V13.5C16 15.433 14.433 17 12.5 17C10.567 17 9 15.433 9 13.5V8H11V13.5C11 14.3284 11.6716 15 12.5 15C13.3284 15 14 14.3284 14 13.5Z" />
        </svg>
    </Icon>
)