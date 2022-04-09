import React from "react";
import styled from "styled-components";
const SideMenuWrapper = styled.aside`
  background-color: #4a4a4a;
  text-align: left;
  height: fit-content;
  padding: 24px 0 100px 12px;
  border: 1px solid #adadad;

  input {
    margin: 0 6px;
    width: 20px;
    height: 20px;
  }

  label {
    padding: 0 6px;
    text-transform: capitalize;
  }
`;

const SideMenu = (props) => {
  const isIn = props.checkStatus;
  //   console.log(isIn);
  return (
    <SideMenuWrapper>
      <span>Categories</span>
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
    </SideMenuWrapper>
  );
};

export default SideMenu;
