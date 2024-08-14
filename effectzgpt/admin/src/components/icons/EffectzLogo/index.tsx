import { BetterOmit } from "@/utils/BetterOmmit";
import { Icon, IconProps } from "@chakra-ui/react";
import { FC } from "react";

export type EffectzIconProps = BetterOmit<IconProps,'children' | 'color'> & {
    color?: string;
}

export const EffectzIcon:FC<EffectzIconProps> = ({color,...rest}) => (
    <Icon {...rest}>
        <svg 
            viewBox="0 0 302 302" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlnsXlink="http://www.w3.org/1999/xlink">
            <rect width="302" height="302" fill="url(#pattern0)"/>
            <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                <use xlinkHref="#image0_246_242" transform="scale(0.00222222)"/>
            </pattern>
            <image id="image0_246_242" width="450" height="450" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcIAAAHCCAYAAAB8GMlFAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF92lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDggNzkuMTY0MDM2LCAyMDE5LzA4LzEzLTAxOjA2OjU3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMjMtMTAtMzFUMDg6NDY6MDErMDI6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIzLTEwLTMxVDA4OjQ3OjAyKzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzLTEwLTMxVDA4OjQ3OjAyKzAyOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9InNSR0IgSUVDNjE5NjYtMi4xIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmFkMjFhZmUwLTg5M2EtNDFlOS04OWZkLTc5N2FiN2NkYjRhZCIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmFiMGJkYzc2LTcyM2ItZDc0Ny1hNDU1LWU3MDcxMjMyMDE4OCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjUxNDEzNTU1LTVkN2UtNDAwNC1hZTY5LTZmZmM5Mjc1NjI2ZCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTE0MTM1NTUtNWQ3ZS00MDA0LWFlNjktNmZmYzkyNzU2MjZkIiBzdEV2dDp3aGVuPSIyMDIzLTEwLTMxVDA4OjQ2OjAxKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YWQyMWFmZTAtODkzYS00MWU5LTg5ZmQtNzk3YWI3Y2RiNGFkIiBzdEV2dDp3aGVuPSIyMDIzLTEwLTMxVDA4OjQ3OjAyKzAyOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMCAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6FGnHOAAASi0lEQVR42u3daY4byRGAUaY88Dl0BN3/FHOEuYYNWOk/liH0cKkll4jM9wADxrSaXSyS+VUUtz9qrQ8A2NUfdgEAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggAQggA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"/>
            </defs>
        </svg>

    </Icon>
)