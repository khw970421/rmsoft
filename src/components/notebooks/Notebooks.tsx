import { useRef, useState } from "react";
import { ISavedNotebooks } from "../../utils/types";

interface INotebooksProps {
  savedNotebooks: ISavedNotebooks
  focusNotebook: (notebook: string | null) => void
  createNoteBooks: (notebook: string) => void
  removeNotebooks: (notebook: string) => void
}

const Notebooks = ({ savedNotebooks, focusNotebook, createNoteBooks, removeNotebooks }: INotebooksProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ref = useRef<HTMLInputElement>(null);
  const handleAddNoteBooks = () => {
    setIsModalOpen(true)
  }
  const handleCreateNoteBooks = () => {
    if (ref.current && ref.current?.value !== undefined) {
      createNoteBooks(ref.current?.value)
    }
    setIsModalOpen(false)
  }

  const handleRemoveNoteBooks = (notebook: string) => {
    removeNotebooks(notebook)
    focusNotebook(null)
  }

  const handleOpenNotebook = (notebook: string) => {
    focusNotebook(notebook)
  }

  return (
    <div>
      {isModalOpen && <div><input ref={ref} /> <button onClick={handleCreateNoteBooks}>Create</button></div>}
      <div><span>NOTEBooks</span><button onClick={handleAddNoteBooks}>+</button></div>
      {Object.keys(savedNotebooks).map((notebook, id) => <div key={`${notebook}-${id}`} onClick={() => handleOpenNotebook(notebook)}><span>{notebook}</span><button onClick={() => handleRemoveNoteBooks(notebook)} data-id={id}>-</button></div>)}
    </div>
  );
};

export default Notebooks;