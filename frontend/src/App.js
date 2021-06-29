// basic imports
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// component imports
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Profile from "./components/profile/Profile";
import AddProfile from "./components/profile/AddProfile";
import Dashboard from "./components/dashboard/Dashboard";
import PersonalDashboard from "./components/dashboard/PersonalDashboard";
import AddTask from "./components/AddTask";

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/add-profile" component={AddProfile} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/:id" component={PersonalDashboard} />
        <Route exact path="/add-task" component={AddTask} />
      </Switch>
    </Router>

  );
}

export default App;
