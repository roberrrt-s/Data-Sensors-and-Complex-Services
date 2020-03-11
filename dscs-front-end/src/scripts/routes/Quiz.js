import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Quiz extends Component {

	constructor() {
		super();
	}

	render() {
		return (
			<main id="quiz">
				<Link to="/questions">Start the quiz</Link>
			</main>
		)
	}
}

export default Quiz;