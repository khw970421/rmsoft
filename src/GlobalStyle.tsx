import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  margin:0;
  box-sizing:border-box;
}

button {
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 0.2rem;
  text-align: center;
  font-size: 1.2rem;
  border-radius: 0;
  appearance: none; 
  cursor:pointer;
  min-width: 1rem;
  min-height: 1rem;
}

.text-ellipsis{
  width:100%; 
  padding:0 5px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
}

.focus{
  background-color: #e2e2e2;
}
`;

export default GlobalStyle;