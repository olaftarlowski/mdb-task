import { useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";

const FormWrap = styled.form`
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  input,
  select,
  textarea {
    width: 100%;
    height: 30px;
    font-size: 24px;
  }

  button {
    margin: 14px auto;
    font-size: 24px;
  }
`;

const AddNewItem = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("component");
  const [price, setPrice] = useState(0);
  const [symbolsArr] = useState(["e", "E", "+", "-"]);

  

  const submitHandler = (e) => {
    e.preventDefault();
    // if (price <= 0) {
    //     console.log('is price 0 ?');
    //     return;
    // }
    const newListItem = {
      id: uuid(),
      name: title,
      desc: description,
      category: category,
      price: price,
    };
    props.addNewItem(newListItem);
  };

  const resetInput = (e) => {
    if (price === 0) {
      e.target.value = "";
    }
  };

  return (
    <FormWrap onSubmit={submitHandler}>
      <label htmlFor="title">Item name:</label>
      <input
        placeholder="Enter title..."
        id="title"
        type="text"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="description">Item description:</label>
      <textarea
        placeholder="Enter description..."
        id="description"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label htmlFor="category">Item category:</label>
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
      </select>
      <label htmlFor="price">Price:</label>
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
      <button type="submit">Add item</button>
    </FormWrap>
  );
};

export default AddNewItem;
