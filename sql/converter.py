from PIL import Image
import json
import io 

def convertData(filename):
    # Converte imagens ou arquivos para formato binario
    with open(filename, 'rb') as file:
        binary_data = file.read()
     
    return binary_data

def convertToImage(arqBlob):
    image = Image.open(io.BytesIO(arqBlob))
    return image

def convertToJson(arqBlob):
    arqJson = json.loads(arqBlob)
    return arqJson