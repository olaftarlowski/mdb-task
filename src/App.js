import { useEffect, useState } from "react";
import styled from "styled-components";
import AddNewItem from "./components/AddNewItem/AddNewItem";
import FullList from "./components/FullList/FullList";
import SideMenu from "./components/SideMenu/SideMenu";

const InitialWrapper = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.6em;
  color: white;

  p {
    display: inline-block;
    margin: 0;
  }
`;
const MainContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
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
  const [
    categoriesList,
    //  setCategoriesList
  ] = useState(["all", "component", "software", "device", "other"]);
  const [activeCategories, setActiveCategories] = useState(["all"]);

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

  const filterCheckbox = (checkbox) => {
    if (checkbox === "all") {
      setActiveCategories(["all"]);
    }
    if (activeCategories.includes(checkbox)) {
      setActiveCategories((currentList) => {
        const updatedList = currentList.filter(
          (item) => item.toLowerCase() !== checkbox
        );
        if (updatedList.length === 0) {
          setActiveCategories(["all"]);
        } else {
          return updatedList;
        }
        return updatedList;
      });
    } else {
      setActiveCategories((prevState) => {
        return [
          ...prevState.filter((item) => item !== "all"),
          checkbox.toLowerCase(),
        ];
      });
    }
  };

  const filterFullList = fullList.filter((el) => {
    if (activeCategories.includes("all")) {
      return el;
    }
    return activeCategories.includes(el.category);
  });

  return (
    <InitialWrapper>
      <div>
        <p>Total price: {totalPrice}$</p>
        <p>
          Total {fullList.length} {fullList.length > 1 ? "items" : "item"}
        </p>
      </div>
      <AddNewItem
        addNewItem={addNewListItemHandler}
        categories={categoriesList}
      />
      <MainContentWrapper>
        <FullList dataList={filterFullList} deleteItem={deleteItemHandler} />
        <SideMenu
          checkStatus={activeCategories}
          categoriesList={categoriesList}
          filterCheckbox={filterCheckbox}
        />
      </MainContentWrapper>
    </InitialWrapper>
  );
};

export default App;
