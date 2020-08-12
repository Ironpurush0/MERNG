import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { Container } from "semantic-ui-react";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthProvider } from "./context/auth";

import AuthRoute from "./utils/AuthRoute";

import MenuBar from "./components/MenuBar";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MenuBar />
        <Container>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
