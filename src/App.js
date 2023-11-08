
import Navbar from './component/Navbar';
import FilmHome from './component/FilmHome';
import { Route, Routes } from 'react-router-dom';
import Detail from './component/Detail';
import Login from './component/Login';
import Dashboard from './component/dashboard';
import AddFilm from './component/AddFilm';
import UpdateFilm from './component/UpdateFilm';
import { UserProvider } from './component/Authen';
import ProtectedDashboard from './component/ProtectedDashboard ';




function App() {
  return (
    <div className="App">
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<FilmHome />}></Route>
          <Route path='/detail/:id' element={<Detail />}></Route>
          <Route path='/login/' element={<Login />}></Route>
          <Route path='/dashboard/' element={<ProtectedDashboard />}></Route>
          <Route path='/addNewFilm/' element={<AddFilm />}></Route>
          <Route path='/updateFilm/:id' element={<UpdateFilm />}></Route>
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
