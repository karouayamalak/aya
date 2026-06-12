# scripts/remove_bg.py
"""Remove backgrounds from images in the public folder using rembg.

Usage:
    python scripts/remove_bg.py

The script scans the `public/` directory for .jpg and .png files, removes their backgrounds,
and saves the results to `public/processed/` preserving the original filenames.
"""
import os
from pathlib import Path

try:
    from rembg import remove
except ImportError:
    raise ImportError("rembg not installed. Install with 'pip install rembg' before running this script.")

PUBLIC_DIR = Path(__file__).resolve().parents[1] / "public"
OUTPUT_DIR = PUBLIC_DIR / "processed"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

NEW_IMAGES = {
    "6a755a4070816daea2c843b17c8497c4.jpg",
    "878a8f41365608eec3fb1221c749fac6.jpg",
    "d44cfdb61b3485cf6f4356df566465b0.jpg",
    "eb03fd218a501d1204f59dce5e707195.jpg",
}

for img_path in PUBLIC_DIR.iterdir():
    if img_path.name in NEW_IMAGES:
        with open(img_path, "rb") as i:
            input_data = i.read()
        output_data = remove(input_data)
        out_path = OUTPUT_DIR / img_path.name
        with open(out_path, "wb") as o:
            o.write(output_data)
        print(f"Processed {img_path.name} -> {out_path.relative_to(PUBLIC_DIR)}")
