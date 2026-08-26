# Stereogram Hidden Font Studio

**Stereogram Hidden Font Studio** is an optical computing web application designed to encode custom hidden text and 3D geometry into single-image autostereograms (Magic Eye-style images) using precision pixel correspondence algorithms.

---

## Key Features

### 1. Advanced 3D Depth Map Generation
- **Dynamic Font Rasterization**: Works with Google Fonts, system fonts, and custom uploaded `.ttf`, `.otf`, `.woff`, `.woff2` font files.
- **Euclidean Distance Transform**: Computes distance maps to generate rich beveling and 3D chamfer profiles:
  - *Chisel*: Sharp 45° angular prism edge
  - *Dome*: Smooth spherical dome extrusion
  - *Chamfer*: Linear sloped ramp up to a flat plateau
  - *Smooth*: Hermite cubic S-curve
  - *Flat*: Flat extruded plateau
- **Depth Controls**: Anti-aliased Gaussian smoothing blur, depth strength scaling ($0.1$ to $1.0$), and depth inversion for carved-in/engraved effects.
- **3D Test Shapes**: Built-in mathematical Signed Distance Field (SDF) 3D shapes: Sphere, Cube, Torus, Heart, Pyramid, Double Ring, Letter A.

### 2. Autostereogram (SIS / SIRDS) Correspondence Solver
- **Disjoint-Set Union-Find Solver**: Implements the Harold Thimbleby / Stuart Inglis / Ian Witten classic scanline stereogram algorithm with path compression.
- **Zero Artifacts & Continuous Parallax**: Calculates exact horizontal pixel displacement based on normalized depth $Z \in [0, 1]$ and stereo baseline $E$.
- **Parallel & Cross-Eyed Viewing Modes**: Inverts parallax vectors so both wall-eyed (parallel) and cross-eyed viewers can focus comfortably.
- **Dual Top Guide Dots**: Renders alignment dots spaced precisely at eye separation $E$.

### 3. Procedural Texture Engines
- **Cyber Matrix**: Glowing digital rain glyphs and phosphor scanlines.
- **Random Dot (Classic SIRDS)**: 90s nostalgic multi-color or monochrome optical noise.
- **Geometric Hex Lattice**: Futuristic hexagon wireframes and circuit traces.
- **Voronoi Cells**: Bioluminescent organic cellular tessellation.
- **Organic Fractal Noise**: Layered multi-octave sinusoidal fields.
- **Spectrum Dots**: Chromatic multi-frequency cluster patterns.
- **Custom Tile Sampler**: Seamlessly tile any user-uploaded image texture.
- **Curated Color Palettes**: Neon Cyber, Matrix Green, Amber Phosphor CRT, RGB Glitch, Monochrome Noir, Deep Ocean, and Psychedelic.

### 4. 3D Depth Validation & Verification Tools
- **Interactive 2.5D Parallax Wiggle Simulator**: Animates left and right eye parallax rocking to visually verify that 3D depth is 100% physically encoded into the image without requiring eye strain.
- **Anaglyph Mode**: Synthesizes Red/Cyan 3D glasses preview.
- **3D Shaded Relief Surface**: Shaded normal map inspection.
- **Live Pixel Probe**: Hover over any pixel to inspect $(X, Y)$ coordinates, RGB channels, underlying float depth $Z$, and correspondence link.
- **Side-by-Side Comparison**: Live split view comparing the encoded stereogram with the grayscale depth map.

### 5. High-Resolution Studio Exporter
- **Resolutions**: From 1200×800 to 4K Ultra HD (3840×2160) and 4K Max Square (4096×4096).
- **Formats**: Lossless PNG and high-compression WebP.
- **Deterministic Regeneration**: Preserves PRNG seed for exact pixel-for-pixel reproducibility.
- **Direct Clipboard Copy**: Copy high-res images directly to clipboard.

---

## Technical Stack & Architecture

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React
- **Off-Thread Acceleration**: Dedicated Web Worker (`stereogram.worker.ts`) transferring `ArrayBuffer` objects without blocking the UI
- **Testing**: Vitest suite covering PRNG determinism, distance transform, bevel profiles, test shapes, and scanline correspondence invariants.

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Run Automated Tests
```bash
npm test
```

### 4. Build Production Bundle
```bash
npm run build
```

---

## Verification with Sample Word: "PHANTOMGRID"

1. Type `"PHANTOMGRID"` into the **Hidden Text Target** area.
2. Select the **PHANTOMGRID Core** preset or customize the font to *Orbitron* / *Space Grotesk*.
3. Choose the **Cyber Matrix** or **Random Dot** pattern engine.
4. Switch to the **3D Wiggle / Anaglyph** tab to immediately observe the 3D text structure rocking in parallax space.
5. Focus on the two top guide dots until they fuse into 3 dots to view the autostereogram directly in 3D!
