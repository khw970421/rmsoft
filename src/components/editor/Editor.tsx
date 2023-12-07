import { useState } from 'react'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import OnChangePlugin from './OnChangePlugin'
import Placeholder from './Placeholder'

interface IMemo {
  title?: string
}

export default function Editor() {
  const [memo, setMemo] = useState<IMemo | null>(null)
  const onChange = (editorState: any) => {
    const { root } = editorState.toJSON();
    const nodes = root.children[0].children
    const titleIndex = nodes.findIndex(({ type }: { type: string }) => type === 'text')
    if (nodes[titleIndex]?.text)
      setMemo({ title: nodes[titleIndex]?.text })
  }
  console.log(memo)
  return (
    <div className="editor-container">
      <PlainTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={onChange} />
    </div>
  )
}

