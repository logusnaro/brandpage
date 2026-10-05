/* Deterministic, reusable film timelines. Screens contain local example data only. */
const scene=(tag,title,body,image,screen=false)=>({tag,title,body,image,screen});
const apps={
 memogrip:{name:'MemoGrip',accent:'#84632e',bg:'#f6f0e5',music:'Toys Are Us - Blue Deer Studio.mp3',hero:'/apps-art/memogrip-room-v2.webp',
 intro:[
  scene('생각을 놓치지 않는 방법','떠오를 때,\n일단 적어요.','정리부터 고민하지 않아도 괜찮아요.','/apps-art/memogrip-room-v2.webp'),
  scene('적는 건 가볍게','한 줄의 메모가\n내일의 일정으로.','“내일 오후 2시 팀 회의”를 적어보세요.','memogrip-input',true),
  scene('흩어진 생각을 한곳에','일정 · 아이디어 · 노트','규칙 기반 분류와 AI 정리로, 다시 찾기 쉽게.','memogrip-saved',true),
  scene('MemoGrip','생각은 자유롭게.\n기록은 든든하게.','흘러가는 생각을 붙잡는 나만의 기록 공간.','/apps-art/memogrip-feature-3.webp')],
 guide:[
  scene('01 / 메모 입력','떠오른 생각을\n그대로 적어요.','하단 입력창에 “내일 오후 2시 팀 회의”.','memogrip-input',true),
  scene('02 / 저장과 분류','저장하면,\n일정으로 정리돼요.','날짜와 시간이 포함된 메모는 규칙으로 분류해요.','memogrip-saved',true),
  scene('03 / 플래너','다가오는 약속을\n한눈에 살펴봐요.','플래너에서 모아둔 일정을 확인하세요.','memogrip-planner',true),
  scene('04 / 생각 모으기','아이디어는\n아이디어끼리.','아이디어 탭과 폴더에서 생각을 이어가세요.','memogrip-ideas',true),
  scene('05 / 다시 찾기','필요할 때,\n꺼내 볼 수 있도록.','노트와 기록 탭에서 남긴 메모를 돌아봐요.','memogrip-notes',true)]},
 goodgo:{name:'GOODgo',accent:'#397069',bg:'#eef5ef',music:'Robot Boogie - Quincas Moreira.mp3',hero:'/apps-art/goodgo-room-v2.webp',
 intro:[
  scene('밖으로 나가는 하루의 시작','몇 시에\n준비하면 될까?','도착하고 싶은 시간부터 시작해요.','/apps-art/goodgo-room-v2.webp'),
  scene('도착 시간에서 거꾸로','준비부터 출발까지,\n시간을 역산해요.','이동 · 여유 · 준비 시간을 함께 계산해요.','goodgo-home',true),
  scene('마음 놓고 나갈 수 있도록','챙길 것까지,\n빠짐없이.','체크리스트와 저장한 폴더로 외출 준비를 가볍게.','goodgo-checked',true),
  scene('GOODgo','준비는 차분하게.\n출발은 가볍게.','나가기 전의 작은 걱정을 덜어주는 외출 동반자.','/apps-art/goodgo-feature-3.webp')],
 guide:[
  scene('01 / 일정 열기','언제, 어디로\n갈지 정해요.','일정 수정에서 약속 시간과 장소를 입력하세요.','goodgo-edit',true),
  scene('02 / 시간 확인','이동 시간에\n여유를 더해요.','준비 시작과 출발 시간을 한 화면에서 확인해요.','goodgo-home',true),
  scene('03 / 준비물 확인','챙긴 것은\n하나씩 체크해요.','우산처럼 필요한 물건은 준비 후 완료 표시.','goodgo-checked',true),
  scene('04 / 폴더 불러오기','자주 쓰는 준비물,\n다시 쓰면 편해요.','폴더 불러오기에서 외출에 맞는 목록을 골라요.','goodgo-folders',true),
  scene('05 / 하루 살펴보기','오늘의 외출을\n차분히 시작해요.','일정 화면에서 준비한 약속을 돌아보세요.','goodgo-schedule',true)]},
 bookbap:{name:'BookBap',accent:'#846141',bg:'#f5efe7',music:'Paseo Nocturno - Luna Cantina.mp3',hero:'/apps-art/bookbap-room-v2.webp',
 intro:[
  scene('책장을 덮은 뒤에도','좋았던 문장이\n오래 남도록.','읽은 책 너머, 내 생각까지 간직해요.','/apps-art/bookbap-room-v2.webp'),
  scene('나만의 책장','읽고 있는 책을\n한곳에 모아요.','책과 읽는 상태를 차곡차곡 기록해요.','bookbap-books',true),
  scene('문장에 나를 더하기','마음에 남은 문장.\n그때의 내 생각.','문장과 메모를 나만의 자산으로 모아보세요.','bookbap-assets',true),
  scene('BookBap','책을 읽는 시간,\n나를 쌓는 시간.','독서의 순간을 오래 간직하는 나만의 기록 공간.','/apps-art/bookbap-feature-3.webp')],
 guide:[
  scene('01 / 나의 책장','Books에서\n책을 살펴봐요.','읽고 싶은 책, 읽는 책, 읽은 책을 한곳에.','bookbap-books',true),
  scene('02 / 기록 시작','Record에서\n남길 기록을 골라요.','책 추가 · 메모 남기기 · 독서 진척도.','bookbap-record',true),
  scene('03 / 문장과 생각','좋았던 문장에\n내 생각을 더해요.','Assets에서 모아둔 문장과 메모를 확인하세요.','bookbap-assets',true),
  scene('04 / 나의 독서','얼마나 읽었는지,\n돌아볼 수 있도록.','My Reading에서 나의 독서 기록을 살펴봐요.','bookbap-reading',true),
  scene('05 / 다시 꺼내기','책장을 덮어도,\n이야기는 남아요.','Home에서 이어 읽을 책과 남긴 기록을 만나세요.','bookbap-home',true)]}
};
const variants=[['intro',20,'landscape','짧은 소개'],['guide',35,'landscape','기능 가이드'],['full',90,'landscape','소개 + 가이드'],['vertical-intro',20,'portrait','세로 소개'],['vertical-guide',35,'portrait','세로 가이드']];
const jobs=Object.entries(apps).flatMap(([app,a])=>variants.map(([kind,duration,aspect,label])=>({key:`${app}-${kind}`,app,kind,duration,aspect,label,name:a.name,scenes:kind==='full'?[...a.intro.slice(0,3),...a.guide,a.intro[3]]:kind.includes('guide')?a.guide:a.intro})));
globalThis.FILMS={apps,jobs};
if(typeof module!=='undefined')module.exports=globalThis.FILMS;
