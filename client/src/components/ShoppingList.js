import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";
import "./ShoppingList.css";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";

class ShoppingList extends Component {
	componentDidMount() {
		console.log(this.props);
		this.props.getItems();
	}

	deleteItem = (id) => {
		console.log(id);
		this.props.deleteItem(id);
	};

	render() {
		const itemList = this.props.item.items.map((item) => {
			return (
				<CSSTransition key={item._id} timeout={500} classNames="fade">
					<ListGroupItem>
						<Button
							className="remove-btn"
							color="danger"
							size="sm"
							onClick={() => this.deleteItem(item._id)}
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

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
