import os
from pathlib import Path
from requests import get


BASE_DIR = Path(__file__).resolve().parent.parent

def workshops_images():
    global BASE_DIR
    path = str(BASE_DIR) + "/media/Workshops/"
    dir_list = os.listdir(path)
    # print(dir_list)

    url = 'Workshops/'
    images_list = []
    for f in dir_list:
        images_list.append(url + f)
    
    print(images_list)


workshops_images()