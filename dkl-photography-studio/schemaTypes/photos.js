import {defineType, defineField} from 'sanity'

export const photoType = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
name: 'category',
title: 'Category',
type: 'string',
options: {
  list: [
    { title: 'Wildlife', value: 'wildlife' },
    { title: 'Astro', value: 'astro' },
    { title: 'Out and About', value: 'out-and-about'}
  ]
}
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'dateTaken',
      title: 'Date Taken',
      type: 'date',
    }),
  ],
})
