import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Question from "../components/Question";

class Questions extends Component {

	constructor(props) {
		super(props);

		this.state = {
			questionId: 1
		}
	}

	onClickHandler(answer) {
		console.log('user answered:', answer)

		this.setState({
			questionId: this.state.questionId + 1
		})
	}

	render() {
		return (
			<main id="questions">
				<h1>questions</h1>
				<Question cb={this.onClickHandler.bind(this)} questionId={this.state.questionId} />
				<Link to="/results">View results</Link>
			</main>
		)
	}
}

export default Questions;