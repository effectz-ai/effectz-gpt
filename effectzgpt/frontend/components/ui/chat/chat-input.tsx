
import { JSONValue } from "ai";
import { Button } from "../button";
import { DocumentPreview } from "../document-preview";
import FileUploader from "../file-uploader";
import { Input } from "../input";
import UploadImagePreview from "../upload-image-preview";
import { ChatHandler } from "./chat.interface";
import { useFile } from "./hooks/use-file";
import SpeechUploader from "@/components/ui/speech-uploader";
import {useEffect, useState} from "react";

const ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "csv", "pdf", "txt", "docx"];

export default function ChatInput(
  props: Pick<
    ChatHandler,
    | "isLoading"
    | "input"
    | "onFileUpload"
    | "onFileError"
    | "handleSubmit"
    | "handleInputChange"
    | "messages"
    | "setInput"
    | "append"
  > & {
    requestParams?: any;
  },
) {
  const [transcript, setTranscript] = useState("");
  const {
    imageUrl,
    setImageUrl,
    uploadFile,
    files,
    removeDoc,
    reset,
    getAnnotations,
  } = useFile();

  useEffect(() => {
    if (transcript) {
      // @ts-ignore
      props.setInput!((prevInput:string) => prevInput + ' ' + transcript);
      setTranscript('');
    }
  }, [transcript, props.setInput]);

  // default submit function does not handle including annotations in the message
  // so we need to use append function to submit new message with annotations
  const handleSubmitWithAnnotations = (
    e: React.FormEvent<HTMLFormElement>,
    annotations: JSONValue[] | undefined,
  ) => {
    e.preventDefault();
    props.append!({
      content: props.input,
      role: "user",
      createdAt: new Date(),
      annotations,
    });
    props.setInput!("");
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const annotations = getAnnotations();
    if (annotations.length) {
      handleSubmitWithAnnotations(e, annotations);
      return reset();
    }
    props.handleSubmit(e);
  };

  const handleUploadFile = async (file: File) => {
    if (imageUrl || files.length > 0) {
      alert("You can only upload one file at a time.");
      return;
    }
    try {
      await uploadFile(file, props.requestParams);
      props.onFileUpload?.(file);
    } catch (error: any) {
      props.onFileError?.(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl bg-white p-4 shadow-xl space-y-4 shrink-0"
    >
      {imageUrl && (
        <UploadImagePreview url={imageUrl} onRemove={() => setImageUrl(null)} />
      )}
      {files.length > 0 && (
        <div className="flex gap-4 w-full overflow-auto py-2">
          {files.map((file) => (
            <DocumentPreview
              key={file.id}
              file={file}
              onRemove={() => removeDoc(file)}
            />
          ))}
        </div>
      )}
      <div className="flex w-full items-start justify-between gap-4 ">
        <Input
            autoFocus
            name="message"
            placeholder="Type a message"
            className="flex-1"
            value={props.input}
            onChange={props.handleInputChange}
        />
        <FileUploader
            onFileUpload={handleUploadFile}
            onFileError={props.onFileError}
            config={{
              allowedExtensions: ALLOWED_EXTENSIONS,
              disabled: props.isLoading,
            }}
        />
        <SpeechUploader
            onTranscript={(text) => setTranscript(text)}
            onError={(errMsg) => console.error(errMsg)}
        />
        <Button type="submit" disabled={props.isLoading || !props.input.trim()}>
          Send message
        </Button>
      </div>
    </form>
  );
}
