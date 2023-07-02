import { React } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import StyledArticle from '../component/Article';
import { useTranslation } from "react-i18next";

const Start = () => {
  const { t } = useTranslation('translations');

  // button click method - go to next page, test page
  const navigate = useNavigate();
  const nextPage = () => { navigate('/test'); }

  return (
    <StyledArticle>
      <h1 className='title text-center'>{t('start')['title']}</h1>
      <h3 className='intro text-center'>{t('start')['intro']}</h3>
      <div className="btn-wrap d-grid gap-2">
        <Button className='btn-test-start' variant="dark" size="lg" onClick={nextPage}>{t('start')['btn-test-start']}</Button>
      </div>
    </StyledArticle>
  );
};

export default Start;