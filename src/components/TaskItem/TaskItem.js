import React, { Component, useEffect } from "react"

import TaskModal from '../TaskModal/TaskModal'
import EditTaskModal from '../EditTaskModal/EditTaskModal'
import useUpdate from "../../hooks/useUpdate"
import useDelete from "../../hooks/useDelete"

function TaskItem({ task, endpoint }) {

	useEffect(() => {
		const status = this.task.status == 1 ? true : false
		this.task.status = status
	})

	const deleteTask = (id) => {
		useDelete(`${endpoint}/task/${id}/delete`)
	}

	const updateTask = (task, status) => {
		let date = status === 1 ? new Date().toJSON().replaceAll("T", " ").replace("Z", "") : null
		let data = {
			id: task.id,
			status: status,
			completed_at: date
		}

		useUpdate(`${endpoint}/task/${task.id}/update`, data)
	}


	const showModal = (task, mode = '#m') => {
		let elm = document.querySelector(mode + task.id)
		let html = document.querySelector('html')
		elm.classList.add('is-active')
		html.classList.add('is-clipped')
	}

	const changeTaskStatus = () => {
		if (task.status === true) {
			return 0
		} else {
			return 1
		}
	}

	const isCompleted = () => {
		if (task.status === true) {
			return true
		} else {
			return false
		}
	}

	const getCompletedDate = () => {
		if (this.isCompleted()) {
			return (
				<p>
					Completion date: {task.completed_at}
				</p>
			)
		}
	}

	return (
		<div className="my-4">
			<EditTaskModal task={task} />
			<TaskModal task={task} />
			<article className="media">
				<figure className="media-left">
					<input
						className="is-check"
						type="checkbox"
						id={"task-status-" + task.id}
						onChange={() => updateTask(task, changeTaskStatus())}
						checked={isCompleted()}
					/>
				</figure>
				<div className="media-content">
					<div className="content">
						<a className="has-text-secondary" onClick={() => showModal(task)}>
							{task.name}
						</a>
						{getCompletedDate()}
						<p>
							Status:
							{
								task.status ?
									<span className='has-text-success'> Completed</span>
									:
									<span className='has-text-dark'> In Progress</span>
							}
						</p>
					</div>
				</div>
				<div className="media-right">
					<div className="level is-inline ">
						<input
							name="edit"
							className="button is-fullwidth is-small is-primary is-rounded mx-1"
							type="submit"
							onClick={() => showModal(task, '#e-')}
							value="Edit"
						/>
						<input
							name="delete"
							className="button is-fullwidth is-small is-danger is-rounded mx-1"
							type="submit"
							onClick={() => deleteTask(task.id)}
							value="Delete"
						/>
					</div>
				</div>
			</article>
		</div>
	)
}
export default TaskItem