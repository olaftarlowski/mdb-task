import styled from "styled-components";

const Table = styled.table`
  max-width: 1200px;
  width: 100%;
  background-color: #ffffff;
  border-collapse: collapse;
  border-width: 1px;
  border-color: #0a0800;
  border-style: solid;
  color: #000;

  td,
  th {
    border-width: 1px;
    border-color: #0a0800;
    border-style: solid;
    padding: 3px;
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
            <th>Index</th>
            <th>Title</th>
            <th>Description</th>
            <th>Category</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {props.dataList.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index}</td>
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
