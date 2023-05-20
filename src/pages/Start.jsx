import React from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import StyledArticle from '../component/Article';

const Start = () => {
  const navigate = useNavigate();
  const nextPage = () => {
    if (true)
    {
      navigate('/test');
    }
  }

  return (
    <StyledArticle>
      <h1 className='title text-center'>제목</h1>
      <h3 className='intro text-center'>인트로</h3>
      <div className="btn-wrap d-grid gap-2">
        <Button className='btn-test-start' variant="dark" size="lg" onClick={nextPage}>Start !!!</Button>
      </div>
    </StyledArticle>
  );
};

export default Start;