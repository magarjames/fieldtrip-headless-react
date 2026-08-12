from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1] / "public" / "fieldtrip"


def restore_enclosed_upper_body(matte: Image.Image) -> Image.Image:
    closed = matte.point(lambda value: 255 if value >= 150 else 0)
    closed = closed.filter(ImageFilter.MaxFilter(13)).filter(ImageFilter.MinFilter(13))
    outside = closed.copy()
    ImageDraw.floodfill(outside, (0, 0), 128, thresh=0)

    alpha = np.asarray(matte, dtype=np.uint8).copy()
    enclosed = np.asarray(outside) == 0
    y, x = np.ogrid[: matte.height, : matte.width]
    upper_body = (
        (y < int(matte.height * 0.64))
        & (x > int(matte.width * 0.2))
        & (x < int(matte.width * 0.8))
    )
    alpha[enclosed & upper_body] = 255
    return Image.fromarray(alpha, mode="L")


def extract(source: Path) -> None:
    image = Image.open(source).convert("RGB")
    rgb = np.asarray(image, dtype=np.float32)
    height, width, _ = rgb.shape
    sample_width = max(40, width // 10)

    # The generated turntable frames use a neutral studio sweep. Sampling both
    # edges per row preserves the model while following that sweep's gradient.
    edge_samples = np.concatenate(
        (rgb[:, :sample_width], rgb[:, -sample_width:]), axis=1
    )
    background = np.median(edge_samples, axis=1)

    distance = np.linalg.norm(rgb - background[:, None, :], axis=2)
    alpha = np.clip((distance - 25.0) / 28.0, 0.0, 1.0)
    alpha = np.power(alpha, 0.56)

    # Generated clothing often sits close to the neutral backdrop in colour.
    # Once a pixel is confidently part of the subject, make it fully opaque so
    # pale fabric and skin do not inherit a ghosted, semi-transparent look.
    alpha = np.where(alpha >= 0.43, 1.0, alpha)

    # Suppress isolated texture outside the portrait's useful center zone.
    x = np.linspace(-1.0, 1.0, width, dtype=np.float32)
    horizontal_gate = np.clip((0.98 - np.abs(x)) / 0.16, 0.0, 1.0)
    alpha *= horizontal_gate[None, :]

    matte = Image.fromarray(np.uint8(alpha * 255), mode="L")
    matte = matte.filter(ImageFilter.GaussianBlur(radius=0.7))
    if source.parent.name == "scan-f4":
        matte = restore_enclosed_upper_body(matte)
    result = image.convert("RGBA")
    result.putalpha(matte)
    result.save(source.with_suffix(".webp"), "WEBP", quality=89, method=1)


for folder in sorted(ROOT.glob("scan-*")):
    if not folder.is_dir():
        continue
    for source_file in sorted(folder.glob("*.jpg")):
        extract(source_file)
        print(source_file.with_suffix(".webp").relative_to(ROOT))
