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

    # The photographed model remains fully opaque. Only the outer edge keeps a
    # short alpha ramp for clean compositing against the runway background.
    alpha = np.clip((alpha - 18.0) / 78.0, 0.0, 1.0)
    alpha = np.where(alpha >= 0.72, 1.0, alpha)
    return Image.fromarray(np.uint8(alpha * 255.0), mode="L")


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

    result = original.convert("RGBA")
    result.putalpha(matte)
    destination.parent.mkdir(parents=True, exist_ok=True)
    result.save(destination, "WEBP", lossless=True, method=6)


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
