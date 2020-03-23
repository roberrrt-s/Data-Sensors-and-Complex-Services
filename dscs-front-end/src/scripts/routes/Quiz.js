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
					<div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
						<div className="col-md-5 p-lg-5 mx-auto my-5">
							<p>{`You have a match! Answer the following questions to verify you're a real fan, once you answered them correctly, you can buy the tickets!`}</p>
							<Link className="btn btn-outline-secondary" to={`/questions/${this.state.matchId}`}>Start the quiz</Link>
						</div>
					</div>
				</main>
			</React.Fragment>
		)
	}
}

export default Quiz;

Quiz.propTypes = {
	match: PropTypes.object
}