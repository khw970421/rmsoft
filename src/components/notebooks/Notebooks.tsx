import { MouseEvent, useRef, useState } from "react";

const Notebooks = ({ focusNotebook }: { focusNotebook: (notebook: string | null) => void }) => {
  const [notebooks, setNotebooks] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ref = useRef<HTMLInputElement>(null);
  const handleAddNoteBooks = () => {
    setIsModalOpen(true)
  }
  const handleCreateNoteBooks = () => {
    if (ref.current && ref.current?.value !== undefined) {
      setNotebooks([...notebooks, ref.current?.value])
    }
    setIsModalOpen(false)
  }

  const handleRemoveNoteBooks = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    const removeId = (event.target as HTMLElement).dataset.id || '';
    setNotebooks(notebooks => notebooks.filter((_, notebooksId) => String(notebooksId) !== removeId))
    focusNotebook(null)
  }

  const handleOpenNotebook = (notebook: string) => {
    focusNotebook(notebook)
  }

  return (
    <div>
      {isModalOpen && <div><input ref={ref} /> <button onClick={handleCreateNoteBooks}>Create</button></div>}
      <div><span>NOTEBooks</span><button onClick={handleAddNoteBooks}>+</button></div>
      {notebooks.map((notebook, id) => <div key={`${notebook}-${id}`} onClick={() => handleOpenNotebook(notebook)}><span>{notebook}</span><button onClick={handleRemoveNoteBooks} data-id={id}>-</button></div>)}
    </div>
  );
};

export default Notebooks;