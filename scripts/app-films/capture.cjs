const {chromium}=require('playwright'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'../..'),out=path.join(root,'public/films/apps-2026-10-06/screens');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:'C:/Users/jkhon/AppData/Local/ms-playwright/chromium-1234/chrome-win64/chrome.exe'}),report={};
 try{for(const [app,url]of [['memogrip','http://127.0.0.1:8781'],['goodgo','http://127.0.0.1:8780/goodgo-preview'],['bookbap','http://127.0.0.1:8782']]){
  const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,timezoneId:'Asia/Seoul'}),p=await c.newPage(),errors=[];let blocked=0;
  p.on('pageerror',e=>errors.push(e.message));await p.route('**/*',r=>{if(['127.0.0.1','localhost'].includes(new URL(r.request().url()).hostname))return r.continue();blocked++;return r.abort()});
  await p.addInitScript(()=>{const D=Date,epoch=new D('2026-10-06T10:30:00+09:00').getTime();window.Date=class extends D{constructor(...a){super(...(a.length?a:[epoch]))}static now(){return epoch}}});
  await p.goto(url);await p.waitForFunction(()=>document.body.innerText.trim().length>30,{},{timeout:45000});
  await p.addStyleTag({content:'@font-face{font-family:FilmPretendard;src:url(http://127.0.0.1:8780/films/apps-2026-10-06/assets/PretendardVariable.woff2);font-weight:100 900}body,button,input,textarea{font-family:FilmPretendard,sans-serif!important}'});await p.evaluate(()=>document.fonts.ready);
  const shot=async(name)=>{await p.waitForTimeout(250);await p.screenshot({path:path.join(out,app+'-'+name+'.png')});console.log(app+'-'+name)};
  await shot('home');
  if(app==='memogrip'){
   console.log('INPUTS '+JSON.stringify(await p.locator('textarea,input').evaluateAll(a=>a.map(e=>({placeholder:e.getAttribute('placeholder'),aria:e.getAttribute('aria-label')})))));
   await p.locator('textarea').last().fill('내일 오후 2시 팀 회의');await shot('input');
   await p.locator('button.send-btn').last().click();await p.waitForTimeout(250);await shot('saved');
   for(const [name,label]of [['planner','플래너'],['ideas','아이디어'],['notes','노트'],['history','기록']]){await p.locator('.tabnav-item').filter({hasText:label}).click();await shot(name)}
  }else if(app==='goodgo'){
   await p.getByRole('button',{name:'일정 수정',exact:true}).click();await shot('edit');
   console.log('GOOD FORM '+JSON.stringify(await p.locator('input,select').evaluateAll(a=>a.map(e=>({id:e.id,type:e.type,value:e.value})))));
   await p.keyboard.press('Escape');await p.goto(url);await p.getByRole('button',{name:'완료 표시: 접이식 우산',exact:true}).click();await shot('checked');
   await p.locator('#main').evaluate(e=>e.scrollTop=630);await shot('checklist');await p.getByRole('button',{name:'폴더 불러오기',exact:true}).click();await shot('folders');
   await p.goto(url);await p.locator('[data-page="schedule"]').click();await shot('schedule');
  }else{
   await p.getByRole('button',{name:'Books',exact:true}).click();await shot('books');
   await p.getByRole('button',{name:'Record 메뉴 열기'}).click();await shot('record');
   console.log('BOOK MENU '+await p.locator('body').innerText());
   await p.keyboard.press('Escape');await p.goto(url);await p.getByRole('button',{name:'Assets',exact:true}).click();await shot('assets');
   await p.getByRole('button',{name:'My Reading',exact:true}).click();await shot('reading');
   console.log('BOOK BUTTONS '+JSON.stringify(await p.locator('button').evaluateAll(a=>a.map(e=>({text:e.innerText,aria:e.getAttribute('aria-label')})).slice(-20))));
  }
  report[app]={errors,blockedExternalRequests:blocked,source:app==='goodgo'?'readygo/design-preview/index.html':app==='memogrip'?'memo/client/src; original UI and ruleClassify, in-memory fixture adapter':'bookbap/src/App.tsx; original UI and local demo state',productionDataWritten:false};await c.close();
 }
 fs.writeFileSync(path.join(root,'artifacts/app-films-2026-10-06/capture-report.json'),JSON.stringify(report,null,2));if(Object.values(report).some(r=>r.errors.length))throw Error(JSON.stringify(report));
 }finally{await b.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
