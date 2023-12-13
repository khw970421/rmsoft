import { useRef, useState } from "react";
import { ISavedNotebooks } from "../../utils/types";

interface INotebooksProps {
  focusedNotebook: string | null
  savedNotebooks: ISavedNotebooks
  focusNotebook: (notebook: string | null) => void
  createNoteBooks: (notebook: string) => void
  removeNotebooks: (notebook: string) => void
}

const Notebooks = ({ focusedNotebook, savedNotebooks, focusNotebook, createNoteBooks, removeNotebooks }: INotebooksProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ref = useRef<HTMLInputElement>(null);
  const handleAddNoteBooks = () => {
    setIsModalOpen(true)
  }
  const handleCreateNoteBooks = () => {
    if (ref.current && ref.current?.value.trim() !== '') {
      createNoteBooks(ref.current?.value)
    }
    else {
      alert('Fill Input Text')
    }
    setIsModalOpen(false)
  }

  const handleRemoveNoteBooks = (e: React.MouseEvent<HTMLButtonElement>, notebook: string) => {
    e.stopPropagation()
    removeNotebooks(notebook)
    focusNotebook(null)
  }

  const handleOpenNotebook = (notebook: string) => {
    focusNotebook(notebook)
  }

  return (
    <div className="notebooks-wrapper">
      {isModalOpen && <div><input ref={ref} /> <button onClick={handleCreateNoteBooks}>Create</button></div>}
      <div ><p className="notebook-title">NOTEBooks</p><button onClick={handleAddNoteBooks} className="notebook-addBtn">+</button></div>
      {Object.keys(savedNotebooks).map((notebook, id) => <div key={`${notebook}-${id}`} onClick={() => handleOpenNotebook(notebook)} className={`${(notebook === focusedNotebook) && 'focus'}`}><p>{notebook}</p><button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleRemoveNoteBooks(e, notebook)} data-id={id}>-</button></div>)}
    </div>
  );
};

export default Notebooks;