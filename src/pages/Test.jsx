import { React, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import StyledArticle from '../component/Article';
import styled from 'styled-components';
import { useTranslation } from "react-i18next";

//#region styled-components
const Bars = styled.div`
  margin: 0 auto;
  display: inline-flex;
  margin-bottom: 20px;
`;
const Text = styled.p`
  display: grid!important;
  margin-bottom: 0px;
  line-height: 1.17;
  ${({ font_size = 13 }) => {
    return `font-size: ${font_size}px`;
  }}
`;
const BigBar = styled.img`
  width: 24px;
  height: 24px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
`
const Viewer = styled.div`
  width: 375px;
  overflow: hidden;
`;
const Items = styled.div`
  white-space: nowrap;
  height: 450px;
  ${({ test_cnt }) => {
    return `width: ` + test_cnt * 375 + `px`;
  }}
`;
const Item = styled.div`
  width: 375px;
  float: left;
`;
const ProblemWrap = styled.div`
  height: 63px;
  display: flex;
  align-items: center;
`;
const ButtonWrap = styled.div`
  width: 288px;
  border: 8px solid #343a40;
  margin: 0 auto;
`;
const StyledButton = styled.button`
  background: rgb(0,0,0,0);
  width: 100%;
  min-height: 100px;
  border: 0.5px solid #343a40;
  border-radius: 0%;
  font-size: 13px;
  display: block;
  color: white;

  &:hover{  
    background: rgb(0, 0, 0, 0);
    border: 0.5px solid #343a40;
    color : #f90;
  }
  &:active{
    background: rgb(0, 0, 0, 0);
    color : #f90;
  }
`;
//#endregion

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
    arr.push(t('images')['mini-bars']["on-start"]);
    for (var i=1; i<problemMaxNum; i++) {
      arr.push(i % 2 == 1 ? t('images')['mini-bars']["off-back"] : t('images')['mini-bars']["off-start"]);
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
      <Bars>{
        data.images
        .map((bar_image, idx) => {
          return(<img key={idx} src={bar_image} alt={bar_image}/>);
        })
      }</Bars>

      <Viewer>
        <Items test_cnt={problemMaxNum}>
        {
          t('test')['data']
          .map((data, idx) => {
            return (
              <Item 
                  key={idx}
                  style={{"width":"375px", "transform": 'translate(-' + (progress-1)*375 + 'px, 0px)', "transitionDuration": "750ms"}}>
                <div>
                  <BigBar src={t('images')['big-bar']} alt={t('images')['big-bar']}/>
                  <ProblemWrap>
                    <Text
                      style={{"width":"100%"}} font_size={14} 
                      className='orange-font font-bold' dangerouslySetInnerHTML={{__html: data["content"]}}/>
                  </ProblemWrap>
                  <BigBar src={t('test')['bar']} alt={t('test')['bar']}/>
                </div>
                <ButtonWrap>
                  <StyledButton onClick={ () => {next(data["type"], data["A"])} }>
                    <Text dangerouslySetInnerHTML={{__html: data["text-A"]}}/>
                  </StyledButton>
                  <StyledButton onClick={ () => {next(data["type"], data["B"])} }>
                    <Text dangerouslySetInnerHTML={{__html: data["text-B"]}}/>
                  </StyledButton>
                </ButtonWrap>
              </Item>
            );
          })
        }
        </Items>
      </Viewer>
    </StyledArticle>
  );
};

export default Test;