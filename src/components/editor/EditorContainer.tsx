import { LexicalComposer } from '@lexical/react/LexicalComposer'
import Editor from './Editor'
import { IMemos } from '../../utils/types'
import { EMPTY_CONTENT } from '../../utils/constants'

const theme = {}

function onError(error: Error): void {
  console.error(error)
}

interface IEditorContainerProps {
  focusedMemoId: number
  memos: IMemos[]
  editMemos: ({ title, content }: { title: string, content: string }) => void
}

export default function EditorContainer({ focusedMemoId, memos, editMemos }: IEditorContainerProps) {
  const editorConfig = {
    editorState: memos[focusedMemoId]?.content || EMPTY_CONTENT,
    namespace: 'MyEditor',
    theme,
    onError
  }
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Editor editMemos={editMemos} focusedMemoId={focusedMemoId} memos={memos} />
    </LexicalComposer>
  )
}
