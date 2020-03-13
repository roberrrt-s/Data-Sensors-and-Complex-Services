import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Question from "../components/Question";

class Questions extends Component {

	constructor(props) {
		super(props);

		this.state = {
			currentQuestionId: 0,
			matchId: `matchId=c2a365ef-99b8-451b-8414-4b96fd9ef2ae`
		}

		fetch(`https://api.fantickets.nl/v1/getMatch?${this.state.matchId}`)
			.then(res => res.json())
			.then(res => {
				this.setState({data: res})
				console.log(this.state.data)
			})

	}

	onClickHandler(answer) {
		console.log('user answered:', answer)

		this.setState({
			questionId: this.state.currentQuestionId + 1
		})
	}

	render() {
		return (
			<main id="questions">
				<h1>questions</h1>
				{this.state.data ? (
					<Question cb={this.onClickHandler.bind(this)} question={this.state.data.quiz.questions[this.state.currentQuestionId]} questionId={this.state.currentQuestionId}/>
				) : null }
				<Link to="/results">View results</Link>
			</main>
		)
	}
}

export default Questions;