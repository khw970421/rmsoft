import { useState } from 'react'
import './App.css'
import Notebooks from './components/notebooks/Notebooks'
import EditorContainer from './components/editor/EditorContainer'
import { ISavedNotebooks } from './utils/types'
import Memos from './components/memo/Memos'
import { getItem, setItem } from './utils/localStorage'
import confirmCheck from './utils/confirmCheck'

function App() {
  const [savedNotebooks, setSavedNotebooks] = useState<ISavedNotebooks>(getItem('notebooks') || {})
  const [focusedNotebook, setFocusedNotebook] = useState<string | null>(null)
  const [focusedMemoId, setFocusedMemoId] = useState<number | null>(null)

  // Notebooks Events
  const focusNotebook = (notebook: string | null) => {
    setFocusedNotebook(notebook)
    if (notebook && !!savedNotebooks[notebook].length)
      setFocusedMemoId(0)
    else
      setFocusedMemoId(null)
  }
  const createNoteBook = (notebook: string) => {
    if (savedNotebooks[notebook]) {
      alert(`The name ${notebook} is alerady taken. Please choose a different name.`)
      return
    }
    setSavedNotebooks((savedNotebooks) => {
      const newSavedNotebooks = { ...savedNotebooks, [notebook]: [] }
      setItem('notebooks', newSavedNotebooks)
      return newSavedNotebooks
    })

  }
  const removeNotebook = (notebook: string) => {
    const updateSavedNotebooks = () => {
      setSavedNotebooks((savedNotebooks) => {
        const newSavedNotebooks = { ...savedNotebooks }
        delete newSavedNotebooks[notebook]
        setItem('notebooks', newSavedNotebooks)
        return newSavedNotebooks
      })
    }
    confirmCheck('Do you want to remove Notebook?', updateSavedNotebooks)
  }

  // Memo Events
  const addMemo = () => {
    const newSavedNotebooks = { ...savedNotebooks }
    if (focusedNotebook)
      newSavedNotebooks[focusedNotebook] = [{}, ...newSavedNotebooks[focusedNotebook]]
    setFocusedMemoId(0)
    setSavedNotebooks(newSavedNotebooks)
    setItem('notebooks', newSavedNotebooks)
  }
  const removeMemo = (removeId: number) => {
    const newSavedNotebooks = { ...savedNotebooks }

    const updateSavedMemo = () => {
      if (focusedNotebook) {
        const removeNextMemo = newSavedNotebooks[focusedNotebook][removeId + 1]
        const removePrevMemo = newSavedNotebooks[focusedNotebook][removeId - 1]
        newSavedNotebooks[focusedNotebook] = newSavedNotebooks[focusedNotebook].filter((_, id) => id !== removeId)
        setFocusedMemoId(removeNextMemo ? removeId : (removePrevMemo ? removeId - 1 : null))
      }

      setSavedNotebooks(newSavedNotebooks)
      setItem('notebooks', newSavedNotebooks)
    }

    confirmCheck('Do you want to remove Memo?', updateSavedMemo)
  }
  const changeFocusedMemoId = (focusedMemoId: number) => {
    setFocusedMemoId(focusedMemoId)
  }

  // Editor Events
  const editMemos = ({ title, content }: { title: string, content: string }) => {
    const newSavedNotebooks = { ...savedNotebooks }
    if (focusedNotebook && focusedMemoId !== null)
      newSavedNotebooks[focusedNotebook][focusedMemoId] = { title, content }
    setSavedNotebooks(newSavedNotebooks)
    setItem('notebooks', newSavedNotebooks)
  }

  return (
    <div className="app-container">
      <Notebooks focusedNotebook={focusedNotebook} focusNotebook={focusNotebook} savedNotebooks={savedNotebooks} createNoteBook={createNoteBook} removeNotebook={removeNotebook} />
      {focusedNotebook &&
        <Memos focusedMemoId={focusedMemoId} focusedNotebook={focusedNotebook} memos={savedNotebooks[focusedNotebook]} addMemo={addMemo} removeMemo={removeMemo} changeFocusedMemoId={changeFocusedMemoId} />}
      {focusedMemoId !== null && focusedNotebook && <EditorContainer focusedMemoId={focusedMemoId} memos={savedNotebooks[focusedNotebook]} editMemos={editMemos} />}
    </div>
  )
}

export default App
