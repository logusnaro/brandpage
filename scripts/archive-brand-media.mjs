import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const root = path.resolve('../..');
const output = path.join(root, '08_sources/brandpage');
const sources = [
  ['site', path.resolve('public')],
  ['designs', path.resolve('docs/designs')],
  ['generated', 'C:/Users/jkhon/.codex/generated_images/01a02efd-8933-7fb1-8295-35c1cad10105'],
  ['production', 'C:/Users/jkhon/.codex/visualizations/2026/08/23/01a02efd-8933-7fb1-8295-35c1cad10105'],
];
const image = /\.(png|jpe?g|webp|gif|svg|avif)$/i;
const video = /\.(mp4|webm|mov|m4v|srt)$/i;
const seen = new Map(), files = [];
async function scan(dir, label, base) {
  for (const entry of await fs.readdir(dir, {withFileTypes:true}).catch(()=>[])) {
    if (entry.isSymbolicLink()) continue;
    const source = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!/(node_modules|runtime|\.git|deploy|\.next|venv|site-packages)/i.test(entry.name)) await scan(source,label,base);
      continue;
    }
    const kind = image.test(entry.name) ? 'images' : video.test(entry.name) ? 'videos' : null;
    if (!kind) continue;
    const data = await fs.readFile(source), sha256 = crypto.createHash('sha256').update(data).digest('hex');
    let target = seen.get(sha256);
    if (!target) {
      target = path.join(output,kind,label,path.relative(base,source));
      await fs.mkdir(path.dirname(target),{recursive:true});
      await fs.copyFile(source,target);
      seen.set(sha256,target);
    }
    files.push({source,target,kind,bytes:data.length,sha256});
  }
}
for (const [label,source] of sources) await scan(source,label,source);
await fs.mkdir(output,{recursive:true});
await fs.writeFile(path.join(output,'manifest.json'),JSON.stringify({archivedAt:new Date().toISOString(),uniqueFiles:seen.size,files},null,2));
console.log(JSON.stringify({output,uniqueFiles:seen.size,sourceFiles:files.length,images:files.filter(f=>f.kind==='images').length,videos:files.filter(f=>f.kind==='videos').length}));
