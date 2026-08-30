import type { PageData, SiteSettings } from "./types";

export const fallbackSiteSettings: SiteSettings = {
  pageLabels: {
    intro: { ko: "Intro", en: "Intro" },
    product: { ko: "Product", en: "Product" },
    contact: { ko: "Contact", en: "Contact" },
  },
  navigation: {
    daily: { ko: "하루", en: "Daily" },
    products: { ko: "제품", en: "Products" },
    life: { ko: "삶", en: "Life" },
  },
  language: { korean: "한국어", english: "English" },
  intro: {
    scenes: [
      { _key: "i", symbol: "i + i + i + i +", title: { ko: "", en: "" }, body: { ko: "우리의 삶은 수많은 기억들로 이루어져 있습니다.\n우리는 그것들을 i라고 부릅니다.", en: "Our lives are made of countless memories.\nWe call them i." }, visual: "wake" },
      { _key: "log-i", symbol: "logi = log + i", title: { ko: "", en: "" }, body: { ko: "기억의 조각돌 logi는 늘 당신의 곁에서 흘러가는 i들을 조용히 간직합니다.", en: "The memory pebble logi quietly keeps the passing i beside you." }, visual: "family" },
      { _key: "log-us", symbol: "logUs", title: { ko: "", en: "" }, body: { ko: "저마다 다른 logi들이 모여, 당신과 우리의 이야기 logUs가 됩니다.", en: "Different logi gather and become logUs, a story shared by you and us." }, visual: "commute" },
      { _key: "studio", symbol: "logUs Studio", title: { ko: "", en: "" }, body: { ko: "흘러가는 삶의 순간들이 오래 남도록, 다양한 이야기를 만듭니다.", en: "We make diverse stories so life's passing moments can remain." }, visual: "later" },
    ],
  },
  daily: {
    eyebrow: { ko: "01 · 하루", en: "01 · Daily" },
    title: { ko: "작은 순간이\n당신의 이야기가 됩니다.", en: "The little becomes\nyour story." },
    body: { ko: "당신은 오늘을 살아가세요. logi는 그 곁에서 흘러나온 작은 기록 조각을 조용히 모읍니다.", en: "You live your day. logi quietly gathers the little pieces that would otherwise slip away." },
    cta: { ko: "하루를 따라가 보기", en: "Follow an ordinary day" },
    journeyLabel: { ko: "아침부터 밤까지", en: "From morning to night" },
    scenes: [
      { _key: "wake", time: "07:10", title: { ko: "눈을 뜨는 아침", en: "A quiet morning" }, copy: { ko: "익숙한 햇살이 방 안으로 들어옵니다.", en: "Familiar light finds its way into the room." }, visual: "wake" },
      { _key: "meal", time: "07:35", title: { ko: "서둘러 먹는 아침", en: "Breakfast in a hurry" }, copy: { ko: "따뜻한 한 입과 짧은 인사가 남습니다.", en: "A warm bite and a small hello remain." }, visual: "meal" },
      { _key: "commute", time: "08:40", title: { ko: "오늘로 향하는 길", en: "On the way into today" }, copy: { ko: "늘 걷던 길에도 계절은 조금씩 바뀝니다.", en: "Even the familiar road changes with the season." }, visual: "commute" },
      { _key: "work", time: "10:20", title: { ko: "몰입하는 시간", en: "A moment of focus" }, copy: { ko: "작은 시도 하나가 오늘을 앞으로 움직입니다.", en: "One small attempt moves the day forward." }, visual: "work" },
      { _key: "lunch", time: "12:30", title: { ko: "함께 나눈 점심", en: "Lunch, shared" }, copy: { ko: "무심코 터진 웃음이 오래 기억됩니다.", en: "An unexpected laugh stays longer than expected." }, visual: "lunch" },
      { _key: "home", time: "18:40", title: { ko: "돌아오는 발걸음", en: "The way back home" }, copy: { ko: "하루의 긴장이 현관 앞에서 천천히 풀립니다.", en: "The day loosens its grip at the front door." }, visual: "home" },
      { _key: "family", time: "20:10", title: { ko: "우리의 저녁", en: "An evening together" }, copy: { ko: "대단하지 않아 더 소중한 시간이 흐릅니다.", en: "Nothing grand. That is what makes it precious." }, visual: "family" },
      { _key: "night", time: "22:20", title: { ko: "오늘을 꺼내보는 밤", en: "Looking back at today" }, copy: { ko: "logi가 모은 작은 조각들이 하나의 이야기가 됩니다.", en: "The little pieces logi kept become one story." }, visual: "night" },
    ],
    closingTitle: { ko: "평범했던 하루가\n다시 꺼내볼 수 있는 이야기가 됩니다.", en: "An ordinary day becomes\na story you can return to." },
    closingBody: { ko: "하나의 i가 모이고, 우리가 되고, 당신의 story가 됩니다.", en: "One little i meets another, becomes us, and stays as your story." },
  },
  products: {
    eyebrow: { ko: "02 · 제품", en: "02 · Products" },
    title: { ko: "순간마다,\n기록을 돕는 방법도 다르니까.", en: "Different moments need\ndifferent ways to be kept." },
    body: { ko: "logUs의 제품은 더 많은 일을 시키지 않습니다. 삶의 곁에서, 필요한 순간을 조용히 남깁니다.", en: "logUs products do not ask you to do more. They stay close and help the right moments remain." },
    transitionTitle: { ko: "하루 끝, logi의 주머니가 열립니다.", en: "At the end of the day, logi opens its pocket." },
    transitionBody: { ko: "모아둔 조각 사이에서 서로 다른 순간을 돕는 작은 logi들이 나타납니다.", en: "From the pieces appear little logis, each made to care for a different kind of moment." },
    comingSoon: { ko: "곧 만나요", en: "Coming soon" },
    visitProduct: { ko: "제품 보기", en: "Visit product" },
    guide: { ko: "이미지를 클릭해 서비스를 만나보세요.", en: "Click each image to meet the service." },
    lead: { ko: "삶 속에서", en: "In life" },
    support: { ko: "우리의 곁에 있는 logi를 만나보세요.", en: "Meet logi by our side." },
  },
  life: {
    eyebrow: { ko: "03 · 삶", en: "03 · Life" },
    title: { ko: "하루가 쌓여,\n한 사람의 삶이 됩니다.", en: "Days gather\ninto a life." },
    body: { ko: "아래로 흐르는 시간 속에서, 작은 기록을 받을 때마다 logi의 이야기도 함께 자랍니다.", en: "As time moves downward, every little piece helps logi—and the story—grow." },
    stages: [
      { _key: "baby", age: { ko: "첫날들", en: "First days" }, title: { ko: "처음 마주한 얼굴", en: "The first familiar face" }, copy: { ko: "작은 숨과 서툰 품이 서로를 기억합니다.", en: "Tiny breaths and uncertain arms learn each other." }, visual: "baby" },
      { _key: "kindergarten", age: { ko: "유년", en: "Early years" }, title: { ko: "처음 혼자 내딛는 발", en: "The first steps alone" }, copy: { ko: "잠깐의 헤어짐과 반가운 재회가 하루를 채웁니다.", en: "Small goodbyes and bright reunions fill the day." }, visual: "kindergarten" },
      { _key: "school", age: { ko: "초등학교", en: "School days" }, title: { ko: "친구라는 세계", en: "A world called friendship" }, copy: { ko: "운동장과 공책 사이로 새로운 이야기가 생깁니다.", en: "New stories appear between playgrounds and notebooks." }, visual: "school" },
      { _key: "teen", age: { ko: "사춘기", en: "Growing up" }, title: { ko: "조금씩 나를 알아가는 중", en: "Becoming myself" }, copy: { ko: "흔들리는 마음도 지나고 보면 성장의 기록입니다.", en: "Even uncertain feelings become a record of growth." }, visual: "teen" },
      { _key: "university", age: { ko: "청춘", en: "Young days" }, title: { ko: "넓어진 세상", en: "A wider world" }, copy: { ko: "낯선 길과 새로운 선택이 나만의 방향을 만듭니다.", en: "New roads and choices begin to shape a direction." }, visual: "university" },
      { _key: "work", age: { ko: "첫 직장", en: "First work" }, title: { ko: "다시 배우는 시작", en: "Beginning again" }, copy: { ko: "잘한 날과 서툰 날이 함께 한 사람을 단단하게 합니다.", en: "Good days and clumsy days make a person steadier." }, visual: "work" },
      { _key: "family", age: { ko: "사랑과 가족", en: "Love & family" }, title: { ko: "함께 살아가는 시간", en: "A life shared" }, copy: { ko: "평범한 식탁과 기다리는 불빛이 삶의 중심이 됩니다.", en: "An ordinary table and a waiting light become home." }, visual: "family" },
      { _key: "later", age: { ko: "그 이후", en: "Later years" }, title: { ko: "여전히 이어지는 이야기", en: "The story still continues" }, copy: { ko: "모아온 순간들은 사라지지 않고 다음 장면을 비춥니다.", en: "The moments kept along the way light what comes next." }, visual: "later" },
    ],
    closingTitle: { ko: "당신은 삶을 계속 살아갑니다.\n우리는 그 곁에 있습니다.", en: "You keep living.\nWe stay beside the story." },
    closingBody: { ko: "logUs는 삶을 방해하지 않습니다. 작은 순간이 사라지지 않도록 조용히 함께합니다.", en: "logUs never gets in the way of life. We simply help the little things stay." },
  },
  contact: {
    eyebrow: { ko: "엔딩 크레딧", en: "End credits" },
    label: { ko: "Contact", en: "Contact" },
    title: { ko: "함께 남기고 싶은\n이야기가 있나요?", en: "Is there a story\nyou would like to keep?" },
    body: { ko: "서비스, 협업 또는 logUs Studio에 관해 함께 나누고 싶은 이야기를 남겨주세요.", en: "Leave us a story about a service, a collaboration, or something you would like to share with logUs Studio." },
    email: "logus.naro@gmail.com",
    location: { ko: "대한민국에서 만들고 있습니다.", en: "Made in Korea." },
    copyright: { ko: "© 2026 logUs Studio. 작은 순간을 기록합니다.", en: "© 2026 logUs Studio. Keeping the little things." },
  },
  metadata: {
    title: { ko: "logUs Studio — 작은 순간이 당신의 이야기가 됩니다.", en: "logUs Studio — The little becomes your story." },
    description: { ko: "사람의 평범한 하루와 삶의 작은 순간이 사라지지 않도록 돕는 소프트웨어 스튜디오입니다.", en: "A software studio building quiet products that help the little moments of life remain." },
  },
};

export const fallbackPageData: PageData = {
  source: "fallback",
  settings: fallbackSiteSettings,
  products: [
    {
      _id: "fallback-bebe",
      name: "bebe",
      displayName: "[:] bebe",
      description: "A little app for remembering your baby's everyday moments.",
      displayNameI18n: { ko: "[:] bebe", en: "[:] bebe" },
      descriptionI18n: { ko: "아이와 함께한 평범한 하루가 사라지지 않도록 돕는 육아 기록 앱입니다.", en: "A gentle parenting journal for keeping the ordinary days with your child." },
      categoryI18n: { ko: "육아 기록", en: "Parenting journal" },
      status: "published",
      sortOrder: 0,
    },
  ],
  socialLinks: [
    { _id: "fallback-threads", platform: "threads", url: "https://www.threads.com/@logus.naro", status: "published", sortOrder: 0 },
  ],
};
