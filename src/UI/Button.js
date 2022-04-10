import styled, { css } from "styled-components";

const Button = styled.button`
  background-color: #28a745;
  border: 1px solid transparent;
  margin: 4px auto;
  border-radius: 0.25rem;
  padding: 0.75rem 0.75rem;
  font-weight: 300;
  color: #fff;
  text-transform: capitalize;
  font-size: 1em;
  line-height: 1.5;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  user-select: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: #218838;
    border-color: #1e7e34;
  }

  ${({ danger }) =>
    danger &&
    css`
      background-color: #dc3545;
      :hover {
        background-color: #c82333;
        border-color: #bd2130;
      }
    `}

  ${({ edit }) =>
    edit &&
    css`
      background-color: #007bff;
      :hover {
        background-color: #0069d9;
        border-color: #0062cc;
      }
    `}
`;

export default Button;
