import { React } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import StyledArticle from '../component/Article';
import styled from 'styled-components';
import { useTranslation } from "react-i18next";

const StyledDiv = styled.div`
  text-align: left;
  display: block;
  margin: 0 auto;
  margin-bottom: 8px;
  color: white;
`;
const Intro = styled.p`
  display: grid!important;
  padding-left: 65px;
  margin-bottom: -5px;
  font-size: 15px;
  font-weight: bold;
  color: #6c757d;
`;
const Title = styled.p`
  display: grid!important;
  padding-left: 65px;
  margin-bottom: -5px;
  font-size: 25px;
  font-weight: bold;

  position: relative;
  z-index: 1;
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
`
const StyledButton = styled(Button)`
  background: rgb(0, 0, 0, 0);
  width: 288px;
  min-height: 70px;
  margin: 0 auto;
  border: 8px solid #f90;
  border-radius: 0%;
  color: #f90;
  font-size: 15px;

  &:hover{  
    background-color : #f90;
    border: 5px solid #f90;
    color : black;
  }
`;

const Start = () => {
  const { t } = useTranslation('translations');

  // button click method - go to next page, test page
  const navigate = useNavigate();
  const nextPage = () => { navigate('/test'); }

  return (
    <StyledArticle>
      <StyledDiv>
        <StyledDiv>
          {
            t('start')['intro']
            .map((content, idx) => {
              return (<Intro key={idx}>{content}</Intro>);
            })
          }
        </StyledDiv>
        {
          t('start')['title']
          .map((content, idx) => {
            return (<Title key={idx}>{content}</Title>);
          })
        }
        <ImageWrap>
          <Image src={t('start')['image']} alt={t('start')['image']}/>
        </ImageWrap>
      </StyledDiv>
      
      <div className="btn-wrap d-grid gap-2">
        <StyledButton className='btn-test-start' variant="dark" size="lg" onClick={nextPage}>{t('start')['btn-test-start']}</StyledButton>
      </div>
    </StyledArticle>
  );
};

export default Start;