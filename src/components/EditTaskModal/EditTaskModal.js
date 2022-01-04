import React from "react"

function EditTaskModal({ task, endpoint }) {

	const closeModal = (id) => {
		let elm = document.querySelector("#e-" + id)
		let html = document.querySelector('html')
		elm.classList.remove('is-active')
		html.classList.remove('is-clipped')
	}

	const getFormData = () => {
		let name = document.querySelector("#current-name")
		let body = document.querySelector("#current-body")
		let status = document.querySelector("#current-status")
		let date = document.querySelector("#current-date")
		let time = document.querySelector("#current-time")
		let datetime = date.value + " " + time.value

		let data = {
			id: task.id,
			name: name.value,
			body: body.value,
			status: status.checked == true ? 1 : 0,
			completed_at: status.checked == true ? datetime : null
		}

		return data
	}


	const updateTask = () => {
		let data = getFormData()
		let response = (`${endpoint}/${data.id}/update`, data)
		closeModal(data.id)
	}

	return (
		<div className="modal" id={"e-" + task.id}>
			<div className="modal-background" onClick={() => closeModal(task.id)}></div>
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">
						Edit Task
					</p>
					<button className="delete"
						aria-label="close"
						onClick={() => closeModal(task.id)}
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
						defaultValue={task.name}
						id="current-name"
					/>
					<br />
					<br />
					<label htmlFor="body">
						Task Description
					</label>
					<textarea
						className="input textarea"
						name="body"
						id="current-body"
						cols="20"
						rows="10"
						defaultValue={task.body}
					></textarea>

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
								id="current-date"
								defaultValue={task.completed_at}
							/>
						</div>
						<div className="column">
							<input
								className="input"
								type="time"
								name="completed_at"
								id="current-time"
								defaultValue={task.completed_at}
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
							id="current-status"
							defaultChecked={task.status}
						/>
					</span>
				</section>
				<div className="modal-card-foot">
					<input className="button is-info is-rounded" type="button" value="Update" onClick={() => updateTask()} />
				</div>
			</div>
		</div>
	)
}
export default EditTaskModal