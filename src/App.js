
import Navbar from './component/Navbar';
import FilmHome from './component/FilmHome';
import { Route, Routes } from 'react-router-dom';
import Detail from './component/Detail';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<FilmHome />}></Route>
        <Route path='/detail/:id' element={<Detail />}></Route>
        <Route path='/aboutUs/' element={<aboutU />}></Route>
      </Routes>
    </div>
  );
}

export default App;
