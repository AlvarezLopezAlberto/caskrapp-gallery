import os
import json

image_folder = 'images'
exts = ['.webp', '.jpg', '.png']

images = sorted([
    f"{image_folder}/{filename}"
    for filename in os.listdir(image_folder)
    if any(filename.lower().endswith(ext) for ext in exts)
])

with open('images.json', 'w') as f:
    json.dump(images, f, indent=2)

print(f"✅ Generadas {len(images)} imágenes.")
