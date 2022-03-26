import { render } from 'react-dom';

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
    </Routes>
  </BrowserRouter>,
 document.getElementById('root'));