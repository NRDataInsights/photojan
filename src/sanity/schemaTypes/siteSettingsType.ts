import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",

  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      type: "string",
      initialValue: "photoJan",
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),

    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
    }),

    defineField({
      name: "facebook",
      title: "Facebook",
      type: "url",
    }),

    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Dublin, Ireland",
    }),

    defineField({
      name: "contactIntro",
      title: "Contact introduction",
      type: "text",
      rows: 3,
      initialValue:
        "For commissions, collaborations, editorial work or print enquiries.",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});