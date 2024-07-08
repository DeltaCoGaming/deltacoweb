// app/api/modder/route.ts

import { NextRequest, NextResponse } from 'next/server';
import formidable, { File, IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'public', 'mods');
const communityLinksFile = path.join(uploadDir, 'community_links.json');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

if (!fs.existsSync(communityLinksFile)) {
  fs.writeFileSync(communityLinksFile, JSON.stringify({ mods: [], communityLinks: [] }, null, 2));
}

export async function GET() {
  const rawData = fs.readFileSync(communityLinksFile, 'utf8');
  const { mods, communityLinks } = JSON.parse(rawData);

  const modFiles = fs.readdirSync(uploadDir).filter(file => file !== 'community_links.json');

  const detailedMods = modFiles.map(fileName => {
    const modDetail = mods.find((mod: any) => mod.filename === fileName);
    return {
      name: fileName,
      url: `/mods/${fileName}`,
      downloadable: modDetail ? modDetail.downloadable : false,
      ...modDetail,
    };
  });

  return NextResponse.json({ mods: detailedMods, communityLinks });
}

export async function POST(request: NextRequest) {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm({ uploadDir, keepExtensions: true });

    form.parse(request as any, (err, fields: any, files: any) => {
      if (err) {
        resolve(NextResponse.json({ error: 'Failed to upload file' }, { status: 500 }));
        return;
      }

      const rawData = fs.readFileSync(communityLinksFile, 'utf8');
      const data = JSON.parse(rawData);

      if (fields.type === 'community-link') {
        const newLink = {
          name: fields.name,
          description: fields.description,
          url: fields.url,
        };
        data.communityLinks.push(newLink);
      } else if (fields.type === 'mod') {
        const file: File = files.file[0];
        const newMod = {
          name: fields.name,
          description: fields.description,
          version: fields.version,
          category: fields.category,
          filename: file.newFilename,
          downloadable: fields.downloadable === 'true',
        };
        data.mods.push(newMod);
      }

      fs.writeFileSync(communityLinksFile, JSON.stringify(data, null, 2));
      resolve(NextResponse.json({ message: 'Upload successful' }));
    });
  }) as Promise<NextResponse>;
}
