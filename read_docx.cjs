const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

function extractDocxText(docxPath) {
  try {
    const buffer = fs.readFileSync(docxPath);
    const filename = 'word/document.xml';
    const filenameBuf = Buffer.from(filename);
    const fnIndex = buffer.indexOf(filenameBuf);
    
    if (fnIndex === -1) {
      console.log(`Could not find ${filename} in zip structure.`);
      return '';
    }
    
    let headerOffset = -1;
    for (let i = fnIndex - 30; i >= 0 && i >= fnIndex - 100; i--) {
      if (buffer[i] === 0x50 && buffer[i+1] === 0x4b && buffer[i+2] === 0x03 && buffer[i+3] === 0x04) {
        headerOffset = i;
        break;
      }
    }
    
    if (headerOffset === -1) {
      console.log('Could not find local file header for word/document.xml');
      return '';
    }
    
    const compressionMethod = buffer.readUInt16LE(headerOffset + 8);
    const compressedSize = buffer.readUInt32LE(headerOffset + 18);
    const filenameLength = buffer.readUInt16LE(headerOffset + 26);
    const extraFieldLength = buffer.readUInt16LE(headerOffset + 28);
    
    const dataOffset = headerOffset + 30 + filenameLength + extraFieldLength;
    const compressedData = buffer.slice(dataOffset, dataOffset + compressedSize);
    
    let xmlText = '';
    if (compressionMethod === 8) {
      xmlText = zlib.inflateRawSync(compressedData).toString('utf8');
    } else if (compressionMethod === 0) {
      xmlText = compressedData.toString('utf8');
    } else {
      console.log('Unknown compression method: ' + compressionMethod);
      return '';
    }
    
    const matches = xmlText.match(/<w:t[^>]*>(.*?)<\/w:t>/g) || [];
    const text = matches.map(m => m.replace(/<[^>]+>/g, '')).join(' ');
    return text;
  } catch (err) {
    console.error('Error reading docx:', err);
    return '';
  }
}

const docxFile = process.argv[2];
if (!docxFile) {
  console.log('Provide a docx file path.');
  process.exit(1);
}

const extractedText = extractDocxText(docxFile);
console.log('--- EXTRACTED TEXT START ---');
console.log(extractedText);
console.log('--- EXTRACTED TEXT END ---');
