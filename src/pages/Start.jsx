import { React } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import StyledArticle from '../component/Article';
import styled from 'styled-components';
import { useTranslation } from "react-i18next";
import HoverButton from '../component/Button';

//#region styled-components
const StyledDiv = styled.div`
  text-align: left;
  display: block;
  margin: 0 auto;
  margin-bottom: 8px;
  color: white;
`;
const Text = styled.p`
  display: grid!important;
  padding-left: 50px;
  margin-bottom: -5px;
  line-height: 1.17;

  ${({ font_size }) => {
    return `font-size: ${font_size}px;`;
  }};
  ${({ bench_mark = "false" }) => {
    if (bench_mark === "true") {
      return `position: relative; z-index: 1;`;
    }
  }};
`;
const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;
const Image = styled.img`
  position: absolute;
  top: -75px;
  left: 0px;
  right: 0px;
  width: 375px;
  height: 375px;
  margin: 0 auto;
`;
//#endregion

const Start = () => {
  const { t } = useTranslation('translations');

  // button click method - go to next page, test page
  const navigate = useNavigate();
  const nextPage = () => { navigate('/test'); }

  return (
    <StyledArticle>
      <StyledDiv>
        <StyledDiv>
          <Text
            className="gray-font font-bold" font_size={15}
            dangerouslySetInnerHTML={{__html: t('start')['intro']}}/>
        </StyledDiv>
        <Text 
          className="font-bold" font_size={25}
          bench_mark={true.toString()}
          dangerouslySetInnerHTML={{__html: t('start')['title']}}/>
        <ImageWrap>
          <Image src={t('images')['start-image']} alt={t('images')['start-image']}/>
        </ImageWrap>
      </StyledDiv>
      
      <HoverButton
        className="font-bold" text_line={1} onClick={nextPage} 
        dangerouslySetInnerHTML={{__html: t('start')['btn-test-start']}}/>
    </StyledArticle>
  );
};

export default Start;