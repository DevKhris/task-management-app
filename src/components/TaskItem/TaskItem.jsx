import React, { Component } from "react";
import axios from 'axios';

import './TaskItem.css';

import TaskModal from '../TaskModal/TaskModal.jsx';
import EditTaskModal from '../EditTaskModal/EditTaskModal.jsx';

const API = `http://localhost:8000/tasks`;

class TaskItem extends Component {

	componentDidMount()
	{
		const status = this.props.task.status == 1 ? true : false;
		this.props.task.status = status;
	}

	async deleteTask(id) {
		try {
			let response = await axios.delete(`${API}/${id}/delete`);
			await this.props.onRefresh();
		} catch(error) {
			console.error(error);
		}
	}

	async updateTask(task, status) {
		try	{
			let date = status === 1 ? new Date().toJSON().replaceAll("T"," ").replace("Z","") : null;
			let data = { 
					id: task.id,
					status: status, 
					completed_at: date 
			}
			let response = await axios.put(
				`${API}/${task.id}/update`,
				data
			);
			await this.props.onRefresh();	
		} catch(error) {
			console.error(error);
		}
	}

	changeTaskStatus() 
	{
		if(this.props.task.status == true) {
			return 0;
		}  else {
			return 1;
		}	
	}

	isCompleted()
	{
		if(this.props.task.status == true) {
			return true;
		}  else {
			return false;
		}
	}

	getCompletedDate()
	{
		if(this.isCompleted()) {
			return (
				<p>
					Completion date: {this.props.task.completed_at}
				</p>
			);
		}
	}

	showModal(task, mode = '#m')
	{
		let elm = document.querySelector(mode + task.id);
		let html = document.querySelector('html');
		elm.classList.add('is-active');
		html.classList.add('is-clipped');
	}

	render(props)
	{	
		return(
			<div className="my-3 border-secondary">
				<EditTaskModal task={this.props.task} onRefresh={this.props.onRefresh}/>
				<TaskModal task={this.props.task}/>
				<article className="media">
					<figure className="media-left">
						<input 
							className="is-check" 
							type="checkbox"
							id={"task-status-" + this.props.task.id }
							onChange={() => this.updateTask(this.props.task, this.changeTaskStatus())}
							defaultChecked={this.props.task.status}
							checked={this.isCompleted()}
						/>
					</figure>
				   	<div className="media-content">
				   		<div className="content">
				   			<a className="has-text-secondary" onClick={() => this.showModal(this.props.task)}>
				   				{this.props.task.name}
				   			</a>
				   			{this.getCompletedDate()}
				   			<p>
				   				Status:
				   				{
				   					this.props.task.status ? 
				   					<span className='has-text-success'> Completed</span> 
				   					:
				   					<span className='has-text-dark'> In Progress</span>
				   				}
				   			</p>
				   		</div>
				   	</div>
			    	<div className="media-right">
			    		<div className="level">
			    			<input
			    	 			name="edit"
			    	 			className="button is-small is-primary is-rounded mx-1" 
			    	 			type="submit" 
			    	 			onClick={() => this.showModal(this.props.task, '#e')}
			    	 			value="Edit"
			    	 		/>	    	
			    	 		<input
			    	 			name="delete"
			    	 			className="button is-small is-danger is-rounded mx-1" 
			    	 			type="submit" 
			    	 			onClick={() => this.deleteTask(this.props.task.id)}
			    	 			value="Delete"
			    	 		/>	
			    		</div>	
			    	</div>
			    </article>
			</div>
		);
	}
}

export default TaskItem;