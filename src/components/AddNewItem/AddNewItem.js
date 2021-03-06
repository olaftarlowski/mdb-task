import { useState } from "react";
import { v4 as uuid } from "uuid";
import styled from "styled-components";
import Button from "../../UI/Button";
import CurrencyInput from "react-currency-input-field";

const FormWrap = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;

  .buttons-container {
    width: 236px;
  }
  div {
    padding: 16px 16px 0 16px;
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

  @media (max-width: 600px) {
    width: 90%;
    flex-direction: column;
    align-items: center;

    label {
      font-size: 1.3em;
      margin: 4px 0;
    }

    input,
    select,
    textarea {
      margin: 0 auto;
      width: 90%;
      max-width: none;
    }
    .buttons-container {
      margin: 0 auto;
    }

    > div {
      padding: 2px;
      width: 100%;
    }
  }
`;

const AddNewItem = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("component");
  const [price, setPrice] = useState(0);

  const submitHandler = (e) => {
    e.preventDefault();
    if (price <= 0) {
      alert("The price must be greater than 0.");
      return;
    }
    const newListItem = {
      id: uuid(),
      name: title,
      desc: description,
      category: category,
      price: price,
    };
    if (newListItem.price.endsWith(".")) {
      newListItem.price = newListItem.price.slice(0, -1);
    }
    props.addNewItem(newListItem);
    setTitle("");
    setDescription("");
    setCategory("component");
    setPrice(0);
  };

  return (
    <FormWrap onSubmit={submitHandler}>
      <div>
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
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <CurrencyInput
          id="price"
          name="price"
          autoComplete="off"
          placeholder="Please enter a number"
          defaultValue={price}
          value={price}
          decimalsLimit={2}
          step={1}
          decimalSeparator="."
          onValueChange={(value) => {
            setPrice(value);
          }}
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
        <div className="buttons-container">
          <Button type="submit">Add item</Button>
        </div>
      </div>
    </FormWrap>
  );
};

export default AddNewItem;
