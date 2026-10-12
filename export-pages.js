#!/usr/bin/env node

// Exports each page of a multi-page Inkscape SVG file as a separate PNG, named
// after the page's label (as set in Inkscape's page tool).
//
//   node export-pages.js input.svg [output-dir [dds-dir]]
//
// The output directory defaults to ./exported.  If a dds directory is given
// each exported PNG is also converted to a BC7 compressed .dds file (with no
// mip maps) in that directory.  After a successful export a
// touch file named <input>.touch is written to the output directory so make
// can tell when the pages need to be re-exported:
//
//   ./exported/input.touch: input.svg
//       node export-pages.js $< ./exported
//
// Requires inkscape (and bc7enc, if converting to .dds) to be on the path.

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

function usage(msg) {
    if (msg)
        console.error(`error: ${msg}\n`);
    console.error('usage: node export-pages.js <input.svg> [output-dir [dds-dir]]');
    process.exit(msg ? 1 : 0);
}

function fail(msg) {
    console.error(`error: ${msg}`);
    process.exit(1);
}

// Parse command line
const files = [];
for (const arg of process.argv.slice(2)) {
    if (arg === '--help' || arg === '-h')
        usage();
    else if (arg.startsWith('--'))
        usage(`unknown option ${arg}`);
    else
        files.push(arg);
}
if (files.length < 1 || files.length > 3)
    usage('expected an input file, an optional output directory and an optional dds directory');
const inputFile = files[0];
const outputDir = files[1] || './exported';
const ddsDir = files[2];

function run(cmd, args) {
    const r = spawnSync(cmd, args, { stdio: 'inherit' });
    if (r.error)
        fail(`failed to run ${cmd}: ${r.error.message}`);
    if (r.status !== 0)
        fail(`${cmd} exited with code ${r.status}`);
}

function decodeEntities(str) {
    return str.replace(/&(#x[0-9a-f]+|#\d+|lt|gt|amp|quot|apos);/gi, (m, e) => {
        switch (e.toLowerCase()) {
            case 'lt': return '<';
            case 'gt': return '>';
            case 'amp': return '&';
            case 'quot': return '"';
            case 'apos': return "'";
        }
        return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    });
}

// Find the pages, in document order (which is Inkscape's page order)
const rxPage = /<inkscape:page((?:\s+[^\s=<>\/]+\s*=\s*(?:"[^"]*"|'[^']*'))*)\s*\/?>/g;
const rxAttr = /\s+([^\s=<>\/]+)\s*=\s*(["'])([\s\S]*?)\2/g;

const input = fs.readFileSync(inputFile, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
const pages = [...input.matchAll(rxPage)].map((m, i) => {
    const attrs = {};
    for (const a of m[1].matchAll(rxAttr))
        attrs[a[1]] = decodeEntities(a[3]);
    return { number: i + 1, id: attrs['id'], name: (attrs['inkscape:label'] || '').trim() };
});
if (pages.length === 0)
    fail(`${inputFile}: no pages found`);

// Check the page names are usable as file names
const seen = new Map();
for (const page of pages) {
    if (page.name === '')
        fail(`${inputFile}: page ${page.number} (${page.id}) has no name`);
    if (/[<>:"\/\\|?*\x00-\x1f]/.test(page.name) || /[. ]$/.test(page.name))
        fail(`${inputFile}: page ${page.number} name "${page.name}" can't be used as a file name`);
    const key = page.name.toLowerCase();
    if (seen.has(key))
        fail(`${inputFile}: pages ${seen.get(key)} and ${page.number} are both named "${page.name}"`);
    seen.set(key, page.number);
    page.file = path.join(outputDir, `${page.name}.png`);
    if (ddsDir)
        page.ddsFile = path.join(ddsDir, `${page.name}.dds`);
}

fs.mkdirSync(outputDir, { recursive: true });
if (ddsDir)
    fs.mkdirSync(ddsDir, { recursive: true });

// Export each page (Inkscape has no action for selecting the page, so this
// needs a separate run per page)
for (const page of pages) {
    // Remove the old file so we can tell if Inkscape failed to write it
    fs.rmSync(page.file, { force: true });

    run('inkscape', [inputFile, `--export-page=${page.number}`, `--export-filename=${page.file}`]);
    if (!fs.existsSync(page.file))
        fail(`inkscape didn't write ${page.file}`);
    console.log(`${inputFile}: page ${page.number} -> ${page.file}`);

    if (ddsDir) {
        fs.rmSync(page.ddsFile, { force: true });
        run('bc7enc', ['-q', '-g', page.file, page.ddsFile]);
        if (!fs.existsSync(page.ddsFile))
            fail(`bc7enc didn't write ${page.ddsFile}`);
        console.log(`${page.file} -> ${page.ddsFile}`);
    }
}

// Only written once everything has been exported and converted
const touchFile = path.join(outputDir, `${path.basename(inputFile, path.extname(inputFile))}.touch`);
fs.writeFileSync(touchFile, '');
