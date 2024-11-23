import {defineField, defineType} from 'sanity'
//collection of photos grouped by themes

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'image',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to order photos in the gallery',
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
  ],
})