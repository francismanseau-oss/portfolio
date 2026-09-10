"""Generate PNG favicons and nav assets from the Modular Mesh brand mark."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
BRAND = ROOT / "assets" / "brand"
FAVICON_DIR = BRAND / "favicon"
LOGO_DIR = ROOT / "assets" / "logo"

BLUE = (30, 64, 175)
GRAY = (100, 116, 139)
TRANSPARENT = (0, 0, 0, 0)


def _scale(size: int, v: float) -> float:
    return v * size / 64.0


def draw_mark(size: int, *, frame: bool = False) -> Image.Image:
    img = Image.new("RGBA", (size, size), TRANSPARENT)
    draw = ImageDraw.Draw(img)

    hub = (_scale(size, 32), _scale(size, 37))
    top = (_scale(size, 32), _scale(size, 17))
    left = (_scale(size, 17), _scale(size, 47))
    right = (_scale(size, 47), _scale(size, 47))

    sw_primary = max(1, round(_scale(size, 2.5)))
    sw_secondary = max(1, round(_scale(size, 2.0)))

    if frame:
        pad = _scale(size, 4)
        draw.rounded_rectangle(
            (pad, pad, size - pad, size - pad),
            radius=_scale(size, 12),
            outline=GRAY + (255,),
            width=max(1, round(_scale(size, 1.5))),
        )

    draw.line([hub, top], fill=BLUE + (255,), width=sw_primary)
    draw.line([hub, left], fill=GRAY + (255,), width=sw_secondary)
    draw.line([hub, right], fill=GRAY + (255,), width=sw_secondary)

    def dot(center: tuple[float, float], radius: float, color: tuple[int, int, int]) -> None:
        x, y = center
        r = _scale(size, radius)
        draw.ellipse((x - r, y - r, x + r, y + r), fill=color + (255,))

    dot(top, 5, BLUE)
    dot(left, 4.5, GRAY)
    dot(right, 4.5, GRAY)
    dot(hub, 6, BLUE)

    return img


def save_png(img: Image.Image, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "PNG", optimize=True)


def main() -> None:
    FAVICON_DIR.mkdir(parents=True, exist_ok=True)
    LOGO_DIR.mkdir(parents=True, exist_ok=True)

    # Master haute résolution → resize pour nets petits formats
    master = draw_mark(512, frame=False)
    master_framed = draw_mark(512, frame=True)

    for px in (16, 32, 64):
        out = master.resize((px, px), Image.Resampling.LANCZOS)
        save_png(out, FAVICON_DIR / f"favicon-{px}.png")
        print(f"  favicon-{px}.png")

    save_png(master.resize((128, 128), Image.Resampling.LANCZOS), LOGO_DIR / "logo-nav.png")
    print("  logo-nav.png")

    save_png(master.resize((48, 48), Image.Resampling.LANCZOS), LOGO_DIR / "favicon.png")
    print("  favicon.png")

    save_png(master_framed, LOGO_DIR / "logo-hero.png")
    master_framed.save(LOGO_DIR / "logo-hero.webp", "WEBP", quality=88, method=6)
    print("  logo-hero.png / logo-hero.webp")

    print("Done.")


if __name__ == "__main__":
    main()
