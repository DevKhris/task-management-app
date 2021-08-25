import React, { Component, useState } from "react";
import axios from 'axios';

// Styles
import 'bulma/css/bulma.css';
import './App.css';

// Components
import Navbar from "./Navbar/Navbar.jsx";
import TaskList from './TaskList/TaskList.jsx';

const API = `http://localhost:8000/tasks`;

class App extends Component  {

  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };

  }

  componentDidMount()
  {
    this.fetchIncompletedTasks();
  }

  async fetchAllTasks()
  {
    try {
      let response = await axios.get(API);
      this.setState({ tasks: response.data })
    } catch (error) {
      console.error(error);
    }
  }

  async fetchIncompletedTasks()
  {
    try {
      let response = await axios.get(`${API}/incompleted`);
      this.setState({ tasks: response.data })
    } catch (error) {
      console.error(error);
    }
  }

  async fetchCompletedTasks()
  {
    try {
        let response = await axios.get(`${API}/completed`);
        this.setState({ tasks: response.data })
    } catch (error) {
      console.error(error);
    }
  }

  render()
  {
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
                <div className="card">
                  <div className="card-title">
                      Actions
                  </div>
                  <a href="#" className="has-text-right button is-info is-rounded mx-1">
                      Create Task +
                  </a>
                  <a href="#" className="has-text-right button is-primary is-rounded mx-1">
                      Refresh
                  </a>
                </div>
              </div>
              <div className="box">
                Filter by
                  <ul>
                    <li>
                      <a className="has-text-secondary"  onClick={() => this.fetchAllTasks()}>
                        All Tasks
                      </a>
                    </li>
                    <li>
                      <a className="has-text-secondary"  onClick={() => this.fetchCompletedTasks()}>
                        Complete Tasks
                      </a>
                    </li>
                    <li>
                      <a className="has-text-secondary" onClick={() => this.fetchIncompletedTasks()}>
                        Incomplete Tasks
                      </a>
                    </li>
                  </ul>
              </div>
            </div>
            <div className="column is-fifth-quarters">
              <div className="box">
                <TaskList tasks={this.state.tasks}/>
              </div>
            </div>
            <div className="column is-one-quarter">

              <div className="box">
                 Search
                <form className="inline" action="">
                  <input className="input border-secondary is-rounded" type="text" placeholder="Search Task by Name"/>
                  <input className="button is-secondary border-secondary is-rounded is-fullwidth" type="submit" value="Search"/>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
  }
}

export default App;
