import { React, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import StyledArticle from '../component/Article';

const Start = () => {
  // button click method - go to next page, test page
  const navigate = useNavigate();
  const nextPage = () => { navigate('/test'); }

  // state to save start page content
  const [ data, setData ] = useState({
    title: "default title",
    intro: "default intro",
    "btn-test-start": "button"
  });

  // get start data from start.json and save in field array
  useEffect(() => {
    axios('/data/ko-KR/start.json')
    // axios('/data/en-US/start.json')
      .then((datas) => {
        for (const name in datas.data) {
          setData(prev => ({...prev, [name]: datas.data[name]}))
        }
    });
  }, []);

  return (
    <StyledArticle>
      <h1 className='title text-center'>{data['title']}</h1>
      <h3 className='intro text-center'>{data['intro']}</h3>
      <div className="btn-wrap d-grid gap-2">
        <Button className='btn-test-start' variant="dark" size="lg" onClick={nextPage}>{data['btn-test-start']}</Button>
      </div>
    </StyledArticle>
  );
};

export default Start;