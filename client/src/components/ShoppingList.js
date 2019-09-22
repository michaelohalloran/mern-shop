import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";
import "./ShoppingList.css";

class ShoppingList extends Component {
	state = {
		items: [
			{ id: uuid(), name: "Apples" },
			{ id: uuid(), name: "Kiwis" },
			{ id: uuid(), name: "Papayas" },
			{ id: uuid(), name: "Mangos" }
		]
	};

	addItem = (e) => {
		const name = prompt("New item: ");
		const newItem = { id: uuid(), name };
		this.setState({ items: [ ...this.state.items, newItem ] });
	};

	deleteItem = (id) => {
		console.log(id);
		const { items } = this.state;
		const updatedItems = items.filter((item) => item.id !== id);
		this.setState({ items: updatedItems });
	};

	render() {
		const itemList = this.state.items.map((item) => {
			return (
				<CSSTransition key={item.id} timeout={500} classNames="fade">
					<ListGroupItem>
						<Button
							className="remove-btn"
							color="danger"
							size="sm"
							onClick={() => this.deleteItem(item.id)}
						>
							&times;
						</Button>
						{item.name}
					</ListGroupItem>
				</CSSTransition>
			);
		});

		return (
			<Container>
				<Button color="dark" style={{ marginBottom: "2rem" }} onClick={this.addItem}>
					Add item
				</Button>
				<ListGroup>
					<TransitionGroup>{itemList}</TransitionGroup>
				</ListGroup>
			</Container>
		);
	}
}

export default ShoppingList;
