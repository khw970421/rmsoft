import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { EditorState } from 'lexical';

export default function OnChangePlugin(props: { onChange: (editorState: EditorState) => void }) {
  const [editor] = useLexicalComposerContext()
  const { onChange } = props
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState)
    })
  }, [onChange, editor])
  return null
}