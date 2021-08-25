import React, { Component } from "react";

import './TaskItem.css';

class TaskItem extends Component {

	async deleteTask(id) {
		try {
			alert(id);
		} catch(error) {
			console.error(error);
		}
	}

	render(props)
	{
		return(
			<div className="my-2">
				<article className="media">
					<figure className="media-left">
						<input 
							className="is-check" 
							checked={this.props.task.status ? true : false} 
							type="checkbox"

						/>
					</figure>
				   	<div className="media-content">
				   		<div className="content">
				   			<a className="has-text-secondary">
				   				{this.props.task.name}
				   			</a>
				   			<br/>
				   			<time>
				   				Completion date: {this.props.task.completed_at}
				   			</time>
				   			<br/>
				   			<span>
				   				Status: {this.props.task.status ? "Completed" : "In Progress"}
				   			</span>
				   		</div>
				   	</div>
			    	<div className="media-right">
			    	 		<input
			    	 			className="button is-danger is-rounded" 
			    	 			type="submit" 
			    	 			value="Delete"
			    	 			onClick={() => this.deleteTask(this.props.task.id)}
			    	 		/>	    	
			    	</div>
			    </article>
			</div>
		);
	}
}

export default TaskItem;