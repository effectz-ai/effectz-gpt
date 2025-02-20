import { getBaseURL } from "./utils";

export type FileStatus = "toUpload" | "uploaded" | "failed" | "toRemove";

export type File = {
  name: string;
  status: FileStatus;
  type: string;
  parent: string;
  blob?: Blob;
};

export type FolderStructure = {
  folders: string[];
  files: File[];
};

export async function fetchFiles(): Promise<FolderStructure> {
  const res = await fetch(`${getBaseURL()}/api/management/files`);
  if (!res.ok) {
    throw new Error("Failed to fetch files");
  }
  return res.json();
}

export async function uploadFile(formData: any) {
  const res = await fetch(`${getBaseURL()}/api/management/files`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }
}

export async function removeFile(fileName: string,parent:string) {
  const encodedFileName = encodeURIComponent(fileName);
  const encodedParent = encodeURIComponent(parent);
  const res = await fetch(
    `${getBaseURL()}/api/management/files/${encodedParent}/${encodedFileName}`,
    {
      method: "DELETE",
    },
  );
  if (!res.ok) {
    throw new Error("Failed to remove file");
  }
}
