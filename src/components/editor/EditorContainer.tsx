import { LexicalComposer } from '@lexical/react/LexicalComposer'
import Editor from './Editor'
import { IMemos } from '../../utils/types'

const theme = {}

function onError(error: Error): void {
  console.error(error)
}

interface IEditorContainerProps {
  children: React.ReactElement
  focusedMemoId: number
  memos: IMemos[]
}

export default function EditorContainer({ children, focusedMemoId, memos }: IEditorContainerProps) {
  const editorConfig = {
    namespace: 'MyEditor',
    theme,
    onError
  }
  return (
    <LexicalComposer initialConfig={editorConfig}>
      {children}
      <Editor />
    </LexicalComposer>
  )
}
