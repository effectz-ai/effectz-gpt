import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import Image from "next/image";

type chatGenImageProps = {
    url?: string;
}
// testUrl = "https://placehold.co/600x400/png"

export default function ChatGenImage({url= "https://placehold.co/600x400/png"}:chatGenImageProps) {
    return (
        <div className="w-[300px] overflow-hidden rounded-md">
            <AspectRatio.Root ratio={1} asChild={true}>
                <Image
                    className="object-cover w-full h-full"
                    src={url}
                    alt="gen image"
                    width={100}
                    height={100}
                />
            </AspectRatio.Root>

        </div>
    )
}