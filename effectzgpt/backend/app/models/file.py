import os
from pydantic import BaseModel
from pydantic import Field

SUPPORTED_FILE_EXTENSIONS = ["txt", "pdf", "csv"]


class FileStatus:
    UPLOADED = "uploaded"
    UPLOADING = "uploading"


class File(BaseModel):
    name: str = Field(..., description="The name of the file.")
    status: str = Field(..., description="The status of the file.")
    type: str = Field(..., description="The file type.")
    parent: str = Field(..., description="The parent directory of the file.")

    class Config:
        json_schema_extra = {
            "example": {
                "name": "example.txt",
                "status": "uploaded",
                "type": "pdf/folder/.docx/md",
                "parent": "/home/user/pdfs/",
            }
        }
