import { useState } from 'react'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { EditorState } from 'lexical'
import OnChangePlugin from './OnChangePlugin'
import Placeholder from './Placeholder'
import getTime from '../../utils/getTime'

interface IMemo {
  title?: string
  content?: string
  date?: string
}

export default function Editor() {
  const [memo, setMemo] = useState<IMemo | null>(null)

  const onChange = (editorState: EditorState) => {
    const nodeMap = editorState._nodeMap
    let isTitle = false,
      isContent = false
    Object.values([...nodeMap]).forEach((value) => {
      const [, { __text, __type }] = value
      if (__type === 'text') {
        if (!isTitle) {
          isTitle = true
          setMemo((memo) => ({ ...memo, title: __text }))
        } else if (!isContent) {
          isContent = true
          setMemo((memo) => ({ ...memo, content: __text }))
        }
      }
    })
    setMemo((memo) => ({ ...memo, date: getTime(new Date()) }))
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

