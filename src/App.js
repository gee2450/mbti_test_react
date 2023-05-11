import './App.css';
import { Routes, Route } from "react-router-dom";
import Start from './pages/Start';
import Test from './pages/Test';
import Result from './pages/Result';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/result" element={<Result />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
