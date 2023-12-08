interface IMemoProps {
  title: string | undefined
  id: number
  handleRemoveMemo: () => void
}

const Memo = ({ title, id, handleRemoveMemo }: IMemoProps) => {
  return (
    <div>
      {title ? title : 'New Note'}
      <button onClick={handleRemoveMemo} data-id={id}>-</button>
    </div>
  );
};

export default Memo;