import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StatusWrapper = styled.div`
  max-width: 450px;
  background-color: #787878;
  border: 2px solid #fff;
  border-radius: 10px;
  padding: 8px;

  .status__name {
    text-align: left;
    text-transform: capitalize;
  }

  div {
    display: grid;
    grid-template-columns: 4fr 2fr 3fr;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;

    span {
      max-width: 140px;
      word-wrap: break-word;
      /* text-overflow: ellipsis; */
    }
  }
  p {
    display: block;
    margin: 4px 0;
  }
`;

const FullListStatus = ({ fullListData }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const countTotalPrice = (arr) =>
    arr.reduce(
      (previousValue, currentValue) => previousValue + +currentValue.price,
      0
    );

  useEffect(() => {
    setTotalPrice(countTotalPrice(fullListData).toFixed(2));
  }, [fullListData]);

  const categoryTypes = fullListData
    .map((dataItem) => dataItem.category)
    .filter((mediaType, index, array) => array.indexOf(mediaType) === index);

  const counts = categoryTypes.map((mediaType) => {
    const filteredDataByCategory = fullListData.filter(
      (item) => item.category === mediaType
    );
    return {
      type: mediaType,
      count: filteredDataByCategory.length,
      totalCategoryPrice: countTotalPrice(filteredDataByCategory),
    };
  });

  return (
    <StatusWrapper>
      <div>
        <span className="status__name">Name</span>
        <span>Amount</span>
        <span>Price($)</span>
      </div>
      <hr />
      {counts.map((el) => {
        return (
          <div key={el.type}>
            <span className="status__name">{el.type}: </span>
            <span>{el.count} </span>
            <span>{el.totalCategoryPrice.toFixed(2)}</span>
          </div>
        );
      })}
      <hr />
      <p>
        Total price: <b>{totalPrice}$</b>
      </p>
      <p>
        Total <b>{fullListData.length}</b>{" "}
        {fullListData.length > 1 ? "items" : "item"}
      </p>
    </StatusWrapper>
  );
};

export default FullListStatus;
