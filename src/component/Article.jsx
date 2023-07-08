import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const StyledArticle = styled.article`
    text-align: center;
    font-size: 0px;
    color: white;
    font-weight: 300;
`

const Article = ({ children, ...props }) => {
    return (
        <StyledArticle {...props}>{children}</StyledArticle>
    );
}

export default Article;