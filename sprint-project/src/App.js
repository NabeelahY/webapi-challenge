import React from "react";
import "./App.css";
import Projects from "./components/Projects";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProjectDetail from "./components/ProjectDetail";

function App() {
  return (
    <Router>
      <Link to="/">Home</Link>
      <div className="App">
        <Route path="/" exact component={Projects} />
      </div>
      <Route
        path="/project/:id"
        render={props => <ProjectDetail {...props} />}
      />
    </Router>
  );
}

export default App;
