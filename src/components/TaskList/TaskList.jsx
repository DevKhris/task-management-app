import React, { Component } from "react";

class TaskList extends Component {

	render()
	{
		const tasks = this.props.tasks
		return(
			<div>
				<div>
			    	<p className="has-text-left">Task List ({tasks.length}) </p>
			    	<div className="box">
			    	 	{tasks.map((task, index) => (
			    	 		<div>
			    	 			{task.name}
			    	 			<time>
			    	 				{task.completed_at}
			    	 			</time>
			    	 			<form action="">
			    	 			</form>
			    	 			<form action="">
			    	 			<input className="button is-danger" type="submit" value="Delete"/>
			    	 			</form>
			    	 		</div>
                  		))}
			    	</div>
			    </div>
			</div>
		);
	}
}

export default TaskList;