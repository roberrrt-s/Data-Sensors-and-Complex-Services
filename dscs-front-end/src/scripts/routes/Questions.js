import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Question from "../components/Question";

class Questions extends Component {

	constructor(props) {
		super(props);

		this.state = {
			currentQuestionId: 0,
			matchId: `c2a365ef-99b8-451b-8414-4b96fd9ef2ae`,
			quizDone: false,
			givenAnswers: {
				matchId: 'c2a365ef-99b8-451b-8414-4b96fd9ef2ae',
				questions: []
			}
		}

		fetch(`https://api.fantickets.nl/v1/getMatch?matchId=${this.state.matchId}`)
			.then(res => res.json())
			.then(res => {
				this.setState({data: res})
				console.log(this.state.data)
			})

	}

	onClickHandler(answer) {
		console.log('user answered:', answer)

		let givenAnswers = JSON.parse(JSON.stringify(this.state.givenAnswers))

		givenAnswers.questions.push({
			questionId: this.state.data.quiz.questions[this.state.currentQuestionId].id,
			answerId: answer
		})

		this.setState({
			givenAnswers: givenAnswers
		})

		if(this.state.currentQuestionId < this.state.data.quiz.questions.length - 1) {
			this.setState({
				currentQuestionId: this.state.currentQuestionId + 1
			})
		}
		else {
			this.setState({
				quizDone: true
			})
		}
	}

	render() {
		return (
			<main id="questions">
				<h1>Questions</h1>
					<div className="b-questions">
						{this.state.data && !this.state.quizDone ? (
							<Question cb={this.onClickHandler.bind(this)} question={this.state.data.quiz.questions[this.state.currentQuestionId]} questionId={this.state.currentQuestionId}/>
						) : this.state.data && this.state.quizDone ? (
							<p>{`you're done!`}</p>
						) : null }
						<Link to="/results">View results</Link>
					</div>
			</main>
		)
	}
}

export default Questions;