import { useState } from 'react'
import './App.css'
import Notebooks from './components/notebooks/Notebooks'
import Memo from './components/memo/Memos'

function App() {
  const [focusedNotebook, setFocusedNotebook] = useState<string | null>(null)
  const focusNotebook = (notebook: string | null) => {
    setFocusedNotebook(notebook)
  }
  console.log(focusedNotebook)
  return (
    <>
      <Notebooks focusNotebook={focusNotebook} />
      <Memo focusedNotebook={focusedNotebook} />
    </>
  )
}

export default App
