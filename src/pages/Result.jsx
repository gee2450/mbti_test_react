import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import StyledArticle from '../component/Article';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  display: block;
  border-radius: 70%;
`
const StyledDiv = styled.div`
  margin-bottom: 10px;
`

const Result = () => {
  const resultImages = [
    {"result": "1", "title":"result: 1", "content":"content", "src": "/images/ENFJ.jpg"},
    {"result": "2", "title":"result: 2", "content":"content", "src": "/images/ENFP.jpg"},
    {"result": "3", "title":"result: 3", "content":"content", "src": "/images/ENTJ.jpg"},
    {"result": "4", "title":"result: 4", "content":"content", "src": "/images/ENTP.jpg"},
    {"result": "5", "title":"result: 5", "content":"content", "src": "/images/ESFJ.jpg"},
    {"result": "6", "title":"result: 6", "content":"content", "src": "/images/ESFP.jpg"},
    {"result": "7", "title":"result: 7", "content":"content", "src": "/images/ESTJ.jpg"},
    {"result": "8", "title":"result: 8", "content":"content", "src": "/images/ESTP.jpg"},
    {"result": "9", "title":"result: 9", "content":"content", "src": "/images/INFJ.jpg"},
    {"result": "10", "title":"result: 10", "content":"content",  "src": "/images/INFP.jpg"},
    {"result": "11", "title":"result: 11", "content":"content", "src": "/images/INTJ.jpg"},
    {"result": "12", "title":"result: 12", "content":"content", "src": "/images/INTP.jpg"},
    {"result": "13", "title":"result: 13", "content":"content", "src": "/images/ISFJ.jpg"},
    {"result": "14", "title":"result: 14", "content":"content", "src": "/images/ISFP.jpg"},
    {"result": "15", "title":"result: 15", "content":"content", "src": "/images/ISTJ.jpg"},
    {"result": "16", "title":"result: 16", "content":"content", "src": "/images/ISTP.jpg"},
  ]

  const navigate = useNavigate();
  const nextPage = () => {
    if (true)
    {
      navigate('/');
    }
  }

  // image 확인용 test 숫자
  const imgTest = "12";

  return (
    <StyledArticle>
      <h1>Result Page</h1>
      {
        resultImages.map((content, idx) => {
          if (idx+1 == imgTest) {
            return (
              <StyledDiv className="content" key={idx}>
                <StyledImage 
                  src={content["src"]} alt={content["src"]}>
                </StyledImage>
                <h2>{content["title"]}</h2>
                <h3>{content["content"]}</h3>
              </StyledDiv>
            );
          }
        })
      }
      <StyledDiv className="btn-wrap d-grid gap-2">
        <Button className='btn-test-result' variant="dark" size="lg" onClick={nextPage}>Restart !!!</Button>
      </StyledDiv>
    </StyledArticle>
  );
};

export default Result;