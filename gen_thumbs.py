import os
from PIL import Image
import json

full_folder = 'images/full'
thumb_folder = 'images/thumbs'
os.makedirs(thumb_folder, exist_ok=True)

data = []
for filename in os.listdir(full_folder):
    if filename.lower().endswith((".webp", ".jpg", ".png")):
        full_path = os.path.join(full_folder, filename)
        thumb_path = os.path.join(thumb_folder, filename)

        # Generar thumbnail
        img = Image.open(full_path)
        img.thumbnail((100, 100))
        img.save(thumb_path, "WEBP", quality=40, method=6)

        data.append({
            "thumb": f"{thumb_folder}/{filename}",
            "full": f"{full_folder}/{filename}"
        })

with open("images.json", "w") as f:
    json.dump(data, f, indent=2)

print(f"✅ Miniaturas generadas y images.json actualizado con {len(data)} entradas")
