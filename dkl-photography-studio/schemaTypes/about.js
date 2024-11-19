import {defineField, defineType} from 'sanity'

export const aboutType = defineType({
    name: 'about',
    title: 'About',
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
      name: 'profileImage',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {name: 'email', title: 'Email', type: 'string'},
        {name: 'phone', title: 'Phone', type: 'string'},
        {name: 'location', title: 'Location', type: 'string'},
      ],
    }),
  ],
})