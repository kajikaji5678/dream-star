from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps
from rembg import remove

from typing import cast
from io import BytesIO


BASE_DIR = Path(__file__).resolve().parent

input_path = BASE_DIR / "input" / "hikakin_pink.jpeg"
output_path = BASE_DIR / "output" / "hikakin_pink.png"


def create_bronze_image(input_path: Path, output_path: Path) -> None:
    # 元画像を読み込む
    with open(input_path, "rb") as input_file:
        input_data: bytes = input_file.read()

    # 人物を切り抜く
    person_data = cast(bytes, remove(input_data))
    person = Image.open(BytesIO(person_data)).convert("RGBA")

    # RGB部分と透明度を分離
    rgb = person.convert("RGB")
    alpha = person.getchannel("A")

    # グレースケール化
    gray = ImageOps.grayscale(rgb)

    # コントラストを強調
    gray = ImageEnhance.Contrast(gray).enhance(1.5)

    # 明るさを少し調整
    gray = ImageEnhance.Brightness(gray).enhance(0.9)

    # グレースケールを銅色に変換
    bronze = ImageOps.colorize(
        gray,
        black=(25, 12, 5),
        white=(205, 145, 75),
    )

    # rembgで切り抜いた透明部分をそのまま維持
    bronze.putalpha(alpha)

    # PNGとして保存
    bronze.save(output_path)

    print(f"完成: {output_path}")


create_bronze_image(input_path, output_path)