import styled from "styled-components"

export default function Placeholder() {
  return <Wrapper>Enter some plain text...</Wrapper>
}

const Wrapper = styled.div`
  color: #999;
  overflow: hidden;
  position: absolute;
  text-overflow: ellipsis;
  top: 15px;
  left: 10px;
  font-size: 15px;
  user-select: none;
  display: inline-block;
  pointer-events: none;
  padding: 15px 10px;
`