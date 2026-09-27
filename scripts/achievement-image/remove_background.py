from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from rembg import remove

input_path = Path("input/seikin1.png")
output_path = Path("output/seikin1_hidden.png")

def create_hidden_image(input_path: Path, output_path: Path) -> None:
    #元画像
    original = Image.open()