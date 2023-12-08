interface IMemoProps {
  title: string | undefined
  id: number
  className: string
  handleChangeFocusedMemoId: (id: number) => void
  handleRemoveMemo: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Memo = ({ title, id, className, handleChangeFocusedMemoId, handleRemoveMemo }: IMemoProps) => {
  return (
    <div onClick={() => handleChangeFocusedMemoId(id)} className={className}>
      {title ? title : 'New Note'}
      <button onClick={handleRemoveMemo} data-id={id}>-</button>
    </div>
  );
};

export default Memo;