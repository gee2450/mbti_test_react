import { Button, ProgressBar } from 'react-bootstrap';
import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";
import StyledArticle from '../component/Article';
import { useTranslation } from "react-i18next";

const Test = () => {
  const { t } = useTranslation();

  const [ data, setData ] = useState({
    types: ["EI", "SN", "TF", "JP"],
    scores: 
    {
      "EI": 0, 
      "SN": 0, 
      "TF": 0, 
      "JP": 0
    }
  });

  // button click method
  const problemNum = t('test').data.length;

  const [progress, setProgress] = useState(1);
  const navigate = useNavigate();

  function next(type, state) {
    if (type.indexOf(state) === 0) {
      setData(prev => ({...prev, scores: {...prev.scores, [type]: prev.scores[type] + 1}}));
    }

    if (progress === problemNum)
    {
      var result = "";
      ["EI", "SN", "TF", "JP"].forEach((state) => {
        const _score = data.scores[state];
        result += (_score >= 2) ? "0" : "1";
      })
      
      console.log(`before: ${result}, after: ${parseInt(result, 2)}`);
      navigate(`/result?code=${parseInt(result, 2)}`);
    }
    else {
      setProgress(progress + 1)
    }
  }

  return (
    <StyledArticle>
      <ProgressBar variant="warning" now={100 / problemNum * progress}></ProgressBar>
      {
        t('test').data
        .filter((_, idx) => progress === idx + 1)
        .map((content, idx) => {
          return(
            <div key={idx}>
              <h1 className='test-name text-center'>{content["name"]}</h1>
              <h3 className='test-content text-center'>{content["content"]}</h3>
              <div className="btn-wrap d-grid gap-2">
                <Button className='test-btn-A' variant="dark" size="lg" 
                  onClick={ () => {next(content["type"], content["A"])} }>{content["A"]}</Button>
                <Button className='test-btn-B' variant="dark" size="lg" 
                  onClick={ () => {next(content["type"], content["B"])} }>{content["B"]}</Button>
              </div>
            </div>
          );
        })
      }
      {

      }
    </StyledArticle>
  );
};

export default Test;