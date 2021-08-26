import React, { Component, useState } from "react";
import axios from 'axios';

// Styles
import 'bulma/css/bulma.css';
import './App.css';

// Components
import Navbar from "./Navbar/Navbar.jsx";
import TaskList from './TaskList/TaskList.jsx';
import CreateTaskModal from './CreateTaskModal/CreateTaskModal.jsx';

const API = `http://localhost:8000/tasks`;

class App extends Component  {

  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      mode: ""
    };
    this.refreshTask = this.refreshTask.bind(this);
  }

  componentDidMount()
  {
    this.fetchIncompletedTasks();
  }

  async fetchAllTasks()
  {
    try {
      let response = await axios.get(API);
      this.setState({ tasks: response.data });
      this.setState({ mode: ""});
    } catch (error) {
      console.error(error);
    }
  }

  async fetchIncompletedTasks()
  {
    try {  
      let response = await axios.get(`${API}/incompleted`);
      this.setState({ tasks: response.data });
      this.setState({ mode: "incompleted"})
    } catch (error) {
      console.error(error);
    }
  }

  async fetchCompletedTasks()
  {
    try {
        let response = await axios.get(`${API}/completed`);
        this.setState({ tasks: response.data });
        this.setState({ mode: "completed"});
    } catch (error) {
      console.error(error);
    }
  }

  async refreshTask()
  {
    try {  
        let mode = this.state.mode;
        let response = await axios.get(`${API}/${mode}`);
        this.setState({ tasks: response.data });
        this.setState({ mode: mode })
    } catch (error) {
      console.error(error);
    }   
  }

  showModal()
  {
    let elm = document.querySelector("#create-modal");
    let html = document.querySelector('html');
    elm.classList.add('is-active');
    html.classList.add('is-clipped');
  }

  async searchTask() {
    try {
      let search = document.querySelector("#task-search");
      let data = {
          search: search.value
      };
      let response = await axios.post(
        `${API}/search`,
        data
      );
      this.setState({ tasks: response.data });
    } catch(error) {
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
                  <div className="card-header">
                      <p className="card-title">
                        Actions
                      </p>
                  </div>
                  <br/>
                  <div className="card-body columns">
                    <div>
                      <a href="#" className="has-text-right button is-info is-rounded mx-1" onClick={() => this.showModal()}>
                        Create Task +
                      </a>
                    </div>          
                    <div>
                      <a href="#" className="has-text-right button is-primary is-rounded mx-1" onClick={() => this.refreshTask()}>
                        Refresh
                      </a>
                     </div> 
                  </div>
                </div>
              </div>
              <div className="box">
                Filter by
                  <ul>
                    <li>
                      <a className="has-text-link"  onClick={() => this.fetchAllTasks()}>
                        All Tasks
                      </a>
                    </li>
                    <li>
                      <a className="has-text-link"  onClick={() => this.fetchCompletedTasks()}>
                        Complete Tasks
                      </a>
                    </li>
                    <li>
                      <a className="has-text-link" onClick={() => this.fetchIncompletedTasks()}>
                        Incomplete Tasks
                      </a>
                    </li>
                  </ul>
              </div>
            </div>
            <div className="column is-fifth-quarters">
              <div className="box">
                <CreateTaskModal onRefresh={this.refreshTask}/>
                <TaskList tasks={this.state.tasks} onRefresh={this.refreshTask}/>
              </div>
            </div>
            <div className="column is-one-quarter">

              <div className="box">
                 Search
                <form className="inline" action="">
                  <input 
                      className="input border-secondary is-rounded" 
                      type="text" 
                      placeholder="Search Task by Name"
                      defaultValue=""
                      id="task-search"
                      onChange={() => this.searchTask()}
                    />
                  <input
                      className="button is-secondary border-secondary is-rounded is-fullwidth" 
                      type="submit" 
                      value="Search"
                  />
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
