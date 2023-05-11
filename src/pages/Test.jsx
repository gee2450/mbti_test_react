import React from 'react';
import { useNavigate } from "react-router-dom";

const Test = () => {
  const navigate = useNavigate();
  const nextPage = () => {
    if (true)
    {
      navigate('/result');
    }
  }

  return (
    <div>
      <h1>Test !!!</h1>
      <button onClick={nextPage}>Test !!!</button>
    </div>
  );
};

export default Test;