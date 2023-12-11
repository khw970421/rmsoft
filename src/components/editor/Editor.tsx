import { useEffect } from 'react'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import OnChangePlugin from './OnChangePlugin'
import Placeholder from './Placeholder'
import { IMemos } from '../../utils/types'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { EMPTY_CONTENT } from '../../utils/constants'
import { EditorState } from 'lexical'
import debounce from '../../utils/debounce'
interface IEditorProps {
  focusedMemoId: number
  memos: IMemos[]
  editMemos: ({ title, content }: { title: string, content: string }) => void
}

export default function Editor({ focusedMemoId, memos, editMemos }: IEditorProps) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    const editorState = editor.parseEditorState(memos[focusedMemoId]?.content || EMPTY_CONTENT)
    editor.setEditorState(editorState);
  }, [focusedMemoId, memos])

  const debounceEditMemos = debounce(editMemos)
  const onChange = (editorState: EditorState) => {
    const childJSON = editorState.toJSON().root.children[0] as unknown as { children: [{ text: string, type: string }] }
    const nodes = childJSON.children
    const titleIndex = nodes.findIndex(({ type }: { type: string }) => type === 'text')

    if (nodes[titleIndex]?.text) {
      debounceEditMemos({ title: nodes[titleIndex]?.text, content: JSON.stringify(editorState.toJSON()) })
    }
  }

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

