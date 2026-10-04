import type { Product, LocalizedText } from "../sanity/lib/types";

type Feature = { title: LocalizedText; body: LocalizedText; image: string };
type Room = {
  hero: string;
  headline: LocalizedText;
  intro: LocalizedText;
  videoHeading: LocalizedText;
  videoBody: LocalizedText;
  featureHeading: LocalizedText;
  features: Feature[];
};
const text = (ko: string, en: string): LocalizedText => ({ ko, en });
const rooms: Record<string, Room> = {
  daybybaby: {
    hero: "/apps-art/daybybaby-room-v1.webp",
    headline: text(
      "기록은 가볍게.\n아기의 하루는 오래도록.",
      "Less effort to log.\nMore little moments, kept.",
    ),
    intro: text(
      "아이의 하루를 기록하고, 함께 자라는 순간을 간직해요.",
      "Record your baby's day and keep the moments of growing together.",
    ),
    videoHeading: text(
      "푸리와 먼저\n만나보세요.",
      "Meet Ppuri.\nSee a little day unfold.",
    ),
    videoBody: text(
      "작은 기록이 모이는 모습을, 아기 logU 푸리가 안내해요.",
      "Ppuri, the baby logU, shows how little entries become a day to remember.",
    ),
    featureHeading: text(
      "오늘도, 작지만 특별한 순간들.",
      "Little moments. A day like no other.",
    ),
    features: [
      {
        title: text("간편 입력", "Quick logging"),
        body: text(
          "반복되는 기록은 간편하게. 아이에게 집중할 시간을 더 많이.",
          "Make repeated entries easier. Leave more time for your baby.",
        ),
        image: "/films/daybybaby-guide.webp",
      },
      {
        title: text("하루를 한눈에", "A day at a glance"),
        body: text(
          "수유와 일상의 기록을 한곳에서 돌아보세요.",
          "Look back on feeding and everyday records, all in one place.",
        ),
        image: "/films/daybybaby-day.webp",
      },
      {
        title: text("함께 남기는 기록", "Memories, together"),
        body: text(
          "함께 자라는 평범한 하루를, 오래 간직할 이야기로.",
          "Keep the ordinary days of growing together as stories to return to.",
        ),
        image: "/apps-art/daybybaby-memories-v1.webp",
      },
    ],
  },
  memogrip: {
    hero: "/apps-art/memogrip-v1.webp",
    headline: text(
      "떠오른 생각은 가볍게.\n다시 찾을 때는 선명하게.",
      "Catch a thought.\nFind it when you need it.",
    ),
    intro: text(
      "메모는 자유롭게 남기고, 흩어진 생각은 분류와 동기화로 모아두세요.",
      "Write freely. Bring scattered thoughts together with classification and sync.",
    ),
    videoHeading: text(
      "메모의 하루를\n만나보세요.",
      "See a day\nof little thoughts.",
    ),
    videoBody: text(
      "생각을 남기고 다시 찾는 흐름을 소개해요.",
      "Discover the journey from capturing a thought to finding it again.",
    ),
    featureHeading: text(
      "생각은 자유롭게, 기록은 가지런히.",
      "Free-flowing thoughts. A little more order.",
    ),
    features: [
      {
        title: text("자유로운 메모", "Write freely"),
        body: text(
          "형식에 얽매이지 않고 떠오른 생각부터 남겨요.",
          "Capture what comes to mind without a rigid format.",
        ),
        image: "/apps-art/memogrip-v1.webp",
      },
      {
        title: text("분류를 도와주는 AI", "A hand with classification"),
        body: text(
          "규칙과 AI로 큰 분류를 돕고, 세부 분류는 내 방식대로.",
          "Rules and AI help with main categories. Keep subcategories your own.",
        ),
        image: "/apps-art/memogrip-v1.webp",
      },
      {
        title: text("PC와 Android에서", "Across PC and Android"),
        body: text(
          "같은 계정으로 메모를 이어가세요.",
          "Continue your notes with the same account.",
        ),
        image: "/apps-art/memogrip-v1.webp",
      },
    ],
  },
  goodgo: {
    hero: "/apps-art/goodgo-v1.webp",
    headline: text(
      "나서기 전의 하루를,\n조금 더 여유롭게.",
      "A little more calm.\nBefore you head out.",
    ),
    intro: text(
      "도착할 시간부터 거꾸로, 준비와 출발의 흐름을 정리해요.",
      "Work back from arrival time to plan preparation and departure.",
    ),
    videoHeading: text(
      "출발하기 전,\n함께 살펴봐요.",
      "Before you leave,\ntake a look.",
    ),
    videoBody: text(
      "준비할 시간과 챙길 것들을 모아보세요.",
      "Bring together the time to get ready and the things to take.",
    ),
    featureHeading: text(
      "좋은 출발은, 작은 준비부터.",
      "A good start begins with little preparations.",
    ),
    features: [
      {
        title: text("시간을 거꾸로", "Work backwards"),
        body: text(
          "도착 시간과 이동 시간을 기준으로 준비와 출발 시간을 계산해요.",
          "Calculate preparation and departure from arrival and travel time.",
        ),
        image: "/apps-art/goodgo-v1.webp",
      },
      {
        title: text("내 이동 방식으로", "Your way of getting there"),
        body: text(
          "목적지와 이동 방법을 정하고 필요한 이동 시간을 반영해요.",
          "Choose a destination and travel method, then factor in travel time.",
        ),
        image: "/apps-art/goodgo-v1.webp",
      },
      {
        title: text("빠뜨리지 않도록", "Don't leave it behind"),
        body: text(
          "날씨와 준비물 체크리스트를 함께 살펴봐요.",
          "Check the weather and your essentials together.",
        ),
        image: "/apps-art/goodgo-v1.webp",
      },
    ],
  },
  bookbap: {
    hero: "/apps-art/bookbap-v1.webp",
    headline: text(
      "읽은 만큼,\n내 안에 남는 이야기.",
      "Stories you read.\nStories that stay.",
    ),
    intro: text(
      "책과 문장, 나만의 독서 기록을 한곳에 간직해요.",
      "Keep books, meaningful lines, and your own reading history together.",
    ),
    videoHeading: text(
      "나만의 책장을\n만나보세요.",
      "Step into\nyour own bookshelf.",
    ),
    videoBody: text(
      "책을 기록하고 문장을 간직하는 흐름을 소개해요.",
      "Discover a place for recording books and keeping meaningful words.",
    ),
    featureHeading: text(
      "책 한 권이 남기는, 나만의 흔적.",
      "The traces a book leaves in your life.",
    ),
    features: [
      {
        title: text("나만의 책 기록", "Your books"),
        body: text(
          "읽는 책과 독서의 흐름을 기록해요.",
          "Record your books and your reading journey.",
        ),
        image: "/apps-art/bookbap-v1.webp",
      },
      {
        title: text("간직하고 싶은 문장", "Words worth keeping"),
        body: text(
          "마음에 남은 문장과 생각을 모아두세요.",
          "Collect the words and thoughts that stay with you.",
        ),
        image: "/apps-art/bookbap-v1.webp",
      },
      {
        title: text("책을 찾고 더하기", "Find a book"),
        body: text(
          "ISBN 검색으로 책을 찾아 내 기록에 더해요.",
          "Find books by ISBN and add them to your records.",
        ),
        image: "/apps-art/bookbap-v1.webp",
      },
    ],
  },
};

export function appRoom(product: Product): Room {
  const raw = (product.name || product.displayName)
    .toLowerCase()
    .replace(/[^a-z]/g, "");
  const key =
    (
      {
        bebe: "daybybaby",
        memo: "memogrip",
        allinmemo: "memogrip",
        readygo: "goodgo",
        innerbrary: "bookbap",
      } as Record<string, string>
    )[raw] || raw;
  return (
    rooms[key] || {
      hero: product.localImage || "/apps-art/village-v1.webp",
      headline: text(product.displayName, product.displayName),
      intro: text(product.description, product.description),
      videoHeading: text("영상으로 만나보세요.", "See the story."),
      videoBody: text(
        "작은 순간에서 시작하는 이야기.",
        "A story starting with little moments.",
      ),
      featureHeading: text(
        "일상 곁에 놓인 작은 경험.",
        "Little experiences for everyday life.",
      ),
      features: [],
    }
  );
}
