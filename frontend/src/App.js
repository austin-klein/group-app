// basic imports
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// component imports
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Profile from "./components/profile/Profile";
import Dashboard from "./components/dasboard/Dashboard";
import personalDashboard from "./components/personalDashboard/PersonalDashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/:id" component={personalDashboard} />
      </Switch>
    </Router>
  );
}

export default App;
