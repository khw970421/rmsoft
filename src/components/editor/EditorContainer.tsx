import { LexicalComposer } from '@lexical/react/LexicalComposer'
import Editor from './Editor'
import { IMemos } from '../../utils/types'

const theme = {}

function onError(error: Error): void {
  console.error(error)
}

interface IEditorContainerProps {
  focusedMemoId: number
  memos: IMemos[]
  editMemos: ({ title, content }: { title: string, content: string }) => void
}

const EMPTY_CONTENT =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

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
