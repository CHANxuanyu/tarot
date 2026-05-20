import subprocess
import json
import base64
import os
import sys

OUT_DIR = "public/themes/classic-mystic/assets/cards"
os.makedirs(OUT_DIR, exist_ok=True)

COMMON_STYLE = "Baroque and Art Nouveau style, intricate gold filigree borders, stained glass elements, dark emerald green and deep midnight blue and rich gold color palette. Highly detailed, mystical and magical atmosphere, masterpiece, no text."

cards = [
    ("00-fool.png", "The Fool", "A young traveler stepping off a cliff edge, holding a white rose and a small bindle. A loyal small white dog at his heels. Sun shining in the background."),
    ("01-magician.png", "The Magician", "A mystical figure holding a wand pointing to the sky and one hand pointing to the earth. An altar before him with a cup, pentacle, sword, and wand. Infinity symbol above his head. Subtle Egyptian motifs like the Eye of Horus."),
    ("02-high-priestess.png", "The High Priestess", "A serene woman seated between two pillars (one black, one white). She holds a scroll of hidden knowledge. A crescent moon at her feet. Pomegranate tapestry behind her."),
    ("03-empress.png", "The Empress", "A beautiful, maternal figure crowned with twelve stars, seated on a throne in a lush, abundant natural landscape with a waterfall and wheat fields."),
    ("04-emperor.png", "The Emperor", "A stern, authoritative ruler on a stone throne decorated with ram heads. He holds a golden scepter and an orb. Subtle Egyptian pharaoh elements in his golden crown."),
    ("05-hierophant.png", "The Hierophant", "A spiritual leader in ornate robes, seated between two pillars, raising a hand in blessing. Two crossed keys at his feet. Subtle Egyptian Anubis or priest motifs."),
    ("06-lovers.png", "The Lovers", "A divine angel blessing a naked man and woman. The Tree of Knowledge and Tree of Life in the background. A radiant sun above."),
    ("07-chariot.png", "The Chariot", "A victorious warrior in a chariot pulled by two sphinxes (one black, one white). Starry canopy above the chariot. Subtle Egyptian winged sun disc motif."),
    ("08-strength.png", "Strength", "A gentle woman gracefully taming and closing the jaws of a fierce lion. Infinity symbol above her head. Floral garlands."),
    ("09-hermit.png", "The Hermit", "An old wise man standing on a snowy mountain peak, holding a staff and a glowing lantern containing a glowing six-pointed star."),
    ("10-wheel.png", "Wheel of Fortune", "A giant mystical wheel turning in the sky. Surrounded by four winged creatures (angel, eagle, lion, bull). A sphinx at the top of the wheel. Golden Egyptian motifs."),
    ("11-justice.png", "Justice", "A stern figure seated between two pillars, holding a raised double-edged sword in one hand and balanced golden scales in the other."),
    ("12-hanged-man.png", "The Hanged Man", "A calm man suspended upside down by one foot from a living tree. A halo of light around his head, indicating enlightenment."),
    ("13-death.png", "Death", "A skeletal knight in black armor riding a pale horse. A banner with a mystic rose. A rising sun in the background. No text."),
    ("14-temperance.png", "Temperance", "A majestic angel with large wings, pouring liquid between two golden chalices. One foot on land, one in water. A path leading to a glowing crown in the distance."),
    ("15-devil.png", "The Devil", "A horned, winged mythical creature perched on a black cube. A man and a woman are loosely chained to the cube. Dark, fiery underworld elements."),
    ("16-tower.png", "The Tower", "A tall stone tower struck by a violent bolt of lightning. The golden crown on top falls off. Flames and debris falling against a dark sky."),
    ("17-star.png", "The Star", "A naked woman kneeling by a pool, pouring water from two jugs onto the land and water. A large radiant eight-pointed star and seven smaller stars in the night sky."),
    ("19-sun.png", "The Sun", "A bright, radiant sun with a calm face shining down on a joyful naked child riding a white horse. Sunflowers blooming. Egyptian Ra / Sun God solar disk elements."),
    ("20-judgement.png", "Judgement", "The archangel Gabriel in the sky blowing a golden trumpet. Below, figures rising from their graves, arms outstretched in awakening."),
    ("21-world.png", "The World", "A joyous dancing figure surrounded by a large green laurel wreath. In the four corners, the heads of a lion, bull, eagle, and angel.")
]

for filename, name, desc in cards:
    path = os.path.join(OUT_DIR, filename)
    if os.path.exists(path):
        print(f"Skipping {filename}, already exists.")
        sys.stdout.flush()
        continue
    
    prompt = f"Tarot card illustration of {name}. {COMMON_STYLE} {desc}"
    print(f"Generating {filename}...")
    sys.stdout.flush()
    
    res = subprocess.run([
        'verdent-image', 'generate',
        '--model', 'gpt-image-2',
        '--prompt', prompt,
        '--size', '1024x1792',
        '--n', '1'
    ], capture_output=True, text=True)
    
    try:
        data = json.loads(res.stdout)
        img_data = base64.b64decode(data['images'][0]['result'])
        with open(path, 'wb') as f:
            f.write(img_data)
        print(f"Saved {filename}")
    except Exception as e:
        print(f"Error on {filename}: {e}\nSTDOUT: {res.stdout}\nSTDERR: {res.stderr}")
    sys.stdout.flush()

print("ALL DONE")
