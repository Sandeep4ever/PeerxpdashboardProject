import Dashboard from "./Components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Postpage from "./Components/Post_page";
import Linkpage from "./Components/Link_page";
import SideNav from "./utils/SideNav";
function App() {
  return (
    <>
      <Router>
        <div className="wrapContainer">
          <SideNav />
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/Post_page" element={<Postpage />} />
            <Route exact path="/Link_page" element={<Linkpage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
