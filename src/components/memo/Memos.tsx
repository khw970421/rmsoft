import { useState } from 'react';
import Memo from './Memo';

interface IMemosProps {
  focusedNotebook: string | null
}

interface IMemo {
  title?: string
}

const Memos = ({ focusedNotebook }: IMemosProps) => {
  const [memos, setMemos] = useState<IMemo[] | null>(null)
  const handleAddMemo = () => {
    setMemos(memos => memos ? [{}, ...memos] : [{}])
  }
  const handleRemoveMemo = (memoId: number) => {
    setMemos(memos => memos?.filter((_, id) => id !== memoId) || [])
  }

  return (
    <div>
      <div><span>{focusedNotebook}</span><button onClick={handleAddMemo}>New Note</button></div>
      {memos && memos.map(({ title }, id) => <Memo title={title || undefined} key={`${title}-${id}`} id={id} handleRemoveMemo={() => handleRemoveMemo(id)} />)}
    </div>
  );
};

export default Memos;