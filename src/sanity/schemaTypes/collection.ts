import {defineField, defineType} from "sanity";

export const collectionType = defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    defineField({name:"title", title:"Title", type:"string", validation:r=>r.required()}),
    defineField({name:"slug", title:"Slug", type:"slug", options:{source:"title"}, validation:r=>r.required()}),
    defineField({name:"description", title:"Description", type:"text", rows:3}),
    defineField({name:"cover", title:"Cover image", type:"image", options:{hotspot:true}}),
    defineField({
      name:"photos",
      title:"Photos",
      type:"array",
      of:[{type:"reference", to:[{type:"photo"}]}]
    })
  ]
});
