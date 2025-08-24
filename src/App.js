import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './navbar.jsx';
import MovieList from './movielist.jsx';

function App() {
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<MovieList category="popular"/>} />
        <Route path="/popular" element={<MovieList category="popular" />} />
        <Route path="/nowplaying" element={<MovieList category="now_playing" />} />
        <Route path="/toprated" element={<MovieList category="top_rated" />} />
        <Route path="/upcoming" element={<MovieList category="upcoming" />} />
      </Routes>
    </Router>
  );  

}

export default App;
