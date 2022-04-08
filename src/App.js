import { useEffect, useState } from "react";
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

const getLocalStorage = () => {
  let list = localStorage.getItem("dataList");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("dataList")));
  } else {
    return [];
  }
};

const App = () => {
  const [fullList, setFullList] = useState(getLocalStorage());
  // console.log(fullList);

  useEffect(() => {
    localStorage.setItem("dataList", JSON.stringify(fullList));
  }, [fullList]);

  const addNewListItemHandler = (props) => {
    setFullList((prevState) => {
      return [...prevState, props];
    });
  };

  return (
    <InitialWrapper>
      <AddNewItem addNewItem={addNewListItemHandler} />
      <FullList dataList={fullList} />
    </InitialWrapper>
  );
};

export default App;
