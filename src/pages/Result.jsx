import { React, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import StyledArticle from '../component/Article';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from "react-i18next";

const Bars = styled.div`
  ${({ bar_cnt = 2 }) => {
    return `width: ` + bar_cnt * 12 + `px`;
  }};
  ${({ line_cnt = 1, weight = 1 }) => {
    return `height: ` + line_cnt * weight * 24 + `px`;
  }};
  margin: 0 auto;
  margin-top: 18px;
  margin-bottom: 18px;
`;
const ResultImage = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  margin-bottom: 10px;
  display: block;
  border-radius: 70%;
`
const ShareImage = styled.img`
  width: 40px;
  height: 40px;
  margin: 10px;
`
const StyledDiv = styled.div`
  margin-bottom: 10px;
`
const Icon = styled.div`
  margin-bottom: 10px;
  display: inline;
`
const Text = styled.p`
  display: grid!important;
  color : #f90;
  margin-bottom: 0px;
  font-weight: 300;
`;
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
const ButtonText = styled.p`
  display: grid!important;
  width: 100%;
  white-space: normal;
  font-size: 13px;
  margin-bottom: 0px;
`;

const Result = () => {
  const { t } = useTranslation();

  // get test result code from url queary string
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = parseInt(searchParams.get('code')) || 0; 
  const [ mbti, setMbti ] = useState("ISFP");
  
  // restart button method
  const navigate = useNavigate();
  const nextPage = () => { navigate('/'); }

  function getUrl(){
    var url = window.document.location.href;  //url에는 현재 주소값을 넣어줌
    return url;
  }
  // share functions
  function shareTwitter() {
    var sendText = t('result')['share-content'].twitter['send-text']; // 전달할 텍스트

    var sendUrl = getUrl(); // 전달할 URL
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
  }
  function shareFacebook() {
    var sendUrl = getUrl(); // 전달할 URL
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
  }
  function shareKakao() {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
      }

      // 카카오링크 버튼 생성
      var sendUrl = getUrl();
      kakao.Link.createDefaultButton({
        container: '#kakao_image', // 카카오공유버튼ID
        objectType: 'feed',
        content: {
          title: t('result')['share-content'].kakao['send-text-title'], // 보여질 제목
          description: t('result')['share-content'].kakao['send-text-description'], // 보여질 설명
          imageUrl: t('result')['result-data'][code * 1]['src'], // 콘텐츠 URL

          link: {
            mobileWebUrl: sendUrl,
            webUrl: sendUrl
          }
        }
      });
    }
  }
  function shareUrl() {
    var sendUrl = getUrl();

    var textarea = document.createElement("textarea");  
    
    document.body.appendChild(textarea);
    textarea.value = sendUrl;  // textarea 값에 sendUrl를 넣어줌
    textarea.select();  //textarea를 설정
    document.execCommand("copy");   // 복사
    document.body.removeChild(textarea); //extarea 요소를 없애줌
        
    alert(t('result')['share-content'].link['send-text'])  // 알림창
    return sendUrl;
  }
  
  useEffect(() => {
    for (var key in t('result')['result-data']) {
      if (t('result')['result-data'][key].code == code) {
        setMbti(key);
      }
    }
  }, [])

  const getBars = (image1, image2, repeat=6) => {
    var arr = [];
    for (let i = 0; i < repeat; i++) {
      arr.push(
        <div key={i} style={{"width": "fit-content", "height": "fit-content", "float": "left"}}>
          <img src={image1} alt={image1}/>
          <img src={image2} alt={image2}/>
        </div>
      );
    }
    return arr;
  }

  const brMaker = (texts, style) => {
    var arr = [];
    for (var i = 0; i < texts.length; i++) {
      if (texts[i] === "") {
        arr.push(<br key={i}/>)
      }
      else {
        arr.push(<Text key={i} style={style}>{texts[i]}</Text>);
      }
    }
    return arr;
  }

  return (
    <StyledArticle>
      <Bars bar_cnt={12}>
        { getBars(t('images')["mini-bars"]["off-back"], t('images')["mini-bars"]["off-start"])}
      </Bars>
      <Text 
        style={{"color": "#f90", "fontSize": "24px"}}>
        {t('result').header}
      </Text>
      <Bars bar_cnt={12}>
        { getBars(t('images')["mini-bars"]["on-start"], t('images')["mini-bars"]["on-back"])}
      </Bars>

      <StyledDiv className="content">
        <ResultImage
          src={t('images')['mbti-images'][mbti]} alt={t('images')['mbti-images'][mbti]}>
        </ResultImage>
        {
          t('result')['result-data'][mbti]["sub-title"]
          .map((line, idx) => {
            return (<Text key={idx} style={{"color": "white"}}>{line}</Text>);
          })
        }
        <Text 
          style={{"color": "#f90", "fontWeight": "bold", "fontSize": "18px"}}>
            {t('result')['result-data'][mbti]["title"]}
        </Text>
        
        <Bars bar_cnt={12}>
          { getBars(t('images')["mini-bars"]["on-back"], t('images')["mini-bars"]["on-start"])}
        </Bars>

        {
          brMaker(t('result')['result-data'][mbti]["content"], {"color": "#f90", "fontWeight": "500" , "fontSize": "13px"})
        }
      </StyledDiv>
      
      <Bars bar_cnt={2} line_cnt={3} weight={0.7} style={{"fontSize": "5px"}}>
        { getBars(t('images')["mini-bars"]["on-start"], t('images')["mini-bars"]["on-back"], 1)}
        { getBars(t('images')["mini-bars"]["on-start"], t('images')["mini-bars"]["on-back"], 1)}
        { getBars(t('images')["mini-bars"]["on-start"], t('images')["mini-bars"]["on-back"], 1)}
      </Bars>

      <img src={t('images')["x-bars"]} alt={t('images')["x-bars"]}/>
      
      <img src={t('images')["x-bars"]} alt={t('images')["x-bars"]}/>

      <StyledDiv>
        <Icon onClick={shareUrl}>
          <ShareImage src={t('result')['share-image-url'].link} alt="" />
        </Icon>
        <Icon onClick={shareFacebook}>
          <ShareImage src={t('result')['share-image-url'].facebook} alt="" />
        </Icon>
        <Icon onClick={shareTwitter}>
          <ShareImage src={t('result')['share-image-url'].twitter} alt="" />
        </Icon>
        <Icon id="kakao_image" onClick={shareKakao}>
          <ShareImage src={t('result')['share-image-url'].kakao} alt="" />

        </Icon>
      </StyledDiv>
      <StyledDiv>
        <StyledButton onClick={nextPage}>
          {t('result')["restart-button"]}
        </StyledButton>
      </StyledDiv>
    </StyledArticle>
  );
};

export default Result;