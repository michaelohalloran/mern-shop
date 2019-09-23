import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";
import "./ShoppingList.css";
import { connect } from "react-redux";
import { getItems, deleteItem, addItem } from "../actions/itemActions";

class ShoppingList extends Component {
	componentDidMount() {
		console.log(this.props);
		this.props.getItems();
	}

	addItem = (e) => {
		const name = prompt("New item: ");
		this.props.addItem(name);
		// const newItem = { id: uuid(), name };
		// this.setState({ items: [ ...this.props.item.items, newItem ] });
	};

	deleteItem = (id) => {
		console.log(id);
		const { items } = this.props.item;
		// const updatedItems = items.filter((item) => item.id !== id);
		// this.setState({ items: updatedItems });
		this.props.deleteItem(id);
	};

	render() {
		const itemList = this.props.item.items.map((item) => {
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

const mapStateToProps = (state) => {
	return {
		item: state.item
	};
};

export default connect(mapStateToProps, { getItems, deleteItem, addItem })(ShoppingList);
