import React from "react"
import TaskItem from '../TaskItem/TaskItem'

function TaskList({ tasks, endpoint }) {
	return (
		<div>
			<div>
				<p className="has-text-left">Task List ({tasks}) </p>
				{
					tasks ? (
						<div className="box">
							{
								tasks.map((task, index) => (
									<TaskItem task={task} key={index} endpoint={endpoint} />
								))
							}
						</div>
					) : (<p>Cargando resultados...</p>)
				}
			</div>
		</div>
	)
}
export default TaskList