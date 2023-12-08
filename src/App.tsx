import { useState } from 'react'
import './App.css'
import Notebooks from './components/notebooks/Notebooks'
import Memo from './components/memo/Memos'
import EditorContainer from './components/editor/EditorContainer'
import { ISavedNotebooks } from './utils/types'

const dummy_data = {
  '1': [{ titile: 't1', content: 'c1' }, { titile: 't1', content: 'c1' }, { titile: 't1', content: 'c1' }],
  '2': [{ titile: 't2', content: 'c1' }],
  '3': [{ titile: 't3', content: 'c1' }],
}

function App() {
  const [savedNotebooks, setSavedNotebooks] = useState<ISavedNotebooks>(dummy_data)
  const [focusedNotebook, setFocusedNotebook] = useState<string | null>(null)
  const focusNotebook = (notebook: string | null) => {
    setFocusedNotebook(notebook)
  }
  console.log(focusedNotebook)
  const createNoteBooks = (notebook: string) => {
    if (savedNotebooks[notebook]) {
      alert(`The name ${notebook} is alerady taken. Please choose a different name.`)
      return
    }
    setSavedNotebooks((savedNotebooks) => ({ ...savedNotebooks, [notebook]: [] }))
  }
  const removeNotebooks = (notebook: string) => {
    setSavedNotebooks((savedNotebooks) => {
      const newSavedNotebooks = { ...savedNotebooks }
      delete newSavedNotebooks[notebook]
      return newSavedNotebooks
    })
  }
  return (
    <>
      <Notebooks focusNotebook={focusNotebook} savedNotebooks={savedNotebooks} createNoteBooks={createNoteBooks} removeNotebooks={removeNotebooks} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <EditorContainer>
        <Memo focusedNotebook={focusedNotebook} />
      </EditorContainer>
    </>
  )
}

export default App
