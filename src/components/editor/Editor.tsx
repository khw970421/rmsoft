import { useEffect } from 'react'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import OnChangePlugin from './OnChangePlugin'
import Placeholder from './Placeholder'
import { IMemos } from '../../utils/types'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

interface IEditorProps {
  focusedMemoId: number
  memos: IMemos[]
  editMemos: ({ title, content }: { title: string, content: string }) => void
}

export default function Editor({ focusedMemoId, memos, editMemos }: IEditorProps) {
  const onChange = (editorState: any) => {
    const { root } = editorState.toJSON();
    const nodes = root.children[0].children
    const titleIndex = nodes.findIndex(({ type }: { type: string }) => type === 'text')

    if (nodes[titleIndex]?.text) {
      editMemos({ title: nodes[titleIndex]?.text, content: JSON.stringify(editorState.toJSON()) })
    }
  }

  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    const editorState = editor.parseEditorState(
      JSON.stringify(JSON.parse(memos[focusedMemoId]?.content))
    );
    editor.setEditorState(editorState);
  }, [focusedMemoId])

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

