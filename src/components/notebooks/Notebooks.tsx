import { useRef, useState } from "react";
import { ISavedNotebooks } from "../../utils/types";

interface INotebooksProps {
  focusedNotebook: string | null
  savedNotebooks: ISavedNotebooks
  focusNotebook: (notebook: string | null) => void
  createNoteBook: (notebook: string) => void
  removeNotebook: (notebook: string) => void
}

const Notebooks = ({ focusedNotebook, savedNotebooks, focusNotebook, createNoteBook, removeNotebook }: INotebooksProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ref = useRef<HTMLInputElement>(null);
  const handleAddNoteBooks = () => {
    setIsModalOpen(true)
  }
  const handleCreateNoteBook = () => {
    if (ref.current && ref.current?.value.trim() !== '') {
      createNoteBook(ref.current?.value)
    }
    else {
      alert('Fill Input Text')
    }
    setIsModalOpen(false)
  }

  const handleRemoveNoteBook = (e: React.MouseEvent<HTMLButtonElement>, notebook: string) => {
    e.stopPropagation()
    removeNotebook(notebook)
    focusNotebook(null)
  }

  const handleOpenNotebook = (notebook: string) => {
    focusNotebook(notebook)
  }

  return (
    <div className="notebooks-wrapper">
      {isModalOpen && <div><input ref={ref} /> <button onClick={handleCreateNoteBook}>Create</button></div>}
      <div ><p className="notebook-title">NOTEBooks</p><button onClick={handleAddNoteBooks} className="notebook-addBtn">+</button></div>
      {Object.keys(savedNotebooks).map((notebook, id) => <div key={`${notebook}-${id}`} onClick={() => handleOpenNotebook(notebook)} className={`${(notebook === focusedNotebook) && 'focus'}`}><p>{notebook}</p><button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleRemoveNoteBook(e, notebook)} data-id={id}>-</button></div>)}
    </div>
  );
};

export default Notebooks;