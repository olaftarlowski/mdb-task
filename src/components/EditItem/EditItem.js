import { useState } from "react";
// import { v4 as uuid } from "uuid";
import styled from "styled-components";

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

const EditItem = (props) => {
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("component");
  // const [price, setPrice] = useState(0);
  const [symbolsArr] = useState(["e", "E", "+", "-"]);

  // const submitEditHandler = (e) => {
  //   e.preventDefault();
  //   // const newListItem = {
  //   //   id: uuid(),
  //   //   name: title,
  //   //   desc: description,
  //   //   category: category,
  //   //   price: price,
  //   // };
  //   props.handleEditFormSubmit();
  // };
  const [currentItem, setCurrentItem] = useState({ ...props.editedItem });

  const [newTitle, setNewTitle] = useState(currentItem.name);
  const [newDesc, setNewDesc] = useState(currentItem.desc);
  const [newPrice, setNewPrice] = useState(currentItem.price);
  const [newCategory, setNewCategory] = useState(currentItem.category);

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
  const priceHandler = (e) => {
    const updatedPrice = +e.target.value;
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
    handleUpdateItem(currentItem.id, currentItem);
  }
  const resetInput = (e) => {
    if (newPrice === 0) {
      e.target.value = "";
    }
  };

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
        <input
          placeholder="Enter new price..."
          autoComplete="off"
          type="number"
          name="editPrice"
          id="editPrice"
          step="0.01"
          onChange={priceHandler}
          onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
          onFocus={(e) => resetInput(e)}
          value={newPrice}
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
        <button type="submit">Update</button>
        <button onClick={cancelEditHandler}>Cancel</button>
        </div>
        
      </div>
    </FormWrap>
  );
};

export default EditItem;
