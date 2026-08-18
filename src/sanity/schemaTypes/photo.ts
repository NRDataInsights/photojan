import {defineField, defineType} from "sanity";

export const photoType = defineType({
  name: "photo",
  title: "Photo",
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
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "collection",
      title: "Collection",
      type: "reference",
      to: [{type: "collection"}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),

    defineField({
      name: "relatedPhotos",
      title: "Related photos / next nodes",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{type: "photo"}],
        },
      ],
    }),
  ],
});