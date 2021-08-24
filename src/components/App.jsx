import React, { useState } from "react";

// Styles
import 'bulma/css/bulma.css';
import './App.css';

// Components
import Navbar from "./Navbar/Navbar.jsx";
import TaskList from './TaskList/TaskList.jsx';

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
            <div className="column is-one-quarter">
              <div className="box">
              Show by
              </div>
            </div>
            <div className="column is-three-fifths">
              <div className="box">
                <TaskList/>
              </div>
            </div>
            <div className="column is-one-quarter">
              <div className="box">
                 Search
                <form action="">
                  <input type="text" placeholder="Search Task by Name"/>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
