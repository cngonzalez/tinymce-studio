import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    // defineField({
    //   name: 'body',
    //   title: 'Body',
    //   type: 'blockContent',
    // }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'tinyMCE',
    }),
    defineField({
      name: 'bodyPortableText',
      title: 'Body (Portable Text)',
      type: 'blockContent',
    })
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
