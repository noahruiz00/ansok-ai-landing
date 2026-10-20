// Generates the static social-sharing images (Open Graph + X/Twitter, 1200×630).
//
//   npm run social-images
//
// Output: app/opengraph-image.png and app/twitter-image.png (+ matching .alt.txt).
// Next.js serves these as static files, so nothing is generated or read from
// disk at request time – they work on any host (Vercel, Node server, static CDN).
// Re-run this script only when the design, copy or logo changes, then commit the PNGs.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ImageResponse } from "next/og.js";
import { createElement as h } from "react";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const size = { width: 1200, height: 630 };
const alt =
  "Ansök AI – Smartare jobbsökande med Ansök AI. AI-driven hjälp för att hitta relevanta jobb och förenkla ansökningsprocessen.";

// Official horizontal logo (transparent version of public/assets/ansok-ai-logo-horizontal.png, 1169×316).
const LOGO = { file: "public/assets/ansok-ai-logo-horizontal-transparent.png", width: 1169, height: 316 };
const navy = "#030a1f";
const brand = "#1d55eb";
const slate = "#475569";

const [logo, jakarta, inter] = await Promise.all([
  readFile(join(root, LOGO.file)),
  readFile(join(root, "assets/fonts/PlusJakartaSans-ExtraBold.ttf")),
  readFile(join(root, "assets/fonts/Inter-Medium.ttf")),
]);
const logoHeight = 76;

const image = h(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "64px 80px 0",
      background: "linear-gradient(160deg, #eef4ff 0%, #ffffff 55%, #ecfeff 100%)",
      fontFamily: "Inter",
      position: "relative",
    },
  },
  // Soft cyan glow, top right
  h("div", {
    style: {
      position: "absolute",
      top: -220,
      right: -160,
      width: 640,
      height: 640,
      borderRadius: 9999,
      background: "radial-gradient(circle, rgba(103,232,249,0.35) 0%, rgba(103,232,249,0) 70%)",
    },
  }),
  h("img", {
    src: `data:image/png;base64,${logo.toString("base64")}`,
    alt: "",
    width: Math.round((logoHeight * LOGO.width) / LOGO.height),
    height: logoHeight,
  }),
  h(
    "div",
    { style: { display: "flex", flexDirection: "column", maxWidth: 960, marginBottom: 40 } },
    // Two deliberate lines so the headline never breaks awkwardly
    h(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          fontFamily: "Plus Jakarta Sans",
          fontSize: 80,
          lineHeight: 1.08,
          letterSpacing: -2,
          color: navy,
        },
      },
      h("span", null, "Smartare Jobbsökande"),
      h("div", { style: { display: "flex" } }, h("span", null, "Med "), h("span", { style: { color: brand } }, "Ansök AI")),
    ),
    h(
      "div",
      { style: { marginTop: 28, fontSize: 32, lineHeight: 1.4, color: slate } },
      "AI-driven hjälp för att hitta relevanta jobb och förenkla ansökningsprocessen.",
    ),
  ),
  // Brand accent bar: blue → cyan
  h("div", {
    style: {
      display: "flex",
      margin: "0 -80px",
      height: 12,
      background: "linear-gradient(90deg, #1d55eb 0%, #0284c7 55%, #06b6d4 100%)",
    },
  }),
);

const response = new ImageResponse(image, {
  ...size,
  fonts: [
    { name: "Plus Jakarta Sans", data: jakarta, style: "normal", weight: 800 },
    { name: "Inter", data: inter, style: "normal", weight: 500 },
  ],
});
const png = Buffer.from(await response.arrayBuffer());

const outDir = join(root, "app");
await mkdir(outDir, { recursive: true });
for (const name of ["opengraph-image", "twitter-image"]) {
  await writeFile(join(outDir, `${name}.png`), png);
  await writeFile(join(outDir, `${name}.alt.txt`), alt);
  console.log(`wrote app/${name}.png (${png.length} bytes) + app/${name}.alt.txt`);
}
