import os
from time import sleep
from FileModificationHandler import FileModified


def file_modified():
    os.system("sass scss:css > scss-out.log")
    return False


fileModifiedHandler = FileModified(r"SCSS/style.scss", file_modified)
fileModifiedHandler.start()
