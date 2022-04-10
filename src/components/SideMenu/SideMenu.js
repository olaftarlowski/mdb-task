import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../UI/Button";

const SideMenuWrapper = styled.aside`
  background-color: #4a4a4a;
  text-align: left;
  height: fit-content;
  padding: 24px 12px 100px 12px;
  border: 1px solid #adadad;

  h3 {
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
`;

const SideMenu = (props) => {
  const [newCategory, setNewCategory] = useState("");
  const submitNewCategoryHandler = (e) => {
    e.preventDefault();
    if (newCategory === "") {
      return;
    }
    console.log(newCategory);
    props.newCategoryItem((prevState) => {
      return [...prevState, newCategory];
    });
  };
  const isIn = props.checkStatus;

  return (
    <SideMenuWrapper>
      <h3>Categories</h3>
      <div>
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
      <div>
        <h3>Add category</h3>
        <form onSubmit={submitNewCategoryHandler}>
          <label htmlFor="addCategory"></label>
          <input
            name="addCategory"
            type="text"
            autoComplete="off"
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button type="submit">Add category</Button>
        </form>
      </div>
    </SideMenuWrapper>
  );
};

export default SideMenu;
