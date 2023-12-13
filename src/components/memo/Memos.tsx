import styled from 'styled-components';
import Memo from './Memo';
import { IMemos } from '../../utils/types';

interface IMemosProps {
  focusedMemoId: number | null
  focusedNotebook: string
  memos: IMemos[]
  addMemo: () => void
  removeMemo: (removeId: number) => void
  changeFocusedMemoId: (focusedMemoId: number) => void
}


const Memos = ({ focusedMemoId, focusedNotebook, memos, addMemo, removeMemo, changeFocusedMemoId }: IMemosProps) => {
  const handleAddMemo = () => {
    addMemo()
  }
  const handleChangeFocusedMemoId = (e: React.MouseEvent<HTMLDivElement>, focusedMemoId: number) => {
    e.stopPropagation()
    changeFocusedMemoId(focusedMemoId)
  }
  const handleRemoveMemo = (e: React.MouseEvent<HTMLButtonElement>, removeId: number) => {
    e.stopPropagation()
    removeMemo(removeId)
  }
  return (
    <Wrapper>
      <div><MemoTitle>{focusedNotebook}</MemoTitle><MemoAddBtn onClick={handleAddMemo}>New Note</MemoAddBtn></div>
      {memos && memos.map(({ title }, id) =>
        <Memo
          title={title || undefined}
          key={`${title}-${id}`}
          handleChangeFocusedMemoId={(e: React.MouseEvent<HTMLDivElement>) => handleChangeFocusedMemoId(e, id)}
          handleRemoveMemo={(e: React.MouseEvent<HTMLButtonElement>) => handleRemoveMemo(e, id)}
          className={`${(focusedMemoId === id) && 'focus'}`} />)}
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

const MemoTitle = styled.p`
  font-weight:bold
`

const MemoAddBtn = styled.button`
  background-color:#0c70f2;
  color:white;
  border-radius: 0.2rem;
`

export default Memos;