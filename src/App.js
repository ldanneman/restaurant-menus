import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MainPage from "./Pages/MainPage";
import Details from "./Pages/Details";
import Admin from "./Pages/Admin";
import Error404 from "./Pages/Error404";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route path="/home" component={MainPage} />
          <Route path="/details/:_id" component={Details} />
          <Route path="/admin" component={Admin} />
          <Route component={Error404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
