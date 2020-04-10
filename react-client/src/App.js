import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
import "./bootstrap.min.css";

import Home from "./components/Home";
import Demo from "./components/Demo";
import Summarize from "./components/Summarize";

function App(props) {
  return (
    <Router>
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Navbar.Toggle aria-controls="navbarColor01" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/Demo">Demo</Nav.Link>
            <Nav.Link href="/Summarize">Summarize</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>
        <Route render={() => <Home />} path="/home" />
        <Route render={() => <Demo />} path="/Demo" />
        <Route render={() => <Summarize />} path="/Summarize" />
      </div>
    </Router>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;
