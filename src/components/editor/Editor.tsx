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

    const [title, content] = Object.values([...nodeMap]).filter((value) => {
      const [, { __type }] = value
      return __type === 'text'
    }).sort((a, b) => {
      return a[1]?.__prev - b[1]?.__prev
    })

    if (title) {
      setMemo((memo) => ({ ...memo, title: title[1]?.__text }))
    }
    else {
      setMemo((memo) => {
        const newMemo = { ...memo }
        delete newMemo.title
        return newMemo
      })
    }
    if (content) {
      setMemo((memo) => ({ ...memo, content: content[1]?.__text }))
    }
    else {
      setMemo((memo) => {
        const newMemo = { ...memo }
        delete newMemo.content
        return newMemo
      })
    }
    console.log(title, content)

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

