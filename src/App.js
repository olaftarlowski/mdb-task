import { useEffect, useState } from "react";
import styled from "styled-components";
import AddNewItem from "./components/AddNewItem/AddNewItem";
import EditNewItem from "./components/EditNewItem/EditNewItem";
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
  display: grid;
  grid-template-columns: 5fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 4px;
  grid-row-gap: 0px;

  > div {
    display: flex;
    justify-content: center;
    padding: 0 64px;
  }
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

  // EDITHANDLER2
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  function handleEditInputChange(e) {
    // console.log(e.target);
    setCurrentTodo({ ...currentTodo, name: e.target.value });
    // console.log(currentTodo);
  }

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }

  function handleUpdateTodo(id, updatedTodo) {
    const updatedItem = fullList.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setFullList(updatedItem);
  }

  function handleEditFormSubmit(e) {
    handleUpdateTodo(currentTodo.id, currentTodo);
  }

  // console.log(currentTodo);

  return (
    <InitialWrapper>
      <div>
        <p>Total price: {totalPrice}$</p>
        <p>
          Total {fullList.length} {fullList.length > 1 ? "items" : "item"}
        </p>
      </div>
      {isEditing ? (
        <EditNewItem
          handleEditInputChange={handleEditInputChange}
          currentTodo={currentTodo}
          handleEditFormSubmit={handleEditFormSubmit}
          categories={categoriesList}
        />
      ) : (
        <AddNewItem
          addNewItem={addNewListItemHandler}
          categories={categoriesList}
        />
      )}
      <MainContentWrapper>
        <div>
          <FullList
            dataList={filterFullList}
            deleteItem={deleteItemHandler}
            handleEditClick={handleEditClick}
          />
        </div>
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
