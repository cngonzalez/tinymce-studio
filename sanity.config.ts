import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { tinyMCE } from './plugins/tinyMCE'

export default defineConfig({
  name: 'default',
  title: 'TinyMCE Studio',

  projectId: 'r5csqer1',
  dataset: 'production',

  plugins: [deskTool(), visionTool(), tinyMCE()],

  schema: {
    types: schemaTypes,
  },
})
