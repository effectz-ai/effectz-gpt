import { BetterOmit } from "@/utils/BetterOmmit";
import { Icon, IconProps } from "@chakra-ui/react";
import { FC } from "react";

export type UserIconProps = BetterOmit<IconProps,'children' | 'color'> & {
    color?: string;
}

export const UserIcon:FC<UserIconProps> = ({color,...rest}) => (
    <Icon {...rest}>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill={color}>
            <path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" />
        </svg>
    </Icon>
)