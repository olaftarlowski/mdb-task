import { useEffect, useState } from "react";
import styled from "styled-components";
import AddNewItem from "./components/AddNewItem/AddNewItem";
import EditItem from "./components/EditItem/EditItem";
import FullList from "./components/FullList/FullList";
import FullListStatus from "./components/FullListStatus/FullListStatus";
import SideMenu from "./components/SideMenu/SideMenu";
import GlobalStyle from "./theme/GlobalStyle";

const FullContentWrapper = styled.div`
  text-align: center;
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.6em;
  color: white;

  h1 {
    font-size: 3em;
  }

  .status-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 24px 0 48px;

    @media (max-width: 900px) {
      width: 100%;
      flex-direction: column;
    }
  }

  @media (max-width: 400px) {
    h1 {
      font-size: 2.2em;
    }
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
    padding: 0 32px;
  }

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column-reverse;
  }

  @media (max-width: 900px) {
    > div {
      overflow-x: scroll;
      display: block;
      justify-content: center;
      padding: 0;
    }
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
  const [categoriesList, setCategoriesList] = useState([
    "all",
    "component",
    "software",
    "device",
    "other",
  ]);
  const [fullList, setFullList] = useState(
    getLocalStorage().filter((el) => {
      return categoriesList.includes(el.category);
    })
  );
  const [activeCategories, setActiveCategories] = useState(["all"]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({});

  useEffect(() => {
    localStorage.setItem("dataList", JSON.stringify(fullList));
  }, [fullList]);

  const addNewListItemHandler = (props) => {
    setFullList((prevState) => {
      return [...prevState, props];
    });
  };

  const deleteItemHandler = (itemId) => {
    setIsEditing(false);
    setFullList((currentList) => {
      const updatedList = currentList.filter((item) => item.id !== itemId);
      return updatedList;
    });
  };
  const handleEditClick = (item) => {
    setIsEditing(true);
    setEditedItem({ ...item });
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
    <FullContentWrapper>
      <h1>PC &amp; Workstation Builder</h1>
      <GlobalStyle />
      <section className="status-section">
        {isEditing ? (
          <EditItem
            setNewEditedItem={setEditedItem}
            setEditing={setIsEditing}
            setFullList={setFullList}
            fullList={fullList}
            editedItem={editedItem}
            categories={categoriesList}
          />
        ) : (
          <AddNewItem
            addNewItem={addNewListItemHandler}
            categories={categoriesList}
          />
        )}
        <FullListStatus fullListData={fullList} />
      </section>
      <MainContentWrapper>
        <div>
          <FullList
            dataList={filterFullList}
            deleteItem={deleteItemHandler}
            handleEditClick={handleEditClick}
          />
        </div>
        <SideMenu
          newCategoryItem={setCategoriesList}
          checkStatus={activeCategories}
          categoriesList={categoriesList}
          filterCheckbox={filterCheckbox}
        />
      </MainContentWrapper>
    </FullContentWrapper>
  );
};

export default App;
