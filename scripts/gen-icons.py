"""Minimal PNG icon generator (no deps)."""
import struct
import zlib
from pathlib import Path


def png_rgba(w: int, h: int, pixels: bytearray) -> bytes:
    def chunk(tag: bytes, data: bytes) -> bytes:
        crc = zlib.crc32(tag + data)
        crc = crc if crc >= 0 else crc + (1 << 32)
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", crc)

    raw = b"".join(b"\x00" + bytes(pixels[y * w * 4 : (y + 1) * w * 4]) for y in range(h))
    return (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0))
        + chunk(b"IDAT", zlib.compress(raw, 9))
        + chunk(b"IEND", b"")
    )


def make_icon(size: int, maskable: bool = False) -> bytes:
    px = bytearray(size * size * 4)
    cx = cy = size / 2

    def set_pixel(x: int, y: int, rgba: tuple[int, int, int, int]) -> None:
        if 0 <= x < size and 0 <= y < size:
            i = (y * size + x) * 4
            px[i : i + 4] = bytes(rgba)

    for y in range(size):
        for x in range(size):
            i = (y * size + x) * 4
            if maskable:
                px[i : i + 4] = bytes([15, 20, 25, 255])
            else:
                dx, dy = x + 0.5 - cx, y + 0.5 - cy
                r = (dx * dx + dy * dy) ** 0.5
                if r > size * 0.48:
                    px[i : i + 4] = bytes([0, 0, 0, 0])
                else:
                    px[i : i + 4] = bytes([15, 20, 25, 255])

    margin = int(size * (0.22 if maskable else 0.18))
    thick = max(2, size // 12)
    for y in range(size // 2 - thick // 2, size // 2 + thick // 2 + 1):
        for x in range(margin, size - margin):
            set_pixel(x, y, (61, 214, 140, 255))
    for x in range(size // 2 - thick // 2, size // 2 + thick // 2 + 1):
        for y in range(margin, size // 2 + thick // 2 + 1):
            set_pixel(x, y, (61, 214, 140, 255))

    return png_rgba(size, size, px)


def main() -> None:
    out = Path(__file__).resolve().parent.parent / "public" / "icons"
    out.mkdir(parents=True, exist_ok=True)
    (out / "icon-192.png").write_bytes(make_icon(192))
    (out / "icon-512.png").write_bytes(make_icon(512))
    (out / "icon-512-maskable.png").write_bytes(make_icon(512, maskable=True))
    print("icons ok", sorted(p.name for p in out.iterdir()))


if __name__ == "__main__":
    main()
