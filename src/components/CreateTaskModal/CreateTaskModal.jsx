import React, { Component } from "react";
import axios from 'axios';

const API = `http://localhost:8000/v1/tasks`;

class CreateTaskModal extends Component {

	closeModal(id)
	{
		let elm = document.querySelector("#create-modal");
		let html = document.querySelector('html');
		elm.classList.remove('is-active');
		html.classList.remove('is-clipped');
	}

	getFormData()
	{
		let name = document.querySelector("#task-name");
		let body = document.querySelector("#task-body");
		let status = document.querySelector("#task-status");
		let date = document.querySelector("#task-date");
		let time = document.querySelector("#task-time");
		let datetime = date.value + " " + time.value;


		let data = {
			name: name.value,
			body: body.value,
			status: status.checked == true ? 1 : 0,
			completed_at: status.checked == true ? datetime : null
		};

		return data;
	}

	async createTask() {
		try	{
			let data = this.getFormData();
			let response = await axios.post(
				`${API}/create`,
				data
			);
			await this.props.onRefresh();
			this.closeModal();
		} catch(error) {
			console.error(error);
		}
	}

	render(props)
	{
		return(
			<div class="modal" id="create-modal">
  				<div class="modal-background" onClick={() => this.closeModal()}></div>
  				<div class="modal-card">
    				<header class="modal-card-head">
      					<p class="modal-card-title">
      						Create Task 
      					</p>
      					<button class="delete" 
      						aria-label="close" 
      						onClick={() => this.closeModal()}
      					>	
      					</button>
    				</header>
    				<section class="modal-card-body">
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
      					<br/>
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
      					<br/>
      					<label htmlFor="completed_at">
    						Task Date
    					</label>	
      					<div className="columns">
    						<div class="column">
    							<input 
      								className="input" 
      								type="date" 
      								name="completed_at" 
      								id="task-date" 
      								defaultValue=""
      							/>	
    						</div>
    						<div class="column"> 						      					
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
      						<br/>
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
    				<div class="modal-card-foot">
    					<input className="button is-info is-rounded" type="button" value="Update" onClick={() => this.createTask()}/>
    				</div>
  				</div>
			</div>
		);
	}
}

export default CreateTaskModal;