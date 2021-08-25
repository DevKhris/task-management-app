import React, { Component } from "react";
import axios from 'axios';

import './TaskItem.css';

import TaskModal from '../TaskModal/TaskModal.jsx';

const API = `http://localhost:8000/tasks`;

class TaskItem extends Component {

	async deleteTask(id) {
		try {
			let response = await axios.delete(`${API}/${id}/delete`);
			await this.props.onRefresh();
		} catch(error) {
			console.error(error);
		}
	}

	isCompleted(status)
	{
		const completed = status;
		if(completed) {
			return (
				<p>
					Completion date: {this.props.task.completed_at}
				</p>
			);
		}
	}

	showModal(task)
	{
		let elm = document.querySelector('#m' + task.id);
		let html = document.querySelector('html');
		elm.classList.add('is-active');
		html.classList.add('is-clipped');
	}

	render(props)
	{	
		const completedDate = this.isCompleted(this.props.task.status);
		return(
			<div className="my-3 border-secondary">
				<TaskModal task={this.props.task}/>
				<article className="media">
					<figure className="media-left">
						<input 
							className="is-check" 
							checked={this.props.task.status ? true : false} 
							type="checkbox"
							id="task-status"
						/>
					</figure>
				   	<div className="media-content">
				   		<div className="content">
				   			<a className="has-text-secondary" onClick={() => this.showModal(this.props.task)}>
				   				{this.props.task.name}
				   			</a>
				   			{completedDate}
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
			    			<label htmlFor="delete">

			    			</label>
			    	 		<input
			    	 			name="delete"
			    	 			className="delete" 
			    	 			type="submit" 
			    	 			onClick={() => this.deleteTask(this.props.task.id)}
			    	 		/>	    	
			    	</div>
			    </article>
			</div>
		);
	}
}

export default TaskItem;