import React, { useState } from "react";

// Styles
import 'bulma/css/bulma.css';
import './App.css';

// Components
import Navbar from "./Navbar/Navbar.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Navbar/>
      </header>
      <main>
        <section className="section">
          <h1 className="title">
            Tasks
          </h1>
          <p className="subtitle">
            Below is your task list
          </p>
          <div className="columns">
            <div className="column">
              Show by
            </div>
            <div className="column">
              Task List
            </div>
            <div className="column">
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
