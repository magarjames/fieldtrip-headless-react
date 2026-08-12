from __future__ import annotations

import argparse
import os
from pathlib import Path

import numpy as np
from PIL import Image


PROJECT_ROOT = Path(__file__).resolve().parents[1]
ROOT = PROJECT_ROOT / "public" / "fieldtrip"
MODEL_HOME = PROJECT_ROOT / ".tools" / "rembg-models"
os.environ.setdefault("U2NET_HOME", str(MODEL_HOME))

EDGE_FEATHER_SIGMA = 0.42
EDGE_BLEED_RADIUS = 5.0


def load_extractor(model_name: str):
    try:
        from rembg import new_session, remove
        from scipy import ndimage
    except ImportError as error:
        raise SystemExit(
            "Install the cutout dependencies with "
            "`.tools/rembg-venv/Scripts/python.exe -m pip install rembg onnxruntime`."
        ) from error

    return new_session(model_name), remove, ndimage


def isolate_subject(mask: Image.Image, ndimage) -> Image.Image:
    """Keep the central person and discard shadows or other disconnected pixels."""
    source_alpha = np.asarray(mask.convert("L"), dtype=np.uint8)
    candidate = source_alpha >= 24
    labels, count = ndimage.label(candidate, structure=np.ones((3, 3), dtype=np.uint8))

    if count == 0:
        raise RuntimeError("The person extractor returned an empty mask.")

    height, width = source_alpha.shape
    center = labels[
        int(height * 0.08) : int(height * 0.92),
        int(width * 0.18) : int(width * 0.82),
    ]
    center_labels = center[center > 0]
    if center_labels.size:
        sizes = np.bincount(center_labels)
    else:
        sizes = np.bincount(labels.ravel())
    sizes[0] = 0
    subject_label = int(sizes.argmax())

    subject = labels == subject_label
    alpha = np.where(subject, source_alpha, 0).astype(np.float32)

    # Keep the photographed model opaque while retaining the extractor's fine
    # detail at the silhouette. A sub-pixel blur removes stair-stepping without
    # turning the clothing or hair translucent.
    alpha = np.clip((alpha - 18.0) / 78.0, 0.0, 1.0)
    alpha = np.where(alpha >= 0.72, 1.0, alpha)
    alpha = ndimage.gaussian_filter(alpha, sigma=EDGE_FEATHER_SIGMA)
    allowed_edge = ndimage.binary_dilation(subject, iterations=2)
    alpha = np.where(allowed_edge, alpha, 0.0)
    alpha = np.where(alpha <= 0.008, 0.0, alpha)
    alpha = np.where(alpha >= 0.992, 1.0, alpha)
    return Image.fromarray(np.uint8(np.round(alpha * 255.0)), mode="L")


def decontaminate_edge(
    original: Image.Image,
    matte: Image.Image,
    ndimage,
) -> Image.Image:
    """Remove studio-backdrop colour from the cut edge and hidden RGB pixels."""
    rgb = np.asarray(original.convert("RGB"), dtype=np.uint8)
    alpha = np.asarray(matte, dtype=np.uint8)
    solid = alpha >= 252

    if not solid.any():
        raise RuntimeError("The extracted subject has no opaque interior pixels.")

    distance, nearest_index = ndimage.distance_transform_edt(
        ~solid,
        return_indices=True,
    )
    nearest_foreground = rgb[nearest_index[0], nearest_index[1]].astype(np.float32)
    cleaned = rgb.astype(np.float32)

    # Edge pixels in the original JPG are a mix of subject and studio backdrop.
    # Pull their colour toward the nearest opaque foreground as transparency rises.
    alpha_unit = alpha.astype(np.float32) / 255.0
    fringe = (alpha > 0) & (alpha < 252)
    correction = np.clip((0.98 - alpha_unit) / 0.75, 0.0, 1.0)
    cleaned[fringe] = (
        cleaned[fringe] * (1.0 - correction[fringe, None])
        + nearest_foreground[fringe] * correction[fringe, None]
    )

    # Transparent pixels can contribute colour during image scaling. Extend the
    # foreground a few pixels beyond the matte, then clear all remaining RGB data.
    transparent = alpha == 0
    bleed = transparent & (distance <= EDGE_BLEED_RADIUS)
    cleaned[transparent] = 0.0
    cleaned[bleed] = nearest_foreground[bleed]

    rgba = np.dstack((np.uint8(np.round(cleaned)), alpha))
    return Image.fromarray(rgba, mode="RGBA")


def extract(
    source: Path,
    destination: Path,
    session,
    remove,
    ndimage,
) -> None:
    original = Image.open(source).convert("RGB")
    raw_mask = remove(
        original,
        session=session,
        only_mask=True,
        alpha_matting=False,
        post_process_mask=False,
    )
    matte = isolate_subject(raw_mask, ndimage)

    result = decontaminate_edge(original, matte, ndimage)
    destination.parent.mkdir(parents=True, exist_ok=True)
    result.save(destination, "WEBP", lossless=True, method=6, exact=True)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Cut the photographed models from the original studio JPGs."
    )
    parser.add_argument(
        "--model",
        default="u2net_human_seg",
        help="rembg person-segmentation model (default: u2net_human_seg)",
    )
    parser.add_argument(
        "--source",
        type=Path,
        help="Process one source image instead of every scan folder.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        help="Destination used with --source; defaults to the adjacent WebP.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    session, remove, ndimage = load_extractor(args.model)

    if args.source:
        source = args.source.resolve()
        destination = (
            args.output.resolve() if args.output else source.with_suffix(".webp")
        )
        extract(source, destination, session, remove, ndimage)
        print(destination)
        return

    sources = [
        source
        for folder in sorted(ROOT.glob("scan-*"))
        if folder.is_dir()
        for source in sorted(folder.glob("*.jpg"))
    ]
    for source in sources:
        destination = source.with_suffix(".webp")
        extract(source, destination, session, remove, ndimage)
        print(destination.relative_to(ROOT))


if __name__ == "__main__":
    main()
