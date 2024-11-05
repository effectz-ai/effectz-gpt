import os
import requests

IMG_STORAGE_DIR = os.getenv("IMG_STORAGE_DIR", "generated_images")

if not os.path.exists(IMG_STORAGE_DIR):
    os.makedirs(IMG_STORAGE_DIR)

image_generation_api_url = "https://api.openai.com/v1/images/generations"
api_key = os.getenv("OPENAI_API_KEY")

if api_key:
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

else:   
    raise ValueError(
        "Please provide OPENAI_API_KEY"
    )

def save_image_from_url(id, url):
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()

        with open(f"{IMG_STORAGE_DIR}/{id}.png", 'wb') as file:
            file.write(response.content)

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")

def generate_image(prompt):
    data = {
        "prompt": prompt,
        "model": os.getenv("IMG_GENERATION_MODEL", "dall-e-3"),
        "n": int(os.getenv("NO_OF_IMG", 1)),
        "quality": os.getenv("IMG_GENERATION_QUALITY", "hd"),
        "response_format": "url",
        "size": os.getenv("SIZE_OF_IMG", "1792x1024"),
        "style": os.getenv("STYLE_OF_IMG", "natural")
    }

    response = requests.post(image_generation_api_url, headers=headers, json=data)
    # img_id = response.json()['created']
    # img_url = response.json()['data'][0]['url']
    # save_image_from_url(img_id, img_url)
    url_array = response.json()['data']
    return url_array