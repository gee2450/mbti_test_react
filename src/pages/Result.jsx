import { React, useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import StyledArticle from '../component/Article';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from "react-i18next";
import HoverButton from '../component/Button';

//#region styled-components
const Bars = styled.div`
  ${({ bar_cnt = 2 }) => {
    return `width: ` + bar_cnt * 12 + `px`;
  }};
  ${({ line_cnt = 1, weight = 1 }) => {
    return `height: ` + line_cnt * weight * 12 + `px`;
  }};
  margin: 0 auto;
`;
const ResultImage = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  margin-bottom: 10px;
`
const ShareImage = styled.img`
  width: 40px;
  height: 40px;
  margin: 10px;
`
const Icon = styled.div`
  margin-bottom: 10px;
  display: block;
  float: left;
  height: 80px;
  margin: 0 auto;
`
const Text = styled.p`
  display: block;
  margin-bottom: 0px;
  line-height: 1.17;
  ${({ font_size }) => {
    return `font-size: ${font_size}px`;
  }};
`;
//#endregion

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

  return (
    <StyledArticle>
      <div className="header">
        <Bars bar_cnt={12}>
          {getBars(t('images')["mini-bars"]["off-back"], t('images')["mini-bars"]["off-start"])}
        </Bars>
        <Text 
          font_size={24} className="orange-font" style={{"margin": "20px 0"}}
          dangerouslySetInnerHTML={{__html: t('result').header}}/>
        <Bars bar_cnt={12}>
          { getBars(t('images')["mini-bars"]["on-start"], t('images')["mini-bars"]["on-back"])}
        </Bars>
      </div>

      <div className="content">
        <div style={{"margin": "30px 0"}}>
          <ResultImage
            src={t('images')['mbti-images'][mbti]} alt={t('images')['mbti-images'][mbti]}>
          </ResultImage>
          <Text 
            font_size={18}
            dangerouslySetInnerHTML={{__html: t('result')['result-data'][mbti]["title"]}}/>
        </div>
        <Bars bar_cnt={12}>
          { getBars(t('images')["mini-bars"]["on-back"], t('images')["mini-bars"]["on-start"])}
        </Bars>
        <div style={{"margin-top": "36px"}}>{
          t('result')['result-data'][mbti]["content"]
          .map((content, idx)=> {
            return (<Text key={idx} 
                  style={{"color": "#f90", "fontWeight": "500" , "fontSize": "13px"}} 
                  dangerouslySetInnerHTML={{__html: content}}/>);
          })
        }</div>
        <Bars 
          bar_cnt={2} line_cnt={3} weight={1.25} 
          style={{"fontSize": "5px", "margin": "36px auto"}}>
          { getBars(t('images')["mini-bars"]["on-start"], t('images')["mini-bars"]["on-back"], 1)}
          { getBars(t('images')["mini-bars"]["on-start"], t('images')["mini-bars"]["on-back"], 1)}
          { getBars(t('images')["mini-bars"]["on-start"], t('images')["mini-bars"]["on-back"], 1)}
        </Bars>
      </div>

      <img className="line" src={t('images')["x-bars"]} alt={t('images')["x-bars"]}/>

      <div style={{"overflow": "auto", "margin-top":"24px", "margin-bottom": "44px"}}>
        <div>
          <ResultImage style={{"width": "30px", "height": "30px", "margin": "0"}} src={t('images')["tree"]} alt={t('images')["tree"]}/>
        </div>
        <Text 
          font_size={24} style={{"margin":"24px auto"}}
          dangerouslySetInnerHTML={{__html: t('result')['friend-text']}}/>
        <div style={{"overflow": "auto", "width": "80%", "margin": "0 auto"}}>{
          [ [t('result')['result-data'][mbti]['friend1'], t('images')["like"], t('result')['like-text'], "left"], 
            [t('result')['result-data'][mbti]['friend2'], t('images')["dislike"], t('result')['dislike-text'], "right"]]
          .map((friend_feature, idx) => {
            const [friend, feature_img, feature_text, floatD] = friend_feature;
            return (
              <div key={idx} style={{"width": "45%", "float": floatD}}>
                <img style={{"width": "30px", "height": "30px", "margin": "10px 0"}} src={feature_img} alt={feature_img}/>
                <Text 
                  font_size={13} 
                  dangerouslySetInnerHTML={{__html: feature_text}}/>
                <ResultImage
                  style={{"width": "110px", "height": "110px"}}
                  src={t('images')['mbti-images'][friend]} alt={t('images')['mbti-images'][friend]}>
                </ResultImage>
                <Text 
                  font_size={13}
                  dangerouslySetInnerHTML={{__html: t('result')['result-data'][friend]["title"]}}/>
              </div>
            );
          })
        }</div>
      </div>

      <img src={t('images')["x-bars"]} alt={t('images')["x-bars"]}/>

      <div style={{"overflow": "auto", "margin":"24px auto"}}>
        <div></div>
        <Text font_size={23}
          style={{"color": "white"}}
          dangerouslySetInnerHTML={{__html: t('result')['share-text']["title"]}}/>
        <Text font_size={16}
          style={{"margin": "24px 0 30px"}}
          dangerouslySetInnerHTML={{__html: t('result')['share-text']["content"]}}/>

        <div style={{"overflow": "auto", "width": "288px", "margin": "0 auto 20px"}}>
          <Icon style={{"width": "25%"}} onClick={shareUrl}>
            <ShareImage src={t('images')['share-image-url'].link} alt="" />
            <p style={{"width": "fit-content", "color": "white", "fontSize": "12px", "margin": "0 auto"}}>URL 복사</p>
          </Icon>
          <Icon style={{"width": "25%"}} onClick={shareFacebook}>
            <ShareImage src={t('images')['share-image-url'].facebook} alt="" />
            <p style={{"width": "fit-content", "color": "white", "fontSize": "12px", "margin": "0 auto"}}>페이스북</p>
          </Icon>
          <Icon style={{"width": "25%"}} onClick={shareTwitter}>
            <ShareImage src={t('images')['share-image-url'].twitter} alt="" />
            <p style={{"width": "fit-content", "color": "white", "fontSize": "12px", "margin": "0 auto"}}>트위터</p>
          </Icon>
          <Icon id="kakao_image" style={{"width": "25%"}} onClick={shareKakao}>
            <ShareImage src={t('images')['share-image-url'].kakao} alt="" />
            <p style={{"width": "fit-content", "color": "white", "fontSize": "12px", "margin": "0 auto"}}>카카오톡</p>
          </Icon>
        </div>
      </div>
      <div>
        <HoverButton
          onClick={nextPage}
          text_line={2}
          dangerouslySetInnerHTML={{__html: t('result')["restart-button"]}}/>
      </div>
    </StyledArticle>
  );
};

export default Result;