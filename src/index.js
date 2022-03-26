import { render } from 'react-dom';
import GameContainer from "./components/GameContainer";
import Leaderboard from './components/Leaderboard';

import App from './App';
import { 
    BrowserRouter,
    Routes,
    Route,
    } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';

render( 
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/GameContainer" element={<GameContainer />} />
      <Route path="/Leaderboard" element={<Leaderboard />} />
      
    </Routes>
  </BrowserRouter>,
 document.getElementById('root'));