#!/usr/bin/env node

// Generates a multi-page Inkscape SVG file from a folder of PNG files.  Each
// PNG gets its own page, sized to the PNG and named after the file (without
// the extension), with the PNG embedded on it.  The pages are laid out
// vertically with a gap between them.
//
//   node pngs-to-svg.js <png-dir> [output-dir] [--gap <px>] [--force]
//
// The SVG file is named after the PNG folder (eg: ./dump/buttons/*.png gives
// buttons.svg) and is written to the output directory, which defaults to the
// current directory.  An existing file is only overwritten if --force is given.
//
// The document uses px units at a scale of 1, so one user unit is one pixel
// of the original PNGs.  This is the reverse of export-pages.js.

const fs = require('fs');
const path = require('path');

function usage(msg) {
    if (msg)
        console.error(`error: ${msg}\n`);
    console.error('usage: node pngs-to-svg.js <png-dir> [output-dir] [--gap <px>] [--force]');
    process.exit(msg ? 1 : 0);
}

function fail(msg) {
    console.error(`error: ${msg}`);
    process.exit(1);
}

// Parse command line
const files = [];
let gap = 32;
let force = false;
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
        usage();
    } else if (arg === '--force') {
        force = true;
    } else if (/^--gap([:=]|$)/.test(arg)) {
        // Value is either attached (--gap:16 or --gap=16) or the next arg
        let value;
        if (arg.length > 5) {
            value = arg.slice(6);
        } else {
            if (i + 1 >= args.length)
                usage('--gap requires a value');
            value = args[++i];
        }
        if (!/^\d+$/.test(value))
            usage(`invalid gap ${value}`);
        gap = parseInt(value, 10);
    } else if (arg.startsWith('--')) {
        usage(`unknown option ${arg}`);
    } else {
        files.push(arg);
    }
}
if (files.length < 1 || files.length > 2)
    usage('expected a png directory and an optional output directory');
const inputDir = path.resolve(files[0]);
const outputDir = files[1] || '.';
const outputFile = path.join(outputDir, `${path.basename(inputDir)}.svg`);

function escapeXml(str) {
    return str.replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[c]);
}

// Load the PNGs, in file name order
const pngSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
const images = fs.readdirSync(inputDir, { withFileTypes: true })
    .filter(e => e.isFile() && /\.png$/i.test(e.name))
    .map(e => e.name)
    .sort((a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : a.toLowerCase() > b.toLowerCase() ? 1 : 0)
    .map(name => {
        const data = fs.readFileSync(path.join(inputDir, name));

        // The size is in the IHDR chunk, which is always first
        if (data.length < 24 || !data.subarray(0, 8).equals(pngSignature) || data.toString('latin1', 12, 16) !== 'IHDR')
            fail(`${path.join(inputDir, name)}: not a PNG file`);
        return {
            name: path.basename(name, path.extname(name)),
            width: data.readUInt32BE(16),
            height: data.readUInt32BE(20),
            data,
        };
    });
if (images.length === 0)
    fail(`${inputDir}: no .png files found`);

if (!force && fs.existsSync(outputFile))
    fail(`${outputFile} already exists (use --force to overwrite)`);

// Lay the pages out vertically
let y = 0;
for (const image of images) {
    image.y = y;
    y += image.height + gap;
}

// The document size and viewBox are those of the first page
let svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="${images[0].width}"
   height="${images[0].height}"
   viewBox="0 0 ${images[0].width} ${images[0].height}"
   version="1.1"
   id="svg1"
   sodipodi:docname="${escapeXml(path.basename(outputFile))}"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:xlink="http://www.w3.org/1999/xlink"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <sodipodi:namedview
     id="namedview1"
     pagecolor="#ffffff"
     bordercolor="#666666"
     borderopacity="1.0"
     inkscape:showpageshadow="2"
     inkscape:pageopacity="0.0"
     inkscape:pagecheckerboard="0"
     inkscape:deskcolor="#d1d1d1"
     inkscape:document-units="px"
     inkscape:current-layer="layer1">
`;
images.forEach((image, i) => {
    svg += `    <inkscape:page
       x="0"
       y="${image.y}"
       width="${image.width}"
       height="${image.height}"
       id="page${i + 1}"
       margin="0"
       bleed="0"
       inkscape:label="${escapeXml(image.name)}" />
`;
});
svg += `  </sodipodi:namedview>
  <defs
     id="defs1" />
  <g
     inkscape:label="Layer 1"
     inkscape:groupmode="layer"
     id="layer1">
`;
images.forEach((image, i) => {
    svg += `    <image
       width="${image.width}"
       height="${image.height}"
       preserveAspectRatio="none"
       xlink:href="data:image/png;base64,${image.data.toString('base64')}"
       id="image${i + 1}"
       x="0"
       y="${image.y}" />
`;
});
svg += `  </g>
</svg>
`;

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputFile, svg, 'utf8');

for (const image of images)
    console.log(`${image.name}: ${image.width}x${image.height}`);
console.log(`${outputFile}: ${images.length} page(s)`);
