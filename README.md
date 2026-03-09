# Awesome Liquid Glass ✦

A collection of **Liquid Glass** UI component implementations inspired by iOS 26 / SwiftUI's new material design language — with a live web demo, a Figma plugin, and SwiftUI source files.

---

## What's in this repo

| Directory | What it contains |
|---|---|
| [`web/`](#-web-demo) | Interactive browser demo of all Liquid Glass variants |
| [`figma-plugin/`](#-figma-plugin) | Figma plugin that inserts pixel-perfect Liquid Glass components |
| [`SwiftFiles/`](#-swiftui-examples) | SwiftUI source files for each glass component |
| [`Sources/`](Sources/) | Core Swift source helpers |

---

## 🌐 Web Demo

Open `web/index.html` in any modern browser (no build step required).

The demo showcases all seven component variants with live controls:

- **Play Button** — circular glass button with play icon
- **Toolbar** — glass navigation bar with back / forward / close
- **Tab Bar** — bottom tabs with badge indicator
- **Floating Bar** — action bar + floating compose button
- **H Container** — full-width glass navigation container
- **Menu** — glass dropdown with icon-labeled items
- **Glass Card** — standalone panel with circular action button

Use the **blur slider** to adjust `backdrop-filter: blur()` in real time, and click **Copy CSS** to copy the full glass CSS for any component.

---

## 🎨 Figma Plugin

The `figma-plugin/` directory contains a ready-to-load Figma plugin.

### Installing the plugin locally

1. Open **Figma Desktop** (the plugin API requires the desktop app).
2. Go to **Plugins → Development → Import plugin from manifest…**
3. Select `figma-plugin/manifest.json`.
4. The plugin appears under **Plugins → Development → Awesome Liquid Glass**.

### Using the plugin

Click any preset card in the plugin panel to insert a Liquid Glass component at the center of your current viewport:

| Preset | Layer name in Figma |
|---|---|
| Play Button | `Liquid Glass / Play Button` |
| Toolbar | `Liquid Glass / Toolbar` |
| Tab Bar | `Liquid Glass / Tab Bar` |
| Floating Bar | `Liquid Glass / Floating Bar` |
| H Container | `Liquid Glass / H Container` |
| Menu | `Liquid Glass / Menu` |
| Glass Card | `Liquid Glass / Glass Card` |

All components are built with native Figma layer properties:
- `BackgroundBlurEffect` (5 px, matching `backdrop-filter: blur(5px)`)
- `DropShadowEffect` for highlight (`0 8px 20px rgba(255,255,255,0.3)`) and depth (`0 0 30px rgba(0,0,0,0.3)`)
- Semi-transparent white fill (`rgba(255,255,255,0.1)`)
- Corner radius 20 px

### Plugin source files

```
figma-plugin/
├── manifest.json       ← Figma manifest (points to code.js)
├── code.js             ← Self-contained compiled bundle (edit this to customise)
└── src/
    ├── plugin.ts       ← TypeScript source (mirrors code.js)
    ├── ui.html         ← Plugin panel HTML
    ├── ui.ts           ← Panel click-handler logic
    └── ui.css          ← Panel styles
```

> `code.js` is a self-contained bundle with the UI HTML inlined — no build step is needed to run the plugin. If you modify `src/plugin.ts`, copy your changes into `code.js` (or set up a bundler such as esbuild).

---

## 🍎 SwiftUI Examples

Each file in `SwiftFiles/` is a standalone SwiftUI view you can drop into any iOS 26 / Xcode 26+ project:

| File | Component |
|---|---|
| `LiquidGlassPlayButton.swift` | Animated play/pause glass button |
| `LiquidGlassToolbarItems.swift` | Navigation toolbar with glass buttons |
| `LiquidGlassTabBar.swift` | Tab bar with badge support |
| `LiquidGlassRoundedFloating.swift` | Floating action bar + compose button |
| `LiquidGlassHContainer.swift` | Horizontal glass container / nav bar |
| `LiquidGlassMenu.swift` | Glass-style dropdown menu |
| `CustomGlassEffect.swift` | Custom glass card with `.glassEffect()` |
| `LiquidGlassJello.swift` | Jello / squash-and-stretch animation |

### Running the Swift examples

```bash
# Requires Xcode 26 beta or later
open SwiftFiles/LiquidGlassPlayButton.swift   # preview in Xcode canvas
```

All SwiftUI files use `.buttonStyle(.glass)` and `.glassEffect()` — APIs available on iOS 26 / macOS 26+.

---

## Design tokens

These values are used consistently across all implementations:

| Property | Value | Source |
|---|---|---|
| Background blur | `blur(5px)` | `web/index.html` |
| Fill | `rgba(255,255,255,0.1)` | `web/index.html` |
| Outer shadow | `0 0 30px rgba(0,0,0,0.3)` | `web/index.html` |
| Highlight shadow | `0 8px 20px rgba(255,255,255,0.3)` | `web/styles.css` |
| Border radius | `15–20px` | `web/styles.css` |
| Gradient | `linear-gradient(150deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1))` | `web/styles.css` |

---

## Contributing

Contributions are welcome! Feel free to open a PR to:
- Add new SwiftUI component examples
- Add more presets to the Figma plugin (`figma-plugin/code.js`)
- Improve the web demo
- Add React / Vue / CSS-only component implementations

## License

MIT — see [LICENSE](LICENSE).
