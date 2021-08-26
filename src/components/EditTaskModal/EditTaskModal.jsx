import React, { Component } from "react";
import axios from 'axios';

const API = `http://localhost:8000/v1/tasks`;

class EditTaskModal extends Component {

	closeModal(id)
	{
		let elm = document.querySelector("#e-" + id);
		let html = document.querySelector('html');
		elm.classList.remove('is-active');
		html.classList.remove('is-clipped');
	}

	getFormData()
	{
		let name = document.querySelector("#current-name");
		let body = document.querySelector("#current-body");
		let status = document.querySelector("#current-status");
		let date = document.querySelector("#current-date");
		let time = document.querySelector("#current-time");
		let datetime = date.value + " " + time.value;

		let data = {
			id: this.props.task.id,
			name: name.value,
			body: body.value,
			status: status.checked == true ? 1 : 0,
			completed_at: status.checked == true ? datetime : null
		};

		return data;
	}

	async updateTask() {
		try	{
			let data = this.getFormData();
			let response = await axios.put(
				`${API}/${data.id}/update`,
				data
			);
			await this.props.onRefresh();
			this.closeModal(data.id);
		} catch(error) {
			console.error(error);
		}
	}

	render(props)
	{
		return(
			<div className="modal" id={"e-" + this.props.task.id}>
  				<div className="modal-background" onClick={() => this.closeModal(this.props.task.id)}></div>
  				<div className="modal-card">
    				<header className="modal-card-head">
      					<p className="modal-card-title">
      						Edit Task 
      					</p>
      					<button className="delete" 
      						aria-label="close" 
      						onClick={() => this.closeModal(this.props.task.id)}
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
      						defaultValue={this.props.task.name}
      						id="current-name"
      					/>
       					<br/>   					
      					<br/>
    					<label htmlFor="body">
    						Task Description
    					</label>
      					<textarea
      						className="input textarea" 
      						name="body" 
      						id="current-body" 
      						cols="20" 
      						rows="10"
      						defaultValue={this.props.task.body}
      					>
      						
      					</textarea>

      					<br/>

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
      								defaultValue={this.props.task.completed_at}
      							/>	
    						</div>
    						<div className="column"> 						      					
      							<input 
      								className="input" 
      								type="time" 
      								name="completed_at" 
      								id="current-time" 
      								defaultValue={this.props.task.completed_at}
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
								id="current-status"
								defaultChecked={this.props.task.status}
							/>	 
      					</span>
    				</section>
    				<div className="modal-card-foot">
    					<input className="button is-info is-rounded" type="button" value="Update" onClick={() => this.updateTask()}/>
    				</div>
  				</div>
			</div>
		);
	}
}

export default EditTaskModal;