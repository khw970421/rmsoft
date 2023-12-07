import { LexicalComposer } from '@lexical/react/LexicalComposer'
import Editor from './Editor'

const theme = {}

function onError(error: Error): void {
  console.error(error)
}

export default function EditorContainer() {
  const editorConfig = {
    namespace: 'MyEditor',
    theme,
    onError
  }
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Editor />
    </LexicalComposer>
  )
}
