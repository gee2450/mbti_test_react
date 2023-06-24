import { React, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import StyledArticle from '../component/Article';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ResultWindowContents as Data } from '../component/ResultWindowContents';

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

const Result = () => {
  // get test result code from url queary string
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resultImg = parseInt(searchParams.get('code')) || 0; 
  
  // container to get data about result content
  // all testers can see this contents
  const [ data, setData ] = useState(Data)

  // get results data from result.json and save in field array
  useEffect(() => {
    axios('/data/ko-KR/result.json')
    // axios('/data/en-US/result.json')
      .then((results) => {
        if (results.data.length !== 0) {
          for (const name in results.data) {
            setData(prev => ({...prev, [name]: results.data[name]}));
          }
        }
    });
  }, []);

  // restart button method
  const navigate = useNavigate();
  const nextPage = () => { navigate('/'); }

  function getUrl(){
    var url = window.document.location.href;  //url에는 현재 주소값을 넣어줌
    return url;
  }
  // share functions
  function shareTwitter() {
    var sendText = data['share-content'].twitter['send-text']; // 전달할 텍스트
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
          title: data['share-content'].kakao['send-text-title'], // 보여질 제목
          description: data['share-content'].kakao['send-text-description'], // 보여질 설명
          imageUrl: data['result-data'][resultImg * 1]['src'], // 콘텐츠 URL
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
        
    alert(data['share-content'].link['send-text'])  // 알림창
    return sendUrl;
  }

  return (
    <StyledArticle>
      <h1>{data.header}</h1>
      {
        data['result-data']
        .filter((_, idx) => idx === resultImg)
        .map((content, idx) => {
          return (
            <StyledDiv className="content" key={idx}>
              <ResultImage
                src={content["src"]} alt={content["src"]}>
              </ResultImage>
              <h2>{content["title"]}</h2>
              <h3>{content["content"]}</h3>
            </StyledDiv>
          );
        })
      }
      <StyledDiv>
        <Icon onClick={shareUrl}>
          <ShareImage src={data['share-image-url'].link} alt="" />
        </Icon>
        <Icon onClick={shareFacebook}>
          <ShareImage src={data['share-image-url'].facebook} alt="" />
        </Icon>
        <Icon onClick={shareTwitter}>
          <ShareImage src={data['share-image-url'].twitter} alt="" />
        </Icon>
        <Icon id="kakao_image" onClick={shareKakao}>
          <ShareImage src={data['share-image-url'].kakao} alt="" />
        </Icon>
      </StyledDiv>
      <StyledDiv className="btn-wrap d-grid gap-2">
        <Button className='btn-test-result' variant="dark" size="lg" onClick={nextPage}>
          {data["restart-button"]}
        </Button>
      </StyledDiv>
    </StyledArticle>
  );
};

export default Result;