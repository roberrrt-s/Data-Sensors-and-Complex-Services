import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Question from "../components/Question";
import Navbar from '../components/Navbar';

class Questions extends Component {

	constructor(props) {
		super(props);

		let { matchId } = this.props.match.params;

		this.state = {
			currentQuestionId: 0,
			loading: true,
			matchId: matchId,
			callbackError: null,
			ticketUrl: null,
			quizDone: false,
			givenAnswers: {
				matchId: matchId,
				questions: []
			}
		}

		fetch(`https://api.fantickets.nl/v1/getMatch?matchId=${this.state.matchId}&sandbox=1`)
			.then(res => res.json())
			.then(res => {
				if(res.success) {
					this.setState({data: res})
				} else {
					console.log('token failure');
					this.setState({loading: false})
				}
			}).catch(err => {
				console.log(err)
			})

	}

	onClickHandler(answer) {

		async function postData(url = '', data = {}) {
			// Default options are marked with *
			const response = await fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *client
			body: JSON.stringify(data) // body data type must match "Content-Type" header
			});
			return await response.json(); // parses JSON response into native JavaScript objects
		}

		console.log('user answered:', answer)

		let givenAnswers = JSON.parse(JSON.stringify(this.state.givenAnswers))

		givenAnswers.questions.push({
			questionId: this.state.data.quiz.questions[this.state.currentQuestionId].id,
			answerId: parseInt(answer, 10)
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

			console.log(givenAnswers)

			postData('https://api.fantickets.nl/v1/checkQuizAnswers?sandbox=1', givenAnswers)
				.then((data) => {
					if(!data.success) {
						console.log('error');
						console.log(data)
						if(data.error) {
							this.setState({ callbackError: data.error })
						} else {
							this.setState({ callbackError: 'One or more answers were wrong, try again another time'})
						}
					} else {
						this.setState({ ticketUrl: data.ticketUrl })
					}
				}).catch(err => console.log);

		}
	}

	render() {
		return (
			<React.Fragment>
				<Navbar />
				<main id="questions">
					<h1>Questions</h1>
						<div className="b-questions">
							{this.state.loading && !this.state.data && !this.state.quizDone ? (
								<p>Loading questions..</p>
							) : !this.state.loading && !this.state.data && !this.state.quizDone ? (
								<p>Token expired</p>
							) : this.state.data && !this.state.quizDone ? (
								<Question cb={this.onClickHandler.bind(this)} question={this.state.data.quiz.questions[this.state.currentQuestionId]} questionId={this.state.currentQuestionId}/>
							) : this.state.quizDone && this.state.callbackError ? (
								<p>{this.state.callbackError}</p>
							) : this.state.quizDone && this.state.ticketUrl ? (
								<a href={this.state.ticketUrl}>Buy tickets</a>
							) : this.state.data && this.state.quizDone ? (
								<p>{`Quiz done! Checking your results.....`}</p>
							) : null }
						</div>
				</main>
			</React.Fragment>
		)
	}
}

export default Questions;

Questions.propTypes = {
	match: PropTypes.object,
	location: PropTypes.object
}