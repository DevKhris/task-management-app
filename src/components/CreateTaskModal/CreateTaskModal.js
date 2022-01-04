import React, { Component } from "react"

import useCreate from './../../hooks/useCreate'

function CreateTaskModal({ endpoint }) {

	const closeModal = () => {
		let elm = document.querySelector("#create-modal")
		let html = document.querySelector('html')
		elm.classList.remove('is-active')
		html.classList.remove('is-clipped')
	}

	const getFormData = () => {
		let name = document.querySelector("#task-name")
		let body = document.querySelector("#task-body")
		let status = document.querySelector("#task-status")
		let date = document.querySelector("#task-date")
		let time = document.querySelector("#task-time")
		let datetime = date.value + " " + time.value


		let data = {
			name: name.value,
			body: body.value,
			status: status.checked == true ? 1 : 0,
			completed_at: status.checked == true ? datetime : null
		}

		return data
	}

	const createTask = () => {
		let data = getFormData()
		useCreate(endpoint, data)
		closeModal()
	}

	return (
		<div className="modal" id="create-modal">
			<div className="modal-background" onClick={() => closeModal()}></div>
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">
						Create Task
					</p>
					<button className="delete"
						aria-label="close"
						onClick={() => closeModal()}
					>
					</button>
				</header>
				<section className="modal-card-body">
					<label htmlFor="name">
						Task Name
					</label>
					<input
						className="input"
						type="name"
						name="completed_at"
						id="task-name"
						defaultValue=""
					/>
					<br />
					<label htmlFor="body">
						Task Description
					</label>
					<textarea
						className="input textarea"
						name="body"
						id="task-body"
						cols="20"
						rows="10"
					>
					</textarea>
					<br />
					<label htmlFor="completed_at">
						Task Date
					</label>
					<div className="columns">
						<div className="column">
							<input
								className="input"
								type="date"
								name="completed_at"
								id="task-date"
								defaultValue=""
							/>
						</div>
						<div className="column">
							<input
								className="input"
								type="time"
								name="completed_at"
								id="task-time"
								defaultValue=""
							/>
						</div>
					</div>
					<span>
						<br />
						<p>
							Task Status
						</p>
						<label htmlFor="status">
							Completed:
						</label>
						<input
							className="checkbox is-check"
							type="checkbox"
							name="status"
							id="task-status"
							defaultChecked="false"
						/>
					</span>
				</section>
				<div className="modal-card-foot">
					<input className="button is-info is-rounded" type="button" value="Update" onClick={() => createTask()} />
				</div>
			</div>
		</div>
	)
}
export default CreateTaskModal