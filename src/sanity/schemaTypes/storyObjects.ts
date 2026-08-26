import { defineField, defineType } from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "한·영 짧은 문구",
  type: "object",
  fields: [
    defineField({ name: "ko", title: "한국어", type: "string" }),
    defineField({ name: "en", title: "English", type: "string" }),
  ],
  options: { columns: 2 },
});

export const localizedText = defineType({
  name: "localizedText",
  title: "한·영 긴 문구",
  type: "object",
  fields: [
    defineField({ name: "ko", title: "한국어", type: "text", rows: 3 }),
    defineField({ name: "en", title: "English", type: "text", rows: 3 }),
  ],
  options: { columns: 2 },
});

export const dailyScene = defineType({
  name: "dailyScene",
  title: "하루 장면",
  type: "object",
  fields: [
    defineField({ name: "time", title: "시간", type: "string" }),
    defineField({ name: "title", title: "장면 제목", type: "localizedString" }),
    defineField({ name: "copy", title: "장면 설명", type: "localizedText" }),
    defineField({
      name: "visual",
      title: "장면 그림",
      type: "string",
      options: {
        list: [
          { title: "기상", value: "wake" },
          { title: "식사", value: "meal" },
          { title: "이동", value: "commute" },
          { title: "업무/수업", value: "work" },
          { title: "점심", value: "lunch" },
          { title: "귀가", value: "home" },
          { title: "가족/개인시간", value: "family" },
          { title: "밤/회상", value: "night" },
        ],
      },
    }),
  ],
  preview: {
    select: { title: "title.ko", subtitle: "time" },
  },
});

export const introScene = defineType({
  name: "introScene",
  title: "Intro 장면",
  type: "object",
  fields: [
    defineField({ name: "symbol", title: "심볼", type: "string" }),
    defineField({ name: "title", title: "장면 제목", type: "localizedString" }),
    defineField({ name: "body", title: "장면 설명", type: "localizedText" }),
    defineField({
      name: "visual",
      title: "기존 이미지 장면",
      type: "string",
      options: {
        list: [
          { title: "아침/기상", value: "wake" },
          { title: "가족/함께", value: "family" },
          { title: "이동/일상", value: "commute" },
          { title: "시간이 흐른 뒤", value: "later" },
          { title: "밤/기억", value: "night" },
        ],
      },
    }),
  ],
  preview: { select: { title: "title.ko", subtitle: "visual" } },
});

export const lifeStage = defineType({
  name: "lifeStage",
  title: "삶의 단계",
  type: "object",
  fields: [
    defineField({ name: "age", title: "단계 이름", type: "localizedString" }),
    defineField({ name: "title", title: "장면 제목", type: "localizedString" }),
    defineField({ name: "copy", title: "장면 설명", type: "localizedText" }),
    defineField({
      name: "visual",
      title: "장면 그림",
      type: "string",
      options: {
        list: [
          { title: "아기", value: "baby" },
          { title: "유치원", value: "kindergarten" },
          { title: "초등학교", value: "school" },
          { title: "청소년", value: "teen" },
          { title: "대학교", value: "university" },
          { title: "첫 직장", value: "work" },
          { title: "사랑/가족", value: "family" },
          { title: "그 이후", value: "later" },
        ],
      },
    }),
  ],
  preview: {
    select: { title: "title.ko", subtitle: "age.ko" },
  },
});
