import React, { useState, useEffect } from "react";
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
import Nav from "./Components/Global-Components/Nav";
import RestaurantContext from "./lib/Context/context";
import axios from "axios";
import BACK_PORT from "./lib/Context/BackPort";

function App() {
  const [data, setData] = useState(null);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    axios
      .get(`${BACK_PORT}/restaurantData`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        alert(error?.response?.data || "theError");
      });
  }, []);
  return data ? (
    <div className="App">
      {console.log("THE DATA", data)}
      <RestaurantContext.Provider value={{ data, setData, admin, setAdmin }}>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/home" component={MainPage} />
            <Route path="/details/:_id" component={Details} />
            <Route path="/admin" component={Admin} />
            <Route component={Error404} />
          </Switch>
        </Router>
      </RestaurantContext.Provider>
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default App;
