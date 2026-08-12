import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Internal name",
      type: "slug",
      options: { source: "displayName", maxLength: 64 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "displayName",
      title: "Display name",
      type: "string",
      description: "e.g. [:]bebe",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort order",
      type: "number",
      initialValue: 0,
      validation: (rule) => rule.required().integer(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Unpublished", value: "unpublished" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "appStoreUrl",
      title: "App Store URL",
      type: "url",
    }),
    defineField({
      name: "webUrl",
      title: "Web URL",
      type: "url",
    }),
    defineField({
      name: "homeScreen",
      title: "Home screen (grid thumbnail)",
      type: "image",
      description: "Shown on the products grid. Prefer the app home screen.",
      options: { hotspot: true },
    }),
    defineField({
      name: "screenshots",
      title: "Screenshots (popup gallery)",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
            }),
          ],
        },
      ],
      options: { layout: "grid" },
    }),
    // Legacy single screenshot — kept so old docs still open in Studio
    defineField({
      name: "screenshot",
      title: "Screenshot (legacy)",
      type: "image",
      hidden: true,
      options: { hotspot: true },
    }),
    defineField({
      name: "screenshotAlt",
      title: "Screenshot alt text (legacy)",
      type: "string",
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "displayName",
      status: "status",
      media: "homeScreen",
    },
    prepare: ({ title, status, media }) => ({
      title: title || "Untitled product",
      subtitle: status,
      media,
    }),
  },
});
