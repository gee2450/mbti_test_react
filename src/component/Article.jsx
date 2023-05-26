import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const StyledArticle = styled.article`
    text-align: center;
`

const Article = ({ children, ...props }) => {
    return (
        <StyledArticle {...props}>{children}</StyledArticle>
    );
}

export default Article;