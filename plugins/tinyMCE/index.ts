import { definePlugin } from 'sanity'
import { tinyMCEDocument, tinyMCEObject } from './schema'

export const tinyMCE = definePlugin({
  name: 'tinyMCE',
  schema: {
    types: [tinyMCEDocument, tinyMCEObject]
  }
})