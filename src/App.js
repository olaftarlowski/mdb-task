import styled from "styled-components";

const InitialWrapper = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.6em;
  color: white;
`;

const App = () => {
  return <InitialWrapper>basic render</InitialWrapper>;
};

export default App;
