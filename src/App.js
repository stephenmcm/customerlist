import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Customer List</h1>
      </header>
      <footer>
        Made by Stephen McMahon{" "}
        <a href="mailto:stephentmcm@gmail.com">stephentmcm@gmail.com</a>{" "}
        <a href="https://github.com/stephenmcm">@stephenmcm</a>
      </footer>
    </div>
  );
}

export default App;
