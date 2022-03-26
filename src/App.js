import './App.css';
import { Outlet, Link, useParams } from "react-router-dom"


function App() {
  let params = useParams();
  console.log(params)

  return (
    <div className="App">
     <h2>Project starts here....</h2>
     
    </div>
  );
}

export default App;
