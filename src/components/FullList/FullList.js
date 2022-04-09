import styled from "styled-components";

const Table = styled.table`
  max-width: 1100px;
  height: max-content;
  width: 100%;
  background-color: #ffffff;
  border-collapse: collapse;
  border-width: 1px;
  border-color: #0a0800;
  border-style: solid;
  color: #000;
  word-wrap: break-word;
  table-layout: fixed;

  .idx {
    width: 10%;
  }
  .title {
    width: 20%;
  }
  .desc {
    width: 40%;
  }
  .cat {
    width: 20%;
  }
  .price {
    width: 10%;
  }

  td,
  th {
    border-width: 1px;
    border-color: #0a0800;
    border-style: solid;
    padding: 6px;
    text-overflow: ellipsis;
  }

  thead {
    background-color: #fff;
  }
`;

const FullList = (props) => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th className="idx">Index</th>
            <th className="title">Title</th>
            <th className="desc">Description</th>
            <th className="cat">Category</th>
            <th className="price">Price ($)</th>
          </tr>
        </thead>
        <tbody>
          {props.dataList.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <button onClick={() => props.handleEditClick(item)}>
                    EDIT
                  </button>
                  <button onClick={() => props.deleteItem(item.id)}>
                    remove
                  </button>
                </td>
                <td>{item.name}</td>
                <td>{item.desc}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default FullList;
