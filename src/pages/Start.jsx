import React from 'react';
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();
  const nextPage = () => {
    if (true)
    {
      navigate('/test');
    }
  }

  return (
    <div>
      <h1>Start !!!</h1>
      <button onClick={nextPage}>Start !!!</button>
    </div>
  );
};

export default Start;