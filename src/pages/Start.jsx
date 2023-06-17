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
  const [ datas, setDatas ] = useState({
    default: {
      title: "default title",
      intro: "default intro",
      "btn-test-start": "button"
    }
  });

  // get start data from start.json and save in field array
  useEffect(() => {
    axios('/data/start.json')
      .then((datas) => {
        setDatas({
          title: datas.data["title"],
          intro: datas.data["intro"],
          "btn-test-start": datas.data["btn-test-start"]
        })
    });
  }, []);

  return (
    <StyledArticle>
      <h1 className='title text-center'>{datas['title']}</h1>
      <h3 className='intro text-center'>{datas['intro']}</h3>
      <div className="btn-wrap d-grid gap-2">
        <Button className='btn-test-start' variant="dark" size="lg" onClick={nextPage}>{datas['btn-test-start']}</Button>
      </div>
    </StyledArticle>
  );
};

export default Start;