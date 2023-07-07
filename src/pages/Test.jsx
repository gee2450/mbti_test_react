import { Button } from 'react-bootstrap';
import { React, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import StyledArticle from '../component/Article';
import styled from 'styled-components';
import { useTranslation } from "react-i18next";

const Upper = styled.div`
  margin: 0 auto;
  display: inline-flex;
  margin-bottom: 20px;
`;
const Scroller = styled.div`
  overflow: hidden;
  white-space: nowrap;
  padding-left: 0;
  overflow: true;
`;
const ScrollerItem = styled.div`
  width: 375px;
  display: inline-block;
`;
const ProblemWrap = styled.div`
  height: 63px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;
const Bar = styled.img`
  width: 24px;
  height: 24px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
`
const Problem = styled.p`
  display: grid!important;
  font-size: 14px;
  font-weight: bold;
  color : #f90;
  margin-bottom: 0px;
`;
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
const ButtonText = styled.p`
  display: grid!important;
  width: 100%;
  white-space: normal;
  font-size: 13px;
  margin-bottom: 0px;
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
    }, 
    images: []
  });

  // button click method
  const problemMaxNum = t('test')['data'].length;

  const [progress, setProgress] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    var arr = [];
    arr.push(t('test')['progress-bars']["on-start"]);
    for (var i=1; i<problemMaxNum; i++) {
      arr.push(i % 2 == 1 ? t('test')['progress-bars']["off-back"] : t('test')['progress-bars']["off-start"]);
    }
    setData(prev => ({...prev, images: arr}));
  }, []);

  function next(type, state) {
    // save answer score
    if (type.indexOf(state) === 0) {
      setData(prev => ({...prev, scores: {...prev.scores, [type]: prev.scores[type] + 1}}));
    }

    // go to next problem or page
    if (progress === problemMaxNum)
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
      // change progress bar images
      var _images = [...data.images];
      _images[progress] =  data.images[progress].replace("off", "on");
      setData(prev => ({...prev, images: _images}));
      setProgress(progress + 1);
    }
  }

  return (
    <StyledArticle>
      <Upper>
      {
        data.images
        .map((bar_image, idx) => {
          return(
            <div key={idx}>
              <img src={bar_image}/>
            </div>
          );
        })
      }
      </Upper>

      <Scroller 
        className='scroller'>
      {
        t('test')['data']
        .map((data, idx) => {
          return (
            <ScrollerItem 
                key={idx}
                style={{"transform": 'translate(-' + (progress-1)*375 + 'px, 0px)', "transitionDuration": "750ms"}}>
              <div>
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
              </div>
              <ButtonWrap>
                <StyledButton className='test-btn-A' onClick={ () => {next(data["type"], data["A"])} }>
                {
                  data["text-A"]
                  .map((text, idx) => {
                    return (<ButtonText key={idx}>{text}</ButtonText>);
                  })
                }
                </StyledButton>
                <StyledButton className='test-btn-B' onClick={ () => {next(data["type"], data["B"])} }>
                {
                  data["text-B"]
                  .map((text, idx) => {
                    return (<ButtonText key={idx}>{text}</ButtonText>);
                  })
                }
                </StyledButton>
              </ButtonWrap>
            </ScrollerItem>
          );
          })
      }
      </Scroller>
    </StyledArticle>
  );
};

export default Test;