import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Smiles from "./algorithms/smiles";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/our-github">Github Repo</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/smiles" element={<Smiles />} />
          <Route
            path="/our-github"
            component={() => {
              window.location.href =
                "https://github.com/rogerwq/algorithm-demo";
              return null;
            }}
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Algorithms</h2>
      <li>
        <Link to="/smiles">Build Smiles</Link>
      </li>
    </div>
  );
}
