import { Button, ProgressBar } from 'react-bootstrap';
import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";
import StyledArticle from '../component/Article';

const Test = () => {
  // 임시 problems
  const problems = [
    {"test-no": "문제 1번", "test-content": "문제내용"},
    {"test-no": "문제 2번", "test-content": "문제내용"},
    {"test-no": "문제 3번", "test-content": "문제내용"},
    {"test-no": "문제 4번", "test-content": "문제내용"},
    {"test-no": "문제 5번", "test-content": "문제내용"},
    {"test-no": "문제 6번", "test-content": "문제내용"},
    {"test-no": "문제 7번", "test-content": "문제내용"},
    {"test-no": "문제 8번", "test-content": "문제내용"},
    {"test-no": "문제 9번", "test-content": "문제내용"},
    {"test-no": "문제 10번", "test-content": "문제내용"},
    {"test-no": "문제 11번", "test-content": "문제내용"},
    {"test-no": "문제 12번", "test-content": "문제내용"},
  ]

  const problemNum = problems.length;
  const [progress, setProgress] = useState(1);
  const navigate = useNavigate();

  const next = () => {
    if (progress == problemNum)
    {
      navigate('/result');
    }
    else {
      setProgress(progress + 1)
    }
  }

  return (
    <StyledArticle>
      <ProgressBar variant="warning" now={100 / problemNum * progress}></ProgressBar>
      <h4>{progress}</h4>
      {
        problems.map((content, idx)=>{
          if (progress == idx + 1) {
            return(
              <div key={idx}>
                <h1 className='test-no text-center'>{content["test-no"]}</h1>
                <h3 className='test-content text-center'>{content["test-content"]}</h3>
              </div>
            );
          }
        })
      }
      <div className="btn-wrap d-grid gap-2">
        <Button className='btn-test-start' variant="dark" size="lg" onClick={next}>Test !!!</Button>
      </div>
    </StyledArticle>
  );
};

export default Test;