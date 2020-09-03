import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./pages/Register";
import "./sass/main.scss";
import Login from "./pages/Login";
import HomeMain from "./pages/Home/HomeMain";

class App extends Component {
  render() {
    return (
      <div className="App">
        <>
          <Router>
            <Switch>
              <Route exact path="/" component={HomeMain} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Router>
        </>
      </div>
    );
  }
}

export default App;
