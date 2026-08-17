import {defineField, defineType} from "sanity";

export const noteType = defineType({
  name: "note",
  title: "Note",
  type: "document",
  fields: [
    defineField({name:"title", title:"Title", type:"string", validation:r=>r.required()}),
    defineField({name:"slug", title:"Slug", type:"slug", options:{source:"title"}, validation:r=>r.required()}),
    defineField({name:"publishedAt", title:"Published at", type:"datetime"}),
    defineField({name:"excerpt", title:"Excerpt", type:"text", rows:3}),
    defineField({
      name:"body",
      title:"Body",
      type:"array",
      of:[{type:"block"}, {type:"image", options:{hotspot:true}}]
    })
  ]
});
