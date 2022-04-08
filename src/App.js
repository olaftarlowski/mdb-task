import { useState } from "react";
import styled from "styled-components";
import AddNewItem from "./components/AddNewItem/AddNewItem";
import FullList from "./components/FullList/FullList";

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
  const [fullList, setFullList] = useState([]);
  console.log(fullList);

  const addNewListItemHandler = (props) => {
    setFullList((prevState) => {
      return [...prevState, props];
    });
  };

  return (
    <InitialWrapper>
      <AddNewItem dataList={fullList} addNewItem={addNewListItemHandler} />
      <FullList />
    </InitialWrapper>
  );
};

export default App;
