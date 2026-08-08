from __future__ import annotations

from math import cos, pi
from pathlib import Path

from PIL import Image, ImageEnhance, ImageOps


FRAME_COUNT = 30
FRAME_SIZE = (720, 405)
# GIF timestamps are quantized to 10ms. Twenty 30ms frames plus ten 40ms frames
# make each 30-frame loop exactly one second long.
GIF_FRAME_DURATIONS = [40 if index % 3 == 2 else 30 for index in range(FRAME_COUNT)]
ROOT = Path(__file__).resolve().parents[1]
ASSET_DIR = ROOT / "src" / "assets" / "northline"
OUTPUT_DIR = ROOT / "public" / "northline-motion"
ARRIVAL_KEYFRAME_SHEET = ASSET_DIR / "film-arrival-walk-keyframes.png"

SCENES = {
    "material": {
        "source": ASSET_DIR / "film-material.png",
        "start": (1.03, -0.24, -0.1),
        "end": (1.18, 0.1, 0.05),
        "brightness": 1.0,
    },
    "terminal": {
        "source": ASSET_DIR / "film-terminal.png",
        "start": (1.05, 0.38, -0.03),
        "end": (1.17, 0.54, 0.06),
        "brightness": 1.0,
    },
}


def ease_in_out(progress: float) -> float:
    return (1 - cos(pi * progress)) / 2


def interpolate(start: float, end: float, progress: float) -> float:
    return start + (end - start) * progress


def render_frame(source: Image.Image, settings: dict[str, object], progress: float) -> Image.Image:
    eased = ease_in_out(progress)
    start_zoom, start_x, start_y = settings["start"]
    end_zoom, end_x, end_y = settings["end"]
    zoom = interpolate(start_zoom, end_zoom, eased)
    pan_x = interpolate(start_x, end_x, eased)
    pan_y = interpolate(start_y, end_y, eased)

    crop_width = source.width / zoom
    crop_height = crop_width * FRAME_SIZE[1] / FRAME_SIZE[0]
    crop_height = min(crop_height, source.height / zoom)
    crop_width = crop_height * FRAME_SIZE[0] / FRAME_SIZE[1]

    max_x = source.width - crop_width
    max_y = source.height - crop_height
    left = max(0, min(max_x, max_x * (0.5 + pan_x / 2)))
    top = max(0, min(max_y, max_y * (0.5 + pan_y / 2)))
    crop = source.crop((left, top, left + crop_width, top + crop_height))
    frame = crop.resize(FRAME_SIZE, Image.Resampling.LANCZOS)

    light_pulse = 1 + 0.018 * cos((progress - 0.45) * pi)
    return ImageEnhance.Brightness(frame).enhance(settings["brightness"] * light_pulse)


def render_arrival_walk_frames() -> list[Image.Image]:
    sheet = Image.open(ARRIVAL_KEYFRAME_SHEET).convert("RGB")
    panel_width = sheet.width // 2
    panel_height = sheet.height // 2
    keyframes = []

    for row in range(2):
        for column in range(2):
            panel = sheet.crop(
                (
                    column * panel_width,
                    row * panel_height,
                    (column + 1) * panel_width,
                    (row + 1) * panel_height,
                )
            )
            keyframes.append(
                ImageOps.fit(
                    panel,
                    FRAME_SIZE,
                    method=Image.Resampling.LANCZOS,
                    centering=(0.5, 0.42),
                )
            )

    frames = []
    for index in range(FRAME_COUNT):
        position = index / (FRAME_COUNT - 1) * (len(keyframes) - 1)
        lower_index = int(position)
        upper_index = min(lower_index + 1, len(keyframes) - 1)
        blend = ease_in_out(position - lower_index)
        frame = Image.blend(keyframes[lower_index], keyframes[upper_index], blend)
        frames.append(ImageEnhance.Brightness(frame).enhance(1.012))

    return frames


def save_frames(name: str, frames: list[Image.Image]) -> None:
    sprite = Image.new("RGB", (FRAME_SIZE[0], FRAME_SIZE[1] * FRAME_COUNT))
    for index, frame in enumerate(frames):
        sprite.paste(frame, (0, FRAME_SIZE[1] * index))

    sprite.save(OUTPUT_DIR / f"film-{name}-sprite.webp", "WEBP", quality=82, method=6)
    frames[0].save(
        OUTPUT_DIR / f"film-{name}-motion.gif",
        save_all=True,
        append_images=frames[1:],
        duration=GIF_FRAME_DURATIONS,
        loop=1 if name == "arrival" else 0,
        optimize=False,
        disposal=2,
    )


def save_scene(name: str, settings: dict[str, object]) -> None:
    source = Image.open(settings["source"]).convert("RGB")
    frames = [
        render_frame(source, settings, index / (FRAME_COUNT - 1))
        for index in range(FRAME_COUNT)
    ]
    save_frames(name, frames)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    save_frames("arrival", render_arrival_walk_frames())
    print(f"Rendered arrival walk: {FRAME_COUNT} frames at 30fps")
    for name, settings in SCENES.items():
        save_scene(name, settings)
        print(f"Rendered {name}: {FRAME_COUNT} frames at 30fps")


if __name__ == "__main__":
    main()
