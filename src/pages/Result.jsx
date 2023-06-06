import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useLocation } from "react-router-dom";
import StyledArticle from '../component/Article';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResultImage = styled.img`
  width: 200px;
  height: 200px;
  margin: 0 auto;
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
  // image 확인용 test 숫자
  var resultImg;
  const location = useLocation();

  if (location.state == null) {
    resultImg = 0;
  }
  else {
    resultImg = location.state.result;
  }
  
  console.log("result image number", resultImg);
  
  const resultImages = [
    {"result": "0", "title":"result: 0", "content":"content", "src": "/images/ESTJ.jpg"},
    {"result": "1", "title":"result: 1", "content":"content", "src": "/images/ESTP.jpg"},
    {"result": "2", "title":"result: 2", "content":"content", "src": "/images/ESFJ.jpg"},
    {"result": "3", "title":"result: 3", "content":"content", "src": "/images/ESFP.jpg"},
    {"result": "4", "title":"result: 4", "content":"content", "src": "/images/ENTJ.jpg"},
    {"result": "5", "title":"result: 5", "content":"content", "src": "/images/ENTP.jpg"},
    {"result": "6", "title":"result: 6", "content":"content", "src": "/images/ENFJ.jpg"},
    {"result": "7", "title":"result: 7", "content":"content", "src": "/images/ENFP.jpg"},
    {"result": "8", "title":"result: 8", "content":"content", "src": "/images/ISTJ.jpg"},
    {"result": "9", "title":"result: 9", "content":"content",  "src": "/images/ISTP.jpg"},
    {"result": "10", "title":"result: 10", "content":"content", "src": "/images/ISFJ.jpg"},
    {"result": "11", "title":"result: 11", "content":"content", "src": "/images/ISFP.jpg"},
    {"result": "12", "title":"result: 12", "content":"content", "src": "/images/INTJ.jpg"},
    {"result": "13", "title":"result: 13", "content":"content", "src": "/images/INTP.jpg"},
    {"result": "14", "title":"result: 14", "content":"content", "src": "/images/INFJ.jpg"},
    {"result": "15", "title":"result: 15", "content":"content", "src": "/images/INFP.jpg"},
  ]

  const navigate = useNavigate();
  const nextPage = () => {
    if (true)
    {
      navigate('/');
    }
  }


function getUrl(){
  var url = window.document.location.href;  //url에는 현재 주소값을 넣어줌
  return url;
}

// share functions
function shareTwitter() {
  var sendText = "test "; // 전달할 텍스트
  var sendUrl = getUrl(); // 전달할 URL
  window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
  console.log("Twitter finish");
}
function shareFacebook() {
  var sendUrl = getUrl(); // 전달할 URL
  console.log("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
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
        title: "나는 어떻게 계획을 세우는 타입일까?", // 보여질 제목
        description: "!! test !!", // 보여질 설명
        imageUrl: resultImages[resultImg * 1], // 콘텐츠 URL
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
      
  alert("URL이 복사되었습니다.")  // 알림창
  return sendUrl;
}

  return (
    <StyledArticle>
      <h1>Result Page</h1>
      {
        resultImages
        .filter((content, idx) => idx === resultImg)
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
          <ShareImage src="/images/icon-link.png" alt="link" />
        </Icon>
        <Icon onClick={shareFacebook}>
          <ShareImage src="/images/icon-facebook.png" alt="" />
        </Icon>
        <Icon onClick={shareTwitter}>
          <ShareImage src="/images/icon-twitter.png" alt="" />
        </Icon>
        <Icon id="kakao_image" onClick={shareKakao}>
          <ShareImage src="/images/icon-kakao.png" alt="" />
        </Icon>
      </StyledDiv>
      <StyledDiv className="btn-wrap d-grid gap-2">
        <Button className='btn-test-result' variant="dark" size="lg" onClick={nextPage}>Restart !!!</Button>
      </StyledDiv>
    </StyledArticle>
  );
};

export default Result;