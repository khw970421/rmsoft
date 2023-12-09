import TextEllipsis from "./TextEllipsis";

interface IMemoProps {
  title: string | undefined
  className: string
  handleChangeFocusedMemoId: (e: React.MouseEvent<HTMLDivElement>) => void
  handleRemoveMemo: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Memo = ({ title, className, handleChangeFocusedMemoId, handleRemoveMemo }: IMemoProps) => {
  return (
    <div onClick={handleChangeFocusedMemoId} className={className}>
      <TextEllipsis text={title ? title : 'New Note'} />
      <button onClick={handleRemoveMemo}>-</button>
    </div>
  );
};

export default Memo;