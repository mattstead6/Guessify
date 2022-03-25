import './App.css';
import { Outlet, Link, useParams } from "react-router-dom"


function App() {
  let params = useParams();
  console.log(params)

  return (
    <div className="App">
     <h2>Project starts here....</h2>
     <nav style={{
       borderBottom: "solid 1px",
       paddingBottom: "1 rem",
     }}>
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
     </nav>
     <Outlet />
    </div>
  );
}

export default App;
