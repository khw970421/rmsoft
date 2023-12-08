import { useState } from 'react'
import './App.css'
import Notebooks from './components/notebooks/Notebooks'
import EditorContainer from './components/editor/EditorContainer'
import { ISavedNotebooks } from './utils/types'
import Memos from './components/memo/Memos'

const dummy_data = {
  '1': [{ title: 't1', content: 'c1' }, { title: 't1', content: 'c1' }, { title: 't1', content: 'c1' }],
  '2': [{ title: 't2', content: 'c1' }],
  '3': [{ title: 't3', content: 'c1' }],
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
  const addMemo = () => {
    const newSavedNotebooks = { ...savedNotebooks }
    if (focusedNotebook)
      newSavedNotebooks[focusedNotebook] = [...newSavedNotebooks[focusedNotebook],]
    setSavedNotebooks(newSavedNotebooks)
  }
  const removeMemo = (removeId: number) => {
    const newSavedNotebooks = { ...savedNotebooks }
    if (focusedNotebook)
      newSavedNotebooks[focusedNotebook] = newSavedNotebooks[focusedNotebook].filter((_, id) => id !== removeId)
    setSavedNotebooks(newSavedNotebooks)
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
        {focusedNotebook && <Memos focusedNotebook={focusedNotebook} memos={savedNotebooks[focusedNotebook]} addMemo={addMemo} removeMemo={removeMemo} />}
      </EditorContainer>
    </>
  )
}

export default App
