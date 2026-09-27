from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from rembg import remove
from typing import cast
from io import BytesIO

BASE_DIR = Path(__file__).resolve().parent

input_path = BASE_DIR / "input" / "seikin1.png"
output_path = BASE_DIR / "output" / "seikin1_hidden.png"


def create_hidden_image(input_path: Path, output_path: Path) -> None:

    original = Image.open(input_path).convert("RGBA")

    # 画像を渡す
    with open(input_path, "rb") as input_file:
        input_data: bytes = input_file.read()

    # 人物を切り抜く
    person_data = cast(bytes, remove(input_data))

    person = Image.open(BytesIO(person_data)).convert("RGBA")

    result = original.copy()

    person_pixels = person.load()
    result_pixels = result.load()

    width, height = person.size

    print(person.mode)
    print(person.size)

    for y in range(height):
        for x in range(width):
            alpha = person_pixels[x, y][3]


if __name__ == "__main__":
    create_hidden_image(input_path, output_path)
