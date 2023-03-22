import { defineType } from 'sanity'
import { TinyMCEINput } from '../components/TinyMCEInput'

export const tinyMCEDocument = defineType({
  name: 'tinyMCE',
  title: 'TinyMCE',
  type: 'string',
  components: {
    input: TinyMCEINput,
  }
})

export const tinyMCEObject = defineType({
  name: 'tinyMCEObject',
  title: 'Embedded Object',
  type: 'object',
  fields: [
    {
      name: 'content',
      type: 'string',
      components: {
        input: TinyMCEINput,
      }
    },
  ],
  preview: {
    select: {},
    prepare: () => {
      return {
        title: 'Embedded HTML Object',
        subtitle: 'Includes tables and other elements'
      }
    }
  }
})