import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { MarkdownPostHero } from '@/heros/MarkdownPostHero'
import remarkRehype from 'remark-rehype'
import rehypePrism from 'rehype-prism'

// Prism Theme
import 'prismjs/themes/prism-tomorrow.min.css'

// Prism Languages
;[
  'bash',
  'css',
  'javascript',
  'json',
  'jsx',
  'markup',
  'python',
  'tsx',
  'typescript',
  'yaml',
].forEach((l) => {
  import('prismjs/components/prism-' + l)
})

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'markdown_posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return posts.docs.map(({ slug }) => {
    return { slug }
  });
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <MarkdownPostHero post={post} />

      <div className="container max-w-[48rem] mx-auto">
        <Markdown
          className="prose md:prose-md dark:prose-invert"
          remarkPlugins={[
            [remarkGfm],
            [remarkRehype],
            [rehypePrism, { plugins: ['copy-to-clipboard'] }],
          ]}
        >
          {post.content}
        </Markdown>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'markdown_posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
