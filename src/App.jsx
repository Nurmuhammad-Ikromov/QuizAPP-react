import { Routes, Route, useNavigate } from "react-router-dom"
import Header from "./Componentes/Header";
import Home from './Pages/Home';
import Quiz from './Pages/Quiz';
import API from './utils/config';

function App() {
  const navigate = useNavigate();


  function startChange(num, category) {
    API.get(`api.php?amount=${num}&category=${category}&type=multiple`)
      .then((res) => {
        navigate("/quiz", { state: { data: res.data.results } })
      })

  }

  return (
    <>
     <Header/>
    <Routes>
      <Route path='/' element={<Home startChange={startChange} />} />
      <Route path='/quiz' element={<Quiz />} />
      {/* <Route path='/quiz' element={<QuizTests quiz={quiz} setQuiz={setQuiz} score={score} setScore={setScore} />} />
      <Route path="/result" element={<Result score={score} />} /> */}
    </Routes></>
  );
}

export default App;
