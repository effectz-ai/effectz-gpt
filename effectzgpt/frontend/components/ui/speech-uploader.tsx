
import React, { useState, useEffect, useCallback } from 'react';
import { Mic, Pause } from 'lucide-react';
import { buttonVariants } from "./button";
import { cn } from "./lib/utils";

export interface SpeechUploaderProps {
    onTranscript: (transcribedText: string) => void;
    onError?: (errMsg: string) => void;
    disabled?: boolean;
}

export default function SpeechUploader({ onTranscript, onError, disabled = false }: SpeechUploaderProps) {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;

            recognitionInstance.onresult = (event) => {
                let currentTranscript = '';
                for (let i = 0; i < event.results.length; i++) {
                    currentTranscript += event.results[i][0].transcript;
                }
                setTranscript(currentTranscript);
            };

            recognitionInstance.onerror = (event) => {
                onError?.(event.error);
                setListening(false);
            };

            setRecognition(recognitionInstance);
        } else {
            onError?.("Browser does not support speech recognition.");
        }

        return () => {
            if (recognition) {
                recognition.stop();
            }
        };
    }, [onError]);

    const startListening = useCallback(() => {
        if (!disabled && recognition && !listening) {
            setListening(true);
            setTranscript('');
            recognition.start();
        }
    }, [disabled, recognition, listening]);

    const stopListening = useCallback(() => {
        if (recognition && listening) {
            setListening(false);
            recognition.stop();
            onTranscript(transcript);
        }
    }, [recognition, listening, onTranscript, transcript]);

    if (!recognition) {
        return <p>Your browser does not support speech recognition.</p>;
    }

    return (
        <div className="self-stretch">
            <button
                onClick={listening ? stopListening : startListening}
                disabled={disabled}
                className={cn(
                    buttonVariants({ variant: "secondary", size: "icon" }),
                    "cursor-pointer",
                    listening && "opacity-50"
                )}
            >
                {listening ? (
                    <Pause className="w-4 h-4" />
                ) : (
                    <Mic className="w-4 h-4" />
                )}
            </button>
        </div>
    );
}