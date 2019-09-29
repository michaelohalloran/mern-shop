import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";

class ItemModal extends Component {
	state = {
		modal: false,
		name: ""
	};

	toggle = () => {
		console.log("Hit toggle");
		this.setState({ modal: !this.state.modal });
	};

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addItem(this.state.name);
		this.setState({
			name: ""
		});
		this.toggle();
	};

	render() {
		return (
			<div>
				<Button color="dark" style={{ marginBottom: "2rem" }} onClick={this.toggle}>
					Add item
				</Button>
				<Modal isOpen={this.state.modal}>
					<ModalHeader>Add item to list</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.handleSubmit}>
							<FormGroup>
								<Label for="name" />
								<Input
									type="text"
									id="name"
									name="name"
									placeholder="Add item"
									value={this.state.name}
									onChange={this.handleChange}
								/>
							</FormGroup>
							<Button color="dark">Add item</Button>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	item: state.item
});

export default connect(mapStateToProps, { addItem })(ItemModal);
