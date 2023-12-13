import { useRef, useState } from "react";
import styled from "styled-components";
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
    <Wrapper>
      {isModalOpen && <div><input ref={ref} /> <button onClick={handleCreateNoteBook}>Create</button></div>}
      <div ><NoteBookTitle>NOTEBooks</NoteBookTitle><NoteBookAddBtn onClick={handleAddNoteBooks}>+</NoteBookAddBtn></div>
      {Object.keys(savedNotebooks).map((notebook, id) => <div key={`${notebook}-${id}`} onClick={() => handleOpenNotebook(notebook)} className={`${(notebook === focusedNotebook) && 'focus'}`}><p>{notebook}</p><button onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleRemoveNoteBook(e, notebook)} data-id={id}>-</button></div>)}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow:scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar{
    display:none;
  }

  > * {
    padding: 1rem;
    display:flex;
    justify-content: space-between;
  }
`

const NoteBookTitle = styled.p`
  font-weight:bold;
  color:#0c70f2;
`

const NoteBookAddBtn = styled.button`
  font-weight:bold;
  color:#0c70f2
`

export default Notebooks;