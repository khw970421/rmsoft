import { IMemos } from '../../utils/types';
import Memo from './Memo';

interface IMemosProps {
  focusedMemoId: number
  focusedNotebook: string
  memos: IMemos[]
  addMemo: () => void
  removeMemo: (removeId: number) => void
  handleChangeFocusedMemoId: (focusedId: number) => void
}


const Memos = ({ focusedMemoId, focusedNotebook, memos, addMemo, removeMemo, handleChangeFocusedMemoId }: IMemosProps) => {
  const handleAddMemo = () => {
    addMemo()
  }
  const handleRemoveMemo = (removeId: number) => {
    removeMemo(removeId)
  }

  return (
    <div>
      <div><span>{focusedNotebook}</span><button onClick={handleAddMemo}>New Note</button></div>
      {memos && memos.map(({ title }, id) => <Memo title={title || undefined} key={`${title}-${id}`} id={id} handleChangeFocusedMemoId={handleChangeFocusedMemoId} handleRemoveMemo={() => handleRemoveMemo(id)} className={`${(focusedMemoId === id) && 'focus'}`}/>)}
    </div>
  );
};

export default Memos;