import React from "react";
import styled from "styled-components";
const SideMenuWrapper = styled.aside`
  text-align: start;
  width: 20%;
  padding: 4px;
  border: 2px solid red;
`;

const SideMenu = (props) => {
  const isIn = props.checkStatus;
//   console.log(isIn);
  return (
    <SideMenuWrapper>
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
