from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
from rembg import remove
from typing import cast
from io import BytesIO


BASE_DIR = Path(__file__).resolve().parent

input_path = BASE_DIR / "input" / "7095110.png"
output_path = BASE_DIR / "output" / "7095110_hidden.png"


def create_hidden_image(input_path: Path, output_path: Path) -> None:
    original = Image.open(input_path).convert("RGBA")

    # 画像をrembgに渡す
    with open(input_path, "rb") as input_file:
        input_data: bytes = input_file.read()

    # 人物を切り抜く
    person_data = cast(bytes, remove(input_data))
    person = Image.open(BytesIO(person_data)).convert("RGBA")

    # 白背景を作成
    result = Image.new("RGBA", original.size, (255, 255, 255, 255))

    person_pixels = person.load()
    result_pixels = result.load()

    width, height = person.size

    print(person.mode)
    print(person.size)

    # 人物部分だけ黒いシルエットにする
    for y in range(height):
        for x in range(width):
            alpha = person_pixels[x, y][3]

            if alpha > 0:
                result_pixels[x, y] = (0, 0, 0, 255)

    # 「？」を描画
    draw = ImageDraw.Draw(result)

    width, height = result.size

    font_size = int(height * 0.25)

    font = ImageFont.truetype(
        "/System/Library/Fonts/Helvetica.ttc",
        font_size
    )

    text = "?"

    bbox = draw.textbbox((0, 0), text, font=font)

    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    text_x = (width - text_width) / 2
    text_y = (height - text_height) / 2

    draw.text(
        (text_x, text_y),
        text,
        fill="white",
        font=font
    )

    result.save(output_path)

    print(f"完成: {output_path}")


create_hidden_image(input_path, output_path)

