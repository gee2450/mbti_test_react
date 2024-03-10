import './App.css';
import { Routes, Route } from "react-router-dom";
import Start from './pages/Start';
import Test from './pages/Test';
import Result from './pages/Result';
import { BrowserRouter } from "react-router-dom";
import { Button } from 'react-bootstrap';
import i18n from './lang/i18n.ts';

function App() {
  // 언어 변경하기
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  
  return (
    <BrowserRouter>
      <Button onClick={() => changeLanguage("en")}>
        English
      </Button>
      <Button onClick={() => changeLanguage("ko")}>
        Korean
      </Button>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/result/:code" element={<Result />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
