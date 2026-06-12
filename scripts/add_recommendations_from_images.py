# scripts/add_recommendations_from_images.py
"""Add entries to the local recommendations JSON for each processed image.

The script scans `public/processed/` for image files and creates a recommendation
object for each, using the filename (without extension) as the name and a placeholder
role/comment. The avatar URL points to the processed image path (`/processed/<file>`).
"""
import json
from pathlib import Path

# Paths
PUBLIC_DIR = Path(__file__).resolve().parents[1] / "public"
PROCESSED_DIR = PUBLIC_DIR / "processed"
RECS_FILE = Path(__file__).resolve().parents[1] / "src" / "data" / "recommendations.json"

# Ensure the recommendations file exists
if not RECS_FILE.exists():
    RECS_FILE.write_text("[]", encoding="utf-8")

# Load existing recommendations
with RECS_FILE.open("r", encoding="utf-8") as f:
    try:
        recs = json.load(f)
    except json.JSONDecodeError:
        recs = []

# Helper to create a recommendation entry
def make_entry(filename: str) -> dict:
    name = Path(filename).stem.replace("_", " ").title()
    return {
        "id": "auto-" + Path(filename).stem,
        "name": name,
        "role": "Creative Professional",
        "comment": f"Recommendation from image {name}.",
        "avatar": f"/processed/{filename}",
        "rating": 5,
        "created_at": "2026-06-12T00:00:00Z",
    }

NEW_IMAGES = {
    "6a755a4070816daea2c843b17c8497c4.jpg",
    "878a8f41365608eec3fb1221c749fac6.jpg",
    "d44cfdb61b3485cf6f4356df566465b0.jpg",
    "eb03fd218a501d1204f59dce5e707195.jpg",
}

# Add new entries for each processed image not already present
existing_avatars = {rec.get("avatar") for rec in recs}
for img_path in PROCESSED_DIR.iterdir():
    if img_path.is_file() and img_path.name in NEW_IMAGES:
        avatar_url = f"/processed/{img_path.name}"
        if avatar_url not in existing_avatars:
            recs.append(make_entry(img_path.name))
            print(f"Added recommendation for {img_path.name}")

# Write back to file
with RECS_FILE.open("w", encoding="utf-8") as f:
    json.dump(recs, f, indent=2)
print(f"Total recommendations: {len(recs)}")
