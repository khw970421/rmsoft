interface ITextEllipsisProps {
  text: string
}

const TextElipsis = ({ text }: ITextEllipsisProps) => {
  return (
    <div className="text-ellipsis">
      {text}
    </div>
  )
}

export default TextElipsis
