import React from "react"

function TaskModal({ task }) {

	const closeModal = (id) => {
		let elm = document.querySelector("#m" + id)
		let html = document.querySelector('html')
		elm.classList.remove('is-active')
		html.classList.remove('is-clipped')
	}

	return (
		<div className="modal" id={"m" + this.props.task.id}>
			<div className="modal-background" onClick={() => closeModal(task.id)}></div>
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">
						{this.props.task.name}
					</p>
					<button className="delete"
						aria-label="close"
						onClick={() => closeModal(task.id)}
					>
					</button>
				</header>
				<section className="modal-card-body">
					<p>
						{this.props.task.body}
					</p>
					<br />
					<span>
						Completed at: {task.completed_at}
					</span>

					<br />
					<span>
						Status:
						{
							task.status ?
								<span className='has-text-success'> Completed</span>
								:
								<span className='has-text-dark'> In Progress</span>
						}
					</span>
				</section>
			</div>
		</div>
	)
}

export default TaskModal