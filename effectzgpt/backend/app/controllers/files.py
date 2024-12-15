import os
from app.tasks.indexing import index_all
from app.models.file import File, FileStatus, SUPPORTED_FILE_EXTENSIONS


class UnsupportedFileExtensionError(Exception):
    pass

# TODO : remove after checking usage
class FileNotFoundError(Exception):
    pass


class FileHandler:

    @classmethod
    def get_current_files(cls):
        """
        Construct the list files by all the files in the data folder.
        """
        if not os.path.exists("data"):
            return {}
        # Get all files in the data folder
        file_names = cls.list_nested_files_and_folders("data")
        # Construct list[File]
        return file_names

    @classmethod
    def list_nested_files_and_folders(cls, folder: str) -> {str:list[File]}:
        folder_structure = {"folders" : [] , "files" : []}
        for root, dirs, files in os.walk(folder):
            if root not in folder_structure["folders"]:
                folder_structure["folders"].append(root)
            for file_name in files:
                folder_structure["files"].append(File(name=file_name, type=file_name.split(".")[-1], status= FileStatus.UPLOADED, parent=root))
        return folder_structure

    @classmethod
    async def upload_file(
        cls, file, file_name: str
    ) -> File | Exception:
        """
        Upload a file to the data folder.
        """
        # Check if the file extension is supported
        if file_name.split(".")[-1] not in SUPPORTED_FILE_EXTENSIONS:
            return UnsupportedFileExtensionError(
                f"File {file_name} with extension {file_name.split('.')[-1]} is not supported."
            )
        # check whether file with the same name exist , if exist throw error
        if os.path.exists(f"data/{file_name}"):
            return FileExistsError(f"File {file_name} already exists.")

        # Create data folder if it does not exist
        if not os.path.exists("data"):
            os.makedirs("data")

        with open(f"data/{file_name}", "wb") as f:
            f.write(await file.read())
        # Index the data
        index_all() #TODO : add only the newly added file to the indexing ( define a new funtion )
        return File(name=file_name, status=FileStatus.UPLOADED)

    @classmethod
    def remove_file(cls, parent_folder:str, file_name: str) -> None:
        """
        Remove a file from the data folder.
        """
        os.remove(f"./{parent_folder}/{file_name}")
        # Re-index the data
        index_all()  #TODO : remove index for only the mention file no need to refresh all files ( define a new funtion )
