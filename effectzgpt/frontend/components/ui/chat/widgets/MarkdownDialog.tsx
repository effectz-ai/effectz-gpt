import {Button} from "../../button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../../drawer";
import React, {useEffect, useState} from "react";
import Markdown from "@/components/ui/chat/chat-message/markdown";



export interface MarkdownDialogProps {
    url: string;
    trigger: React.ReactNode;
}

export default function MarkdownDialog(props : Readonly<MarkdownDialogProps>) {
    const [mdContent,setMdConten] = useState<string>("")
    const [error,setError] = useState<string>("")
    //TODO : create a proper markdown viewer

    const handleDownload = () => {
        const blob = new Blob([mdContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'result.md';
        a.click();
        URL.revokeObjectURL(url);
    };

    async function fetchMarkdownFile(url :string) : Promise<string> {
        try {
            const response = await fetch(props.url); // Fetch the file from the URL
            if (response.ok) {
                 // Read the content as text
                return await response.text();
            } else {
                console.error("Error fetching markdown file:");
                setError("Error fetching markdown file:")
            }
        } catch (error) {
            console.error("Error fetching markdown file:", error);
            setError(`Error fetching markdown file: ${error}`)
        }
        return "";
    }

    useEffect(()=> {
        fetchMarkdownFile(props.url).then((md=> setMdConten(md)))
        }
    )

    return (
        <Drawer direction="left">
            <DrawerTrigger>{props.trigger}</DrawerTrigger>
            <DrawerContent className="w-3/5 mt-24 h-full max-h-[96%] ">
                <DrawerHeader className="flex justify-between">
                    <div className="space-y-2">
                        <DrawerTitle>PDF Content</DrawerTitle>
                        <DrawerDescription>
                            File URL:{" "}
                            <a
                                className="hover:text-blue-900"
                                href={props.url}
                                target="_blank"
                            >
                                {props.url}
                            </a>
                        </DrawerDescription>
                    </div>
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerHeader>
                <div className="m-4">
                    {mdContent?? <Markdown content={mdContent}/>}
                    {error ? <p className="text-gray-500">error</p> : null}
                </div>
                {mdContent && (
                    <button
                        onClick={handleDownload}
                        className="px-4 py-2 bg-green-900 text-white rounded hover:bg-green-600 transition-colors"
                    >
                        Download Markdown
                    </button>
                )}
            </DrawerContent>
        </Drawer>
    );
}
