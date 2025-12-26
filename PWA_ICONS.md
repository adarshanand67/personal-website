# PWA Icon Generation Guide

## Required Icons

Your PWA needs the following icon sizes:

- **192x192px** - For Android home screen
- **512x512px** - For splash screens and app stores

## Design Specifications

### Style Guide

- **Background**: Dark (#1a1a1a)
- **Accent**: Green (#22c55e)
- **Content**: "AA" monogram or your logo
- **Shape**: Square with rounded corners (maskable)
- **Border**: Thin green border for definition

### Design Tips

1. Keep it simple - icons are viewed at small sizes
2. Use high contrast for visibility
3. Ensure the design works on both light and dark backgrounds
4. Test at multiple sizes

## Generation Options

### Option 1: Use Existing Icon

If you have an existing `icon.png` in `/public`, you can resize it:

```bash
# Using ImageMagick (install with: brew install imagemagick)
convert public/icon.png -resize 192x192 public/icon-192.png
convert public/icon.png -resize 512x512 public/icon-512.png
```

### Option 2: Online Tools

Use free PWA icon generators:

- **PWA Asset Generator**: https://www.pwabuilder.com/imageGenerator
- **RealFaviconGenerator**: https://realfavicongenerator.net/
- **Favicon.io**: https://favicon.io/

### Option 3: Design Tools

Create in Figma, Sketch, or Canva:

1. Create a 512x512px artboard
2. Add dark background (#1a1a1a)
3. Add "AA" text or logo in green (#22c55e)
4. Export as PNG at 192x192 and 512x512

## File Placement

Once generated, place icons in `/public`:

```
/public
  ├── icon-192.png
  ├── icon-512.png
  └── manifest.json (already configured)
```

## Verification

After adding icons:

1. Run `bun run build`
2. Serve the production build
3. Open Chrome DevTools → Application → Manifest
4. Verify icons are detected
5. Test "Install App" prompt

## Current Status

✅ Manifest configured with icon paths
✅ Service worker ready
⚠️ Icons need to be generated/added
✅ Offline page created

## Next Steps

1. Generate or source your icon files
2. Add `icon-192.png` and `icon-512.png` to `/public`
3. Test PWA installability
4. Deploy and verify on mobile device
