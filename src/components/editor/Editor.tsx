import { useEffect } from 'react'
import styled from 'styled-components'
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { EditorState } from 'lexical'
import OnChangePlugin from './OnChangePlugin'
import Placeholder from './Placeholder'

import { IMemos } from '../../utils/types'
import { EMPTY_CONTENT } from '../../utils/constants'
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

    debounceEditMemos({ title: nodes[titleIndex]?.text, content: JSON.stringify(editorState.toJSON()) })
  }

  return (
    <Wrapper>
      <PlainTextPlugin
        contentEditable={<ContentEditableWrapper />}
        placeholder={<Placeholder />}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={onChange} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: #fff;
  border-radius: 2px;
  color: #000;
  position: relative;
  line-height: 20px;
  font-weight: 400;
  text-align: left;
  padding: 15px 10px;

  & ::-webkit-scrollbar {
    display: none; 
  }
`

const ContentEditableWrapper = styled(ContentEditable)`
  min-height: 150px;
  max-height: calc(100vh - 30px);
  overflow: scroll;
  resize: none;
  font-size: 15px;
  caret-color: rgb(5, 5, 5);
  position: relative;
  tab-size: 1;
  outline: 0;
  padding: 15px 10px;
  caret-color: #444;
  scrollbar-width: none;

  & ::-webkit-scrollbar {
  display: none; 
  }
`

