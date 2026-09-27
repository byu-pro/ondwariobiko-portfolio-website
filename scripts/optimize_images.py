"""Create WebP delivery images while preserving the original artwork.
Run with Python and Pillow: python scripts/optimize_images.py
"""
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
before = after = 0
for folder in ('public/assets', 'src/assets'):
    for source in (root / folder).iterdir():
        if source.suffix.lower() not in ('.png', '.jpg', '.jpeg'):
            continue
        image = ImageOps.exif_transpose(Image.open(source)).convert('RGBA' if source.suffix == '.png' else 'RGB')
        is_thumbnail = '_thumbnail' in source.stem
        is_logo = folder == 'public/assets' and not is_thumbnail
        if is_logo:
            image.thumbnail((480, 240), Image.Resampling.LANCZOS)
        target = source.with_suffix('.webp')
        image.save(target, 'WEBP', lossless=is_logo, quality=90, method=6)
        before += source.stat().st_size
        after += target.stat().st_size
        if is_thumbnail:
            small = image.resize((600, 750), Image.Resampling.LANCZOS)
            small.save(source.with_name(source.stem + '-600.webp'), 'WEBP', quality=88, method=6)
        print(f'{source.name}: {source.stat().st_size:,} -> {target.stat().st_size:,} bytes')
print(f'Primary images: {before:,} -> {after:,} bytes ({(1-after/before)*100:.1f}% smaller)')
