import { useState } from 'react'
import './App.css'
import Notebooks from './components/notebooks/Notebooks'
import EditorContainer from './components/editor/EditorContainer'
import { ISavedNotebooks } from './utils/types'
import Memos from './components/memo/Memos'

const dummy_data = {
  '1': [{ title: 'update1', content: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"update1","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}' }, { title: 'update2', content: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"update2","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}' }],
  '2': [{ title: 'update1', content: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"update1","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}' }, { title: 'update2', content: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"update2","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}' }],
  '3': [{ title: 'update1', content: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"update1","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}' }, { title: 'update2', content: '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"update2","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}' }],
}


function App() {
  const [savedNotebooks, setSavedNotebooks] = useState<ISavedNotebooks>(dummy_data)
  const [focusedNotebook, setFocusedNotebook] = useState<string | null>(null)
  const [focusedMemoId, setFocusedMemoId] = useState<number | null>(null)
  console.log(savedNotebooks)
  const focusNotebook = (notebook: string | null) => {
    setFocusedNotebook(notebook)
    if (notebook)
      setFocusedMemoId(savedNotebooks[notebook] ? 0 : null)
  }
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
      newSavedNotebooks[focusedNotebook] = [{}, ...newSavedNotebooks[focusedNotebook]]
    setFocusedMemoId(0)
    setSavedNotebooks(newSavedNotebooks)
  }
  const removeMemo = (removeId: number) => {
    const newSavedNotebooks = { ...savedNotebooks }
    if (focusedNotebook) {
      const removeNextMemo = newSavedNotebooks[focusedNotebook][removeId + 1]
      const removePrevMemo = newSavedNotebooks[focusedNotebook][removeId - 1]
      newSavedNotebooks[focusedNotebook] = newSavedNotebooks[focusedNotebook].filter((_, id) => id !== removeId)
      setFocusedMemoId(removeNextMemo ? removeId : (removePrevMemo ? removeId - 1 : null))
    }

    setSavedNotebooks(newSavedNotebooks)
  }
  const handleChangeFocusedMemoId = (focusedId: number) => {
    setFocusedMemoId(focusedId)
  }
  const editMemos = ({ title, content }: { title: string, content: string }) => {
    const newSavedNotebooks = { ...savedNotebooks }
    if (focusedNotebook && focusedMemoId !== null)
      newSavedNotebooks[focusedNotebook][focusedMemoId] = { title, content }
    setSavedNotebooks(newSavedNotebooks)
  }
  return (
    <>
      <Notebooks focusedNotebook={focusedNotebook} focusNotebook={focusNotebook} savedNotebooks={savedNotebooks} createNoteBooks={createNoteBooks} removeNotebooks={removeNotebooks} />
      <br />
      <br />
      <br />
      <br />
      <br />
      {focusedNotebook &&
        <Memos focusedMemoId={focusedMemoId} focusedNotebook={focusedNotebook} memos={savedNotebooks[focusedNotebook]} addMemo={addMemo} removeMemo={removeMemo} handleChangeFocusedMemoId={handleChangeFocusedMemoId} />}
      <br />
      <br />
      <br />
      {focusedMemoId !== null && focusedNotebook && <EditorContainer focusedMemoId={focusedMemoId} memos={savedNotebooks[focusedNotebook]} editMemos={editMemos} />}
    </>
  )
}

export default App
