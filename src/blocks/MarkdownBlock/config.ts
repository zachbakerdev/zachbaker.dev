import type { Block } from 'payload'

export const MarkdownBlock: Block = {
  slug: 'markdown',
  interfaceName: 'MarkdownBlock',
  fields: [
    {
      name: 'markdown',
      type: 'textarea',
      required: true
    }
  ]
}
