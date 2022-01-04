import React, { Fragment, useEffect } from "react"
import useFetch from './../hooks/useFetch'
import useQuery from "./../hooks/useQuery"

// Styles
import 'bulma/css/bulma.css'

// Components
import Navbar from "./Navbar/Navbar"
import TaskList from './TaskList/TaskList'
import CreateTaskModal from './CreateTaskModal/CreateTaskModal'


function App() {

  const endpoint = `http://localhost:3001/v1/tasks`

  const [tasks, error] = useFetch(endpoint)

  let mode = ''

  useEffect(() => {
    fetchAllTasks()
  })

  const refreshTask = () => {
    try {
      if (mode = "search") {
        searchTask()
      } else {
        useFetch(`${endpoint}/${mode}`)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const showModal = () => {
    let elm = document.querySelector("#create-modal")
    let html = document.querySelector('html')
    elm.classList.add('is-active')
    html.classList.add('is-clipped')
  }

  const fetchAllTasks = () => {
    return tasks = useFetch(`${endpoint}`)
  }
  const fetchIncompletedTasks = () => {
    return tasks = useFetch(`${endpoint}/incompleted`)
  }

  const fetchCompletedTasks = () => {
    return tasks = useFetch(`${endpoint}/completed`)
  }

  const searchTask = () => {
    try {
      let elm = document.querySelector("#task-search")
      let query = {
        search: elm.value
      }

      tasks = useQuery(`${endpoint}/search`, query)

    } catch (searchError) {
      console.error(this.searchError)
    }
  }

  if (error) {
    return (
      <p>Ha ocurrido un error</p>
    )
  }
  return (
    <Fragment>
      <div className="App">
        <header className="App-header">
          <Navbar />
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
                  <p>
                    Actions
                  </p>
                  <br />
                  <div className="">
                    <a href="#" className="button is-fullwidth is-small is-info is-rounded mx-1" onClick={() => showModal()}>
                      Create Task +
                    </a>
                    <br />
                    <a href="#" className="button is-fullwidth is-small is-primary is-rounded mx-1" onClick={() => refreshTask()}>
                      Refresh
                    </a>
                  </div>
                </div>
                <div className="box">
                  Filter by
                  <ul>
                    <li>
                      <a className="has-text-link" onClick={() => fetchAllTasks()}>
                        All Tasks
                      </a>
                    </li>
                    <li>
                      <a className="has-text-link" onClick={() => fetchCompletedTasks()}>
                        Complete Tasks
                      </a>
                    </li>
                    <li>
                      <a className="has-text-link" onClick={() => fetchIncompletedTasks()}>
                        Incomplete Tasks
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="column is-fifth-quarters">
                <div className="box">
                  <CreateTaskModal endpoint={`${endpoint}/create`} />
                  <TaskList tasks={tasks} endpoint={endpoint} />
                </div>
              </div>
              <div className="column is-one-quarter">
                <div className="box">
                  Search
                  <div className="inline">
                    <input
                      className="input border-secondary is-rounded"
                      type="text"
                      placeholder="Search Task by Name"
                      defaultValue=""
                      id="task-search"
                      onChange={() => searchTask()}
                    />
                    <br />
                    <input
                      className="button is-small is-secondary border-primary is-rounded is-fullwidth"
                      type="submit"
                      value="Search"
                      onClick={() => searchTask()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </Fragment>
  )
};
export default App
