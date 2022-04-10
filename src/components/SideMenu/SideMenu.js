import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../UI/Button";

const SideMenuWrapper = styled.aside`
  background-color: #4a4a4a;
  text-align: left;
  height: fit-content;
  padding: 24px 12px 100px 12px;
  border: 1px solid #adadad;

  h2 {
    font-size: 1.2em;
    margin: 6px 0;
  }

  input[type="checkbox"] {
    margin: 0 6px;
    width: 20px;
    height: 20px;
  }

  label {
    padding: 0 6px;
    text-transform: capitalize;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    input[type="text"] {
      width: 100%;
      height: 30px;
      font-size: 24px;
    }
  }

  @media (max-width: 1200px) {
    width: 80%;
    margin: 12px auto;
    padding: 12px;

    div.all-categories {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin: 8px 0;

      div {
        margin: 4px;
      }
    }
    div.new-category {
      max-width: 50%;
    }
  }
  @media (max-width: 600px) {
    h2 {
      font-size: 1.5em;
      margin: 12px 0;
    }
    div.new-category {
      max-width: 100%;
    }
  }
`;

const SideMenu = (props) => {
  const [newCategory, setNewCategory] = useState("");
  const submitNewCategoryHandler = (e) => {
    e.preventDefault();
    if (
      newCategory === "" ||
      props.categoriesList.includes(newCategory.toLowerCase())
    ) {
      return;
    }

    props.newCategoryItem((prevState) => {
      return [...prevState, newCategory.toLowerCase()];
    });
    setNewCategory("");
  };
  const isIn = props.checkStatus;

  return (
    <SideMenuWrapper>
      <h2>Categories</h2>
      <div className="all-categories">
        {props.categoriesList.map((itemName, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                id={itemName}
                name={itemName}
                value={itemName}
                checked={isIn.includes(itemName)}
                onChange={() => props.filterCheckbox(itemName)}
              />
              <label htmlFor={itemName}>{itemName}</label>
            </div>
          );
        })}
      </div>
      <div className="new-category">
        <h2>Add category</h2>
        <form onSubmit={submitNewCategoryHandler}>
          <label htmlFor="addCategory"></label>
          <input
            name="addCategory"
            type="text"
            autoComplete="off"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button type="submit">Add category</Button>
        </form>
      </div>
    </SideMenuWrapper>
  );
};

export default SideMenu;
