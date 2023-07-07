import { Button, ProgressBar } from 'react-bootstrap';
import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";
import StyledArticle from '../component/Article';
import styled from 'styled-components';
import { useTranslation } from "react-i18next";

const StyledDiv = styled.div`
  display: block;
  width: 288px;
  margin: 0 auto;
  color: white;
  margin-bottom: 20px;
`;
const ProblemWrap = styled.div`
  height: 63px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;
const Problem = styled.p`
  display: grid!important;
  font-size: 14px;
  font-weight: bold;
  color : #f90;
  margin-bottom: 0px;
`;
const ProblemButtonText = styled.p`
  display: grid!important;
  width: 100%;
  white-space: normal;
  font-size: 13px;
  margin-bottom: 0px;
`;
const Bar = styled.img`
  width: 24px;
  height: 24px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
`
const ButtonWrap = styled.div`
  text-align: center;
  width: 288px;
  border: 8px solid #343a40;
  margin: 0 auto;
`;
const StyledButton = styled(Button)`
  background: #1e1e1e;
  width: 100%;
  min-height: 100px;
  margin: 0 auto;
  border: 0.5px solid #343a40;
  border-radius: 0%;
  color: white;
  font-size: 13px;
  padding-left: 24px;
  padding-right: 24px;
  display: block;

  &:hover{  
    background: rgb(0, 0, 0, 0);
    border: 0.5px solid #343a40;
    color : #f90;
  }
`;
const StyledScroller = styled.div`
  overflow: hidden;
  white-space: nowrap;
  padding-left: 0;
  overflow: true;
`;
const StyledItem = styled.div`
  width: 375px;
  display: inline-block;
`;



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
    // save answer score
    if (type.indexOf(state) === 0) {
      setData(prev => ({...prev, scores: {...prev.scores, [type]: prev.scores[type] + 1}}));
    }

    // go to next problem or page
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
      setProgress(progress + 1);
    }
  }

      // transition: { duration: 1 }

  return (
    <StyledArticle>
      <StyledDiv style={{position: "relative"}}>
        <ProgressBar variant="warning" now={100 / problemNum * progress}></ProgressBar>
      </StyledDiv>

      <div>
        <div>
          <img src='/images/common-img/off-bar-s.svg'/>
        </div>
        <div>
          <img src='/images/common-img/off-bar-s-back.svg'/>
        </div>
        <div>
          <img src='/images/common-img/on-bar-s.svg'/>
        </div>
        <div>
          <img src='/images/common-img/on-bar-s-back.svg'/>
        </div>
      </div>
      

      <StyledScroller 
        className='scroller'>
      {
        t('test').data
        .map((data, idx) => {
          return (
            <StyledItem 
                key={idx}
                style={{"transform": 'translate(-' + (progress-1)*375 + 'px, 0px)', "transition-duration": "500ms"}}>
              <StyledDiv>
                <Bar src={t('test')['bar']} alt={t('test')['bar']}/>
                <ProblemWrap>
                <div style={{"width":"100%"}}>
                {
                  data["content"]
                  .map((text, idx) => {
                    return (<Problem key={idx} className='test-content text-center'>{text}</Problem>);
                  })
                }
                </div>
                </ProblemWrap>
                <Bar src={t('test')['bar']} alt={t('test')['bar']}/>
              </StyledDiv>
              <ButtonWrap>
                <StyledButton className='test-btn-A' onClick={ () => {next(data["type"], data["A"])} }>
                {
                  data["text-A"]
                  .map((text, idx) => {
                    return (<ProblemButtonText key={idx}>{text}</ProblemButtonText>);
                  })
                }
                </StyledButton>
                <StyledButton className='test-btn-B' onClick={ () => {next(data["type"], data["B"])} }>
                {
                  data["text-B"]
                  .map((text, idx) => {
                    return (<ProblemButtonText key={idx}>{text}</ProblemButtonText>);
                  })
                }
                </StyledButton>
              </ButtonWrap>
            </StyledItem>
          );
          })
      }
      </StyledScroller>
    </StyledArticle>
  );
};

export default Test;