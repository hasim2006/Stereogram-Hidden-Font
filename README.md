# 🔮 Stereogram Hidden Font Studio

<img width="1920" height="912" alt="image" src="https://github.com/user-attachments/assets/927395b7-3b22-463f-9ed7-cc23a65221b0" />


<p align="center">
  <strong>An advanced optical computing studio to encode hidden 3D text and geometry inside single-image autostereograms (Magic Eye-style) using precision pixel correspondence algorithms.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Tests-13%20Passed-00FF9D?style=for-the-badge&logo=vitest&logoColor=black" />
  <img src="https://img.shields.io/badge/Resolution-Up_to_4096×4096-00F0FF?style=for-the-badge" />
</p>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [How It Works — Step-by-Step Pipeline](#-how-it-works--step-by-step-pipeline)
  - [1. Text Input & Custom Font Rasterization](#1-text-input--custom-font-rasterization)
  - [2. 3D Depth Map Generation & Euclidean Distance Beveling](#2-3d-depth-map-generation--euclidean-distance-beveling)
  - [3. Autostereogram Pixel Correspondence Solver](#3-autostereogram-pixel-correspondence-solver)
  - [4. Instant 3D Parallax Wiggle & Anaglyph Validation](#4-instant-3d-parallax-wiggle--anaglyph-validation)
  - [5. Side-by-Side Split Inspection](#5-side-by-side-split-inspection)
  - [6. High-Resolution 4K Studio Export](#6-high-resolution-4k-studio-export)
- [Procedural Pattern Engines & Presets](#-procedural-pattern-engines--presets)
- [Mathematical Formulation of the Stereogram Engine](#-mathematical-formulation)
- [Eye Focusing Guide (Parallel vs Cross-Eyed)](#-eye-focusing-guide)
- [Project Architecture](#-project-architecture)
- [Getting Started & Local Setup](#-getting-started--local-setup)

---

## 🌟 Overview

**Stereogram Hidden Font Studio** converts ordinary text strings (such as `"PHANTOMGRID"`, `"MAGIC EYE"`, or custom typography) into mathematically encoded 3D depth structures embedded inside seamless, repeating procedural textures.

When viewed with the correct optical stereogram eye-focusing technique (or using the built-in **3D Wiggle Simulator**), the hidden text emerges as a tangible 3D physical object floating above (or carved into) the surface plane!

---

## 🔬 How It Works — Step-by-Step Pipeline

```
[User Text / Font Selection] 
       │
       ▼
[Offscreen Canvas Font Rasterization]
       │
       ▼
[Depth Map Engine] ── Euclidean Distance Transform ── Bevel Profiles (Chisel/Dome/Chamfer)
       │
       ▼
[Web Worker SIS Solver] ── Scanline Parallax Separation ── Disjoint-Set Union-Find Solver
       │
       ▼
[Procedural Texture Synthesis] ── Deterministic PRNG ── Cyber/SIRDS/Hex/Voronoi Patterns
       │
       ▼
[Final 3D Autostereogram Output & 3D Wiggle Validation]
```

---

### 1. Text Input & Custom Font Rasterization

The user types custom text and selects from Google Fonts (*Orbitron, Space Grotesk, JetBrains Mono, Audiowide, Syne, Cinzel, Montserrat, Rubik Glitch, Press Start 2P*) or uploads custom font files (`.ttf`, `.otf`, `.woff`, `.woff2`).

- Full control over **Font Size**, **Weight (100–900)**, **Letter Spacing**, **Line Height**, and **(X, Y) Positional Offsets**.
- Anti-aliased canvas rasterization converts vector font glyphs into high-precision subpixel luminance masks.

---

### 2. 3D Depth Map Generation & Euclidean Distance Beveling

<img width="1920" height="912" alt="image" src="https://github.com/user-attachments/assets/48b9770b-866a-4791-9d63-26dfe7ea8856" />


Instead of using flat 2D silhouettes, the studio applies an **Euclidean Distance Transform (EDT)** and **Gaussian Filtering** to generate multi-dimensional 3D surfaces:

- **Chisel Profile**: Sharp 45° angular prism knife-edges.
- **Dome Profile**: Smooth spherical dome extrusions.
- **Chamfer Profile**: Linear ramps transitioning to a flat plateau.
- **Smooth Profile**: Hermite cubic S-curves for gentle organic slopes.
- **Invert Depth Mode**: Flips the depth map so text appears deeply carved/engraved into the background.
- **Built-in 3D Test Shapes**: Analytical Signed Distance Fields for **Spheres**, **Cubes**, **Tori**, **Hearts**, **Pyramids**, and **Double Rings**.

---

### 3. Autostereogram Pixel Correspondence Solver

<img width="1920" height="912" alt="image" src="https://github.com/user-attachments/assets/00815c99-1a0a-4d66-a7fc-b7e85dfb1b6f" />


The core rendering engine implements the **Harold Thimbleby / Stuart Inglis / Ian Witten** Single-Image Stereogram (SIS) algorithm:

1. For each horizontal scanline $y$, compute eye separation $s(x)$ based on depth value $Z(x, y) \in [0, 1]$ and baseline $E$:
   $$s(x) = \text{round}\left(E \times (1 - \text{depthFactor} \times Z(x, y))\right)$$
2. Symmetrically center left and right parallax rays: $left = x - \lfloor s/2 \rfloor$, $right = left + s$.
3. Link $(left, right)$ pixel constraints into equivalence classes using a **Disjoint-Set Union-Find** data structure with path compression.
4. Independent root pixels sample color from the procedural texture, while linked pixels inherit identical color values.
5. **Result**: A mathematically artifact-free stereogram with zero seams, zero vertical banding, and continuous 3D depth perception.

---

### 4. Instant 3D Parallax Wiggle & Anaglyph Validation

<p align="center">
  <img src="./docs/images/03_wiggle_3d_parallax_proof.png" alt="3D Parallax Wiggle Simulator" width="90%" style="border-radius: 10px; border: 1px solid #1E2B4D;" />
</p>

For users who have difficulty relaxing their eyes for traditional autostereograms, the studio provides an **interactive 2.5D Parallax Wiggle Simulator**:

- Synthesizes left-eye and right-eye perspectives directly from the depth map.
- Animates a smooth horizontal parallax oscillation (adjustable speed and amplitude) that **immediately proves the 3D geometry is physically encoded into the pixel lattice**.
- Includes a **Red/Cyan Anaglyph 3D mode** for viewing with 3D glasses, and a **3D Shaded Relief Surface Normal Map** view.

---

### 5. Side-by-Side Split Inspection

<p align="center">
  <img src="./docs/images/04_side_by_side_comparison.png" alt="Side-by-Side Comparison Mode" width="90%" style="border-radius: 10px; border: 1px solid #1E2B4D;" />
</p>

The **Side-by-Side** tab renders a real-time dual viewport comparing the encoded surface autostereogram with the underlying 2D depth structure simultaneously.

---

### 6. High-Resolution 4K Studio Export

<p align="center">
  <img src="./docs/images/06_high_res_4k_export.png" alt="High-Resolution 4K Export Studio" width="80%" style="border-radius: 10px; border: 1px solid #1E2B4D;" />
</p>

- **Export Resolutions**:
  - `1200 × 800` (Default Preview)
  - `1920 × 1080` (Full HD 1080p)
  - `2560 × 1440` (2K QHD)
  - `3840 × 2160` (4K Ultra HD)
  - `4096 × 4096` (4K Max Studio Square)
  - Custom width and height up to $4096 \times 4096$.
- **File Formats**: Lossless **PNG** or High-Compression **WebP**.
- **Clipboard Integration**: One-click **Copy to Clipboard** button.
- **Deterministic Regeneration**: Preserves PRNG seed for exact pixel-for-pixel reproducibility.

---

## 🎨 Procedural Pattern Engines & Presets

| Engine | Description | Best For |
| :--- | :--- | :--- |
| **Cyber Matrix** | Matrix digital rain glyphs, phosphor scanlines, and glowing accents. | Cyberpunk & technical themes |
| **Random Dot (SIRDS)** | Authentic 1990s multi-spectral high-density optical noise. | Classic Magic Eye nostalgia |
| **Geometric Hex** | Futuristic hexagon wireframes, circuit traces, and tech nodes. | Geometric 3D pop-out |
| **Voronoi Cells** | Bioluminescent organic cellular mesh with glowing borders. | Continuous smooth depth |
| **Organic Fractal Noise** | Multi-octave sinusoidal noise fields. | Subtle & relaxed viewing |
| **Spectrum Dots** | Multi-frequency chromatic cluster dots. | High-contrast 3D pop |
| **Custom Tile Sampler** | Seamlessly tiles any user-uploaded image texture. | Custom branded textures |

### Built-in Color Themes:
`Neon Cyber` • `Matrix Green` • `Amber Phosphor CRT` • `RGB Glitch` • `Monochrome Noir` • `Deep Ocean` • `Psychedelic`

---

## 📐 Mathematical Formulation

The single-image autostereogram algorithm maps a 3D depth surface $Z(x, y) \in [0, 1]$ into a 2D plane such that when the viewer's eyes converge behind (or in front of) the screen, the binocular disparity $\Delta x$ reconstructs the intended depth:

$$\Delta x = E \times \left(1 - \mu \cdot Z(x, y)\right)$$

where:
- $E$ is the baseline eye separation in pixels (typically 120–160px).
- $\mu \in [0.1, 0.4]$ is the depth scaling factor (`depthStrength`).
- $Z(x, y) = 0$ corresponds to the far background plane (maximum separation $E$).
- $Z(x, y) = 1$ corresponds to the closest foreground plane (narrower separation $E(1 - \mu)$).

---

## 👁️ Eye Focusing Guide

### 1. Parallel / Wall-Eyed Method (Magic Eye Standard)
1. Hold your face about **12–18 inches** away from the screen.
2. Look at the two **guide dots** at the top of the image.
3. Relax your eye focus as if looking through a window into the far distance.
4. As your eyes un-converge, the two guide dots will blur and fuse into **3 dots**.
5. When the center dot is sharp, slowly lower your gaze into the stereogram without refocusing. The 3D text will snap into physical depth!

### 2. Cross-Eyed Method
1. Switch the optics mode in the studio to **Cross-Eyed**.
2. Hold a fingertip halfway between your eyes and the screen.
3. Focus sharply on your fingertip until the background image doubles and the guide dots fuse into 3 dots.
4. Slowly remove your finger while maintaining that convergence angle.

---

## 📁 Project Architecture

```
c:/Users/hasim/OneDrive/Desktop/Font/
├── docs/
│   └── images/                    # High-res screenshots & demo assets
├── src/
│   ├── components/
│   │   ├── Header.tsx             # Telemetry banner, presets, seed randomizer
│   │   ├── TextInputPanel.tsx     # Text input, font loader, tracking, offsets
│   │   ├── DepthControls.tsx      # Bevel profiles, smoothing, invert, test shapes
│   │   ├── PatternControls.tsx    # Pattern engines, palettes, custom tile upload
│   │   ├── StereoControls.tsx     # Separation slider, parallel/cross-eye toggle
│   │   ├── PreviewViewport.tsx    # Interactive canvas with zoom/pan & inspector
│   │   ├── DepthMapPreview.tsx    # 2D Grayscale depth map & hover probe
│   │   ├── Wiggle3DViewer.tsx     # 2.5D Parallax wiggle & Anaglyph viewer
│   │   ├── EyeTrainingGuide.tsx   # Interactive optical focus guide modal
│   │   └── ExportModal.tsx        # High-res export (up to 4K 4096×4096)
│   ├── stereogram/
│   │   ├── depthMap.ts            # Canvas rasterizer, distance transform, bevels
│   │   ├── testShapes.ts          # Analytical 3D SDF shapes (Sphere, Cube, etc.)
│   │   ├── patterns.ts            # Procedural texture synthesizers
│   │   ├── pixelCorrespondence.ts # Union-Find scanline stereogram solver
│   │   ├── seededRandom.ts        # Deterministic Mulberry32 & SplitMix32 PRNG
│   │   ├── presets.ts             # Curated presets library
│   │   ├── stereogramRenderer.ts  # Main rendering coordinator
│   │   └── stereogram.worker.ts   # Dedicated Web Worker
│   ├── fonts/
│   │   └── fontLoader.ts          # Google Fonts & custom font file loader
│   ├── tests/
│   │   ├── seededRandom.test.ts   # PRNG determinism & bounds unit tests
│   │   ├── depthMap.test.ts       # Distance transform & bevel unit tests
│   │   └── pixelCorrespondence.test.ts # Solver invariant & resolution tests
│   ├── App.tsx                    # Main studio application
│   ├── main.tsx                   # React root mount
│   └── index.css                  # Tailwind styles & cyber scrollbars
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🚀 Getting Started & Local Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd Font
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 3. Run Automated Tests
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```

---

## 🔒 Privacy & Local Processing

- **100% Client-Side**: All font rasterization, depth map generation, texture synthesis, and high-res image export happen entirely inside your browser using Web Workers and HTML Canvas.
- **Zero Server Uploads**: Your custom text, uploaded fonts, and generated stereogram artwork never leave your machine.

---

## 📜 License

MIT License &copy; 2026 Stereogram Hidden Font Studio.
