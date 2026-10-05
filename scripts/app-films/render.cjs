const fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process'),{once}=require('node:events'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'../..'),out=path.join(root,'public/films/apps-2026-10-06'),work=path.join(root,'artifacts/app-films-2026-10-06');
const {apps,jobs}=require(path.join(out,'storyboard.js')),fps=24;
const ff='C:/Users/jkhon/.codex/visualizations/2026/08/23/01a02efd-8933-7fb1-8295-35c1cad10105/intro-video-runtime/imageio_ffmpeg/binaries/ffmpeg-win-x86_64-v7.1.exe';
const exe='C:/Users/jkhon/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe';
async function run(args){const p=spawn(ff,['-hide_banner','-loglevel','error',...args]);let error='';p.stderr.on('data',d=>error+=d);p.stdout.resume();const [code]=await once(p,'close');if(code)throw Error(error||'ffmpeg failed '+code);return error}
function timestamp(sec){const ms=Math.round(sec*1000);return [Math.floor(ms/3600000),Math.floor(ms/60000)%60,Math.floor(ms/1000)%60].map(n=>String(n).padStart(2,'0')).join(':')+','+String(ms%1000).padStart(3,'0')}
(async()=>{fs.mkdirSync(work,{recursive:true});const browser=await chromium.launch({headless:true,executablePath:exe});const results=[];let cursor=0;
 try{await Promise.all(Array.from({length:2},async()=>{const page=await browser.newPage();await page.goto('http://127.0.0.1:8780/films/apps-2026-10-06/movie.html');await page.evaluate(()=>window.ready);
  while(cursor<jobs.length){const job=jobs[cursor++],filename=job.key+'.mp4',target=path.join(out,filename),silent=path.join(work,job.key+'-silent.mp4');
   console.log('START '+job.key);const p=spawn(ff,['-hide_banner','-loglevel','error','-y','-f','image2pipe','-vcodec','mjpeg','-framerate',String(fps),'-i','pipe:0','-an','-vf','scale=in_range=full:out_range=tv:in_color_matrix=bt601:out_color_matrix=bt709,format=yuv420p','-c:v','libx264','-preset','fast','-crf','19','-threads','2','-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-movflags','+faststart',silent]);let errors='';p.stderr.on('data',d=>errors+=d);const closed=once(p,'close');p.stdin.on('error',()=>{});
   for(let frame=0;frame<job.duration*fps;frame++){const data=await page.evaluate(({key,t})=>{const check=window.renderFrame(key,t);if(check.issues.length)throw Error(JSON.stringify(check.issues));return window.frameJPEG()},{key:job.key,t:frame/fps});if(!p.stdin.write(Buffer.from(data,'base64')))await once(p.stdin,'drain');if(frame%240===0)console.log(job.key+' '+Math.round(frame/(job.duration*fps)*100)+'%')}
   p.stdin.end();const [code]=await closed;if(code)throw Error(errors);
   const music=path.join(root,'../../07_music',apps[job.app].music);
   await run(['-y','-i',silent,'-stream_loop','-1','-i',music,'-map','0:v:0','-map','1:a:0','-c:v','copy','-af',`loudnorm=I=-19:TP=-1.5:LRA=10,afade=t=in:d=0.6,afade=t=out:st=${job.duration-1.8}:d=1.8`,'-c:a','aac','-b:a','192k','-ar','48000','-ac','2','-t',String(job.duration),'-movflags','+faststart',target]);
   await run(['-i',target,'-map','0:v:0','-map','0:a:0','-f','null','-']);
   for(const [label,t]of [['poster',2],['end',job.duration-.3]]){const jpg=await page.evaluate(({key,t})=>{window.renderFrame(key,t);return window.frameJPEG()},{key:job.key,t});fs.writeFileSync(path.join(label==='poster'?out:work,job.key+'-'+label+'.jpg'),Buffer.from(jpg,'base64'))}
   const d=job.duration/job.scenes.length;fs.writeFileSync(path.join(out,job.key+'.srt'),job.scenes.map((s,i)=>`${i+1}\n${timestamp(i*d)} --> ${timestamp((i+1)*d)}\n${s.title.replaceAll('\n',' ')}\n${s.body}\n`).join('\n'));
   const row={key:job.key,file:filename,app:job.app,label:job.label,duration:job.duration,aspect:job.aspect,width:job.aspect==='portrait'?1080:1920,height:job.aspect==='portrait'?1920:1080,fps,bytes:fs.statSync(target).size,music:apps[job.app].music,decode:'PASS',safeText:'PASS',poster:job.key+'-poster.jpg'};results.push(row);fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(results,null,2));console.log('DONE '+job.key);
  }await page.close();}));
 }finally{await browser.close()}
 console.log('ALL '+results.length+' films validated');
})().catch(e=>{console.error(e);process.exitCode=1});
