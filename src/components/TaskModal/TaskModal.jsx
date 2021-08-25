import React, { Component } from "react";

class TaskModal extends Component {

	closeModal(id)
	{
		let elm = document.querySelector("#m" + id);
		let html = document.querySelector('html');
		elm.classList.remove('is-active');
		html.classList.remove('is-clipped');
	}

	render(props)
	{
		return(
			<div class="modal" id={"m" + this.props.task.id}>
  			<div class="modal-background" onClick={() => this.closeModal(this.props.task.id)}></div>
  			<div class="modal-card">
    		<header class="modal-card-head">
      			<p class="modal-card-title">
      				{this.props.task.name}
      			</p>
      			<button class="delete" 
      				aria-label="close" 
      				onClick={() => this.closeModal(this.props.task.id)}
      			>	
      			</button>
    		</header>
    		<section class="modal-card-body">
      			<p>
      				{this.props.task.body}
      			</p>
      			<br/>
      			<span>
      				{this.props.task.completed_at}
      			</span>

      			<br/>
      			<span>
      				Status:
				   	{
				   		this.props.task.status ? 
				   		<span className='has-text-success'> Completed</span> 
				   		:
				   		<span className='has-text-dark'> In Progress</span>
				   	}
      			</span>
    		</section>
  			</div>
		</div>
		);
	}
}

export default TaskModal;