import React, { Component } from "react";
import axios from 'axios';

const API = `http://localhost:8080/tasks`;

class TaskList extends Component {

	constructor(props) {
		super(props);

		this.state = {
			tasks: [],
			error: null,
			completed: null,
		};
	}

	componentDidMount()
	{
		this.fetchTasks();
	}

	fetchTasks()
	{
		axios.get(API)
			.then((response) => {
				response.json()
				console.log(response.data)
			})
			.then((data) => this.setState({ tasks: data }))
			.catch((error) => this.setState({ error}));
	}
	render()
	{
		const { tasks } = this.state;
		return(
			<div>
			    Task List ({tasks.length})
			</div>
		);
	}
}

export default TaskList;