#!/usr/bin/env node

import { readdir, open } from 'node:fs/promises';
import path from 'node:path';

const root = process.argv[2] ?? '.';

const DXGI_FORMATS = {
    70: 'BC1_TYPELESS',
    71: 'BC1_UNORM',
    72: 'BC1_SRGB',
    73: 'BC2_TYPELESS',
    74: 'BC2_UNORM',
    75: 'BC2_SRGB',
    76: 'BC3_TYPELESS',
    77: 'BC3_UNORM',
    78: 'BC3_SRGB',
    79: 'BC4_TYPELESS',
    80: 'BC4_UNORM',
    81: 'BC4_SNORM',
    82: 'BC5_TYPELESS',
    83: 'BC5_UNORM',
    84: 'BC5_SNORM',
    94: 'BC6H_TYPELESS',
    95: 'BC6H_UF16',
    96: 'BC6H_SF16',
    97: 'BC7_TYPELESS',
    98: 'BC7_UNORM',
    99: 'BC7_SRGB',
};

const FOURCC_FORMATS = {
    DXT1: 'BC1/DXT1',
    DXT2: 'BC2/DXT2-premultiplied',
    DXT3: 'BC2/DXT3',
    DXT4: 'BC3/DXT4-premultiplied',
    DXT5: 'BC3/DXT5',
    ATI1: 'BC4',
    BC4U: 'BC4_UNORM',
    BC4S: 'BC4_SNORM',
    ATI2: 'BC5',
    BC5U: 'BC5_UNORM',
    BC5S: 'BC5_SNORM',
    RXGB: 'ATI1N/RXGB',
};

async function getCompression(file) {
    let handle;

    try {
        handle = await open(file, 'r');

        const header = Buffer.alloc(148);
        const { bytesRead } = await handle.read(header, 0, 148, 0);

        if (bytesRead < 128 || header.toString('ascii', 0, 4) !== 'DDS ') {
            return 'INVALID';
        }

        // DDS_PIXELFORMAT starts at offset 76.
        const flags = header.readUInt32LE(80);
        const fourCC = header.toString('ascii', 84, 88);

        // DDPF_FOURCC
        if (flags & 0x4) {
            if (fourCC === 'DX10') {
                if (bytesRead < 148) return 'INVALID';

                const dxgi = header.readUInt32LE(128);
                return DXGI_FORMATS[dxgi] ?? `DXGI_${dxgi}`;
            }

            return FOURCC_FORMATS[fourCC] ?? `FOURCC_${fourCC}`;
        }

        const bitsPerPixel = header.readUInt32LE(88);
        return `UNCOMPRESSED_${bitsPerPixel}bpp`;
    } catch (error) {
        return `ERROR: ${error.message}`;
    } finally {
        await handle?.close();
    }
}

async function* walk(directory) {
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            yield* walk(fullPath);
        } else if (entry.isFile() && /\.dds$/i.test(entry.name)) {
            yield fullPath;
        }
    }
}

console.log(`${'COMPRESSION'.padEnd(30)} FILE`);
console.log(`${'-'.repeat(30)} ${'-'.repeat(40)}`);

for await (const file of walk(root)) {
    const compression = await getCompression(file);
    console.log(`${compression.padEnd(30)} ${file}`);
}
