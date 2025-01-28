import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { FC } from 'react'

export const MarkdownBlock: FC<{markdown: string}> = ({ markdown }) => {
  return <div className='container my-16'>
    <div className='prose md:prose-md dark:prose-invert max-w-none'>
      <Markdown remarkPlugins={[remarkGfm]}>
        {markdown}
      </Markdown>
    </div>
  </div>
}
