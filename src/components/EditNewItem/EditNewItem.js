import { useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";

const FormWrap = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  div {
    padding: 16px;
    width: 50%;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  input {
    max-width: 260px;
    height: 30px;
    font-size: 24px;
  }
  textarea {
    height: 100px;
    font-size: 20px;
  }
  select {
    width: 100%;
    height: 30px;
    font-size: 24px;
    cursor: pointer;
  }
  button {
    margin: 14px auto;
    font-size: 24px;
  }
`;

const EditNewItem = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("component");
  const [price, setPrice] = useState(0);
  const [symbolsArr] = useState(["e", "E", "+", "-"]);

  const submitEditHandler = (e) => {
    e.preventDefault();
    // const newListItem = {
    //   id: uuid(),
    //   name: title,
    //   desc: description,
    //   category: category,
    //   price: price,
    // };
    props.handleEditFormSubmit();
  };

  // const resetInput = (e) => {
  //   if (price === 0) {
  //     e.target.value = "";
  //   }
  // };

  //   EDIT

  //   const [currentTodo, setCurrentTodo] = useState({});

  return (
    <FormWrap onSubmit={submitEditHandler}>
      <div>
        <label htmlFor="title">edit Item name:</label>
        <input
          placeholder="Enter title..."
          id="title"
          type="text"
          required
          value={props.currentTodo.name}
          onChange={props.handleEditInputChange}
        />
        {/* <label htmlFor="description">edit Item description:</label>
        <textarea
          placeholder="Enter description..."
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /> */}
      </div>
      <div>
        {/* <label htmlFor="price">edit Price:</label>
        <input
          placeholder="Enter price..."
          autoComplete="off"
          type="number"
          name="price"
          id="price"
          step="0.01"
          onChange={(e) => setPrice(+e.target.value)}
          onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          onFocus={(e) => resetInput(e)}
          // value={price}
        />
        <label htmlFor="category">edit Item category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {props.categories.slice(1).map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select> */}

        <button type="submit">save item</button>
      </div>
    </FormWrap>
  );
};

export default EditNewItem;