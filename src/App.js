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
  const [totalPrice, setTotalPrice] = useState(0);
  // console.log(fullList);
  const countTotalPrice = (arr) =>
    arr.reduce(
      (previousValue, currentValue) => previousValue + +currentValue.price,
      0
    );

  useEffect(() => {
    localStorage.setItem("dataList", JSON.stringify(fullList));
    setTotalPrice(countTotalPrice(fullList).toFixed(2));
  }, [fullList]);

  const addNewListItemHandler = (props) => {
    setFullList((prevState) => {
      return [...prevState, props];
    });
  };

  const deleteItemHandler = (itemId) => {
    setFullList((currentList) => {
      const updatedList = currentList.filter((item) => item.id !== itemId);
      return updatedList;
    });
  };

  return (
    <InitialWrapper>
      <div>
        <p>Total price: {totalPrice}$</p>
        <p>
          Total {fullList.length} {fullList.length > 1 ? "items" : "item"}
        </p>
      </div>
      <AddNewItem addNewItem={addNewListItemHandler} />
      <FullList dataList={fullList} deleteItem={deleteItemHandler} />
    </InitialWrapper>
  );
};

export default App;
