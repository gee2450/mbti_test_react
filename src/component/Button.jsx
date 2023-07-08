import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const StyledButton = styled(Button)`
  background: rgb(0, 0, 0, 0);
  width: 288px;
  border: 8px solid #f90;
  margin: 0 auto;
  border-radius: 0%;
  font-size: 15px;
  color: #f90;

  ${({ text_line = 2 }) => {
    return `min-height: ${ 60 + 20 * text_line }px;`;
  }}

  &:hover{  
    background-color : #f90;
    border: 8px solid #f90;
    color : black;
  }
`;

const HoverButton = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>{children}</StyledButton>
  );
}

export default HoverButton;