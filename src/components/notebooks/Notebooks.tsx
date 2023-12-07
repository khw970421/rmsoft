import { MouseEvent, useRef, useState } from "react";

const Notebooks = () => {
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
    const removeId = (event.target as HTMLElement).dataset.id || '';
    setNotebooks(notebooks => notebooks.filter((_, notebooksId) => String(notebooksId) !== removeId))
  }

  return (
    <div>
      {isModalOpen && <div><input ref={ref} /> <button onClick={handleCreateNoteBooks} /></div>}
      <div><span>NOTEBooks</span><button onClick={handleAddNoteBooks}>+</button></div>
      {notebooks.map((notebook, id) => <div key={`${notebook}-${id}`}><span>{notebook}</span><button onClick={handleRemoveNoteBooks} data-id={id}>-</button></div>)}
    </div>
  );
};

export default Notebooks;