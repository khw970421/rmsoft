interface IMemoProps {
  title: string | undefined
  id: number
  handleChangeFocusedMemoId: (id: number) => void
  handleRemoveMemo: () => void
}

const Memo = ({ title, id, handleChangeFocusedMemoId, handleRemoveMemo }: IMemoProps) => {
  return (
    <div onClick={() => handleChangeFocusedMemoId(id)}>
      {title ? title : 'New Note'}
      <button onClick={handleRemoveMemo} data-id={id}>-</button>
    </div>
  );
};

export default Memo;