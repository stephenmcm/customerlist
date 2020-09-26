import React from "react";
import "./App.scss";
import CustomerForm from "./features/customers/CustomerForm";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Customer List</h1>
      </header>
      <div>
        <CustomerForm />
      </div>
      <footer>
        Made with{" "}
        <span role="img" aria-label="Blood">
          🩸
        </span>
        <span role="img" aria-label="Grinning face with sweat">
          😅
        </span>
        <span role="img" aria-label="Crying face">
          😢
        </span>{" "}
        by Stephen McMahon{" "}
        <a href="mailto:stephentmcm@gmail.com">stephentmcm@gmail.com</a>{" "}
        <a href="https://github.com/stephenmcm">@stephenmcm</a>
      </footer>
    </div>
  );
}

export default App;
