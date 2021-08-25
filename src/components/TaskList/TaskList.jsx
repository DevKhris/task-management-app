import React, { Component } from "react";

import TaskItem from '../TaskItem/TaskItem.jsx';

class TaskList extends Component {

	render()
	{
		const tasks = this.props.tasks;
		return(
			<div>
				<div>
			    	<p className="has-text-left">Task List ({tasks.length}) </p>
			    	<div className="box">
			    	 	{tasks.map((task, index) => (
			    	 		<TaskItem task={task} onRefresh={this.props.onRefresh} />
                  		))}
			    	</div>
			    </div>
			</div>
		);
	}
}

export default TaskList;