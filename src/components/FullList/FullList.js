import styled from "styled-components";
import Button from "../../UI/Button";

const Table = styled.table`
  max-width: 1100px;
  height: max-content;
  width: 100%;
  background-color: #ffffff;
  border-collapse: collapse;
  border: 1px solid #282c34;
  color: #000;
  word-wrap: break-word;
  table-layout: fixed;
  text-align: left;

  .title {
    width: 20%;
  }
  .desc {
    width: 40%;
  }
  .cat {
    width: 18%;
  }
  .price {
    width: 13%;
  }
  .controls {
    width: 12%;
  }

  th {
    background-color: #dbdbdb;
    font-size: 1.1em;
    padding: 8px 12px;
    border: 1px solid #282c34;
  }


  td {
    padding: 2px 8px;
    border: 1px solid #282c34;
    text-transform: capitalize;

    div {
      display: flex;
      flex-direction: row;
    }
  }

  tr:nth-of-type(even) {
    background-color: #ebebeb;
  }
`;

const FullList = (props) => {
  return (
    <>
      <Table>
        <thead>
          <tr>
            <th className="title">Title</th>
            <th className="desc">Description</th>
            <th className="cat">Category</th>
            <th className="price">Price($)</th>
            <th className="controls"></th>
          </tr>
        </thead>
        <tbody>
          {props.dataList.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.desc}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <div>
                    <Button edit onClick={() => props.handleEditClick(item)}>
                      <span className={"material-icons"}>mode_edit</span>
                    </Button>
                    <Button danger onClick={() => props.deleteItem(item.id)}>
                      <span className={"material-icons"}>delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default FullList;
