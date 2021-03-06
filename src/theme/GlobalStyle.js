import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    

  *, *::before, *::after {
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
  }

  html {
      font-size: 62.5%;
  }

  body {
      font-size: 1.2rem;
      font-family: "Montserrat", sans-serif;
  }
`;

export default GlobalStyle;
