import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Intro from "./components/Intro";
import Roles from "./components/Roles";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/intro/" />} />
        <Route path="/signup/" element={<Signup />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/intro/" element={<Intro />} />
        <Route path="/roles/" element={<Roles />} />
        <Route path="/dashboard/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
