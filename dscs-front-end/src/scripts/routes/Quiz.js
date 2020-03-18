import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';

class Quiz extends Component {

	constructor(props) {
		super(props);

		let { matchId } = this.props.match.params;

		this.state = {
			matchId: matchId
		}
	}

	render() {
		return (
			<React.Fragment>
				<Navbar />
				<main id="quiz">
					<Link to={`/questions/${this.state.matchId}`}>Start the quiz</Link>
				</main>
			</React.Fragment>
		)
	}
}

export default Quiz;

Quiz.propTypes = {
	match: PropTypes.object
}