import {defineField, defineType} from "sanity";

export const collectionType = defineType({
  name: "collection",
  title: "Collection",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});