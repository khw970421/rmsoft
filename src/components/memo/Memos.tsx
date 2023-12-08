import { IMemos } from '../../utils/types';
import Memo from './Memo';

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
    <div>
      <div><span>{focusedNotebook}</span><button onClick={handleAddMemo}>New Note</button></div>
      {memos && memos.map(({ title }, id) =>
        <Memo
          title={title || undefined}
          key={`${title}-${id}`}
          handleChangeFocusedMemoId={(e: React.MouseEvent<HTMLDivElement>) => handleChangeFocusedMemoId(e, id)}
          handleRemoveMemo={(e: React.MouseEvent<HTMLButtonElement>) => handleRemoveMemo(e, id)}
          className={`${(focusedMemoId === id) && 'focus'}`} />)}
    </div>
  );
};

export default Memos;