import { useEffect, useState } from "react";
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  div {
    padding: 16px 16px 0 16px;
    width: 50%;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  input {
    border: 1px solid #9cff9d;
    background-color: #baffbb;
    max-width: 260px;
    height: 30px;
    font-size: 24px;
  }
  textarea {
    border: 1px solid #9cff9d;
    background-color: #baffbb;
    height: 100px;
    font-size: 20px;
  }
  select {
    border: 1px solid #9cff9d;
    background-color: #baffbb;
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

const EditItem = (props) => {
  const [currentItem, setCurrentItem] = useState({ ...props.editedItem });
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    setCurrentItem({ ...props.editedItem });
    setNewTitle({ ...props.editedItem }.name);
    setNewDesc({ ...props.editedItem }.desc);
    setNewPrice({ ...props.editedItem }.price);
    setNewCategory({ ...props.editedItem }.category);
  }, [props.editedItem]);

  const nameHandler = (e) => {
    const updatedTitle = e.target.value;
    setNewTitle(updatedTitle);
    const updatedEditInput = { ...currentItem, name: updatedTitle };
    setCurrentItem(updatedEditInput);
  };
  const descHandler = (e) => {
    const updatedDesc = e.target.value;
    setNewDesc(updatedDesc);
    const updatedEditInput = { ...currentItem, desc: updatedDesc };
    setCurrentItem(updatedEditInput);
  };
  const priceHandler = (value) => {
    const updatedPrice = value;
    setNewPrice(updatedPrice);
    const updatedEditInput = { ...currentItem, price: updatedPrice };
    setCurrentItem(updatedEditInput);
  };
  const categoryHandler = (e) => {
    const updatedCategory = e.target.value;
    setNewCategory(updatedCategory);
    const updatedEditInput = { ...currentItem, category: updatedCategory };
    setCurrentItem(updatedEditInput);
  };

  function handleUpdateItem(id, editItem) {
    const updatedItem = props.fullList.map((item) => {
      return item.id === id ? editItem : item;
    });
    props.setEditing(false);
    props.setFullList(updatedItem);
  }

  const cancelEditHandler = (e) => {
    e.preventDefault();
    props.setEditing(false);
  };

  function handleEditFormSubmit(e) {
    e.preventDefault();
    const currentPrice = currentItem.price;
    if (currentPrice < 0) {
      alert("The price must be greater than 0.");
      return;
    }
    if (currentPrice.endsWith(".")) {
      currentItem.price = currentPrice.slice(0, -1);
    }
    handleUpdateItem(currentItem.id, currentItem);
  }

  return (
    <FormWrap onSubmit={handleEditFormSubmit}>
      <div>
        <label htmlFor="editTitle">Edit name:</label>
        <input
          placeholder="Enter new title..."
          id="editTitle"
          type="text"
          required
          value={newTitle}
          onChange={nameHandler}
        />
        <label htmlFor="editDescription">Edit description:</label>
        <textarea
          placeholder="Enter new description..."
          id="editDescription"
          required
          value={newDesc}
          onChange={descHandler}
        />
      </div>
      <div>
        <label htmlFor="editPrice">Edit price:</label>
        <CurrencyInput
          id="price"
          name="price"
          autoComplete="off"
          placeholder="Please enter a number"
          defaultValue={newPrice}
          value={newPrice}
          decimalsLimit={2}
          step={1}
          decimalSeparator="."
          onValueChange={priceHandler}
        />
        <label htmlFor="editCategory">Edit category:</label>
        <select
          id="editCategory"
          value={newCategory}
          onChange={categoryHandler}
        >
          {props.categories.slice(1).map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="buttons-container">
          <Button type="submit">Update</Button>
          <Button danger onClick={cancelEditHandler}>
            Cancel
          </Button>
        </div>
      </div>
    </FormWrap>
  );
};

export default EditItem;
