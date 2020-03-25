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

		fetch(`${process.env.REACT_APP_FANTICKETS_API}getMatch?matchId=${this.state.matchId}&sandbox=1`)
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

	onClickHandler(answer, type) {

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
		console.log('for question type', type)

		let givenAnswers = JSON.parse(JSON.stringify(this.state.givenAnswers))

		if(type === 'albumcover') {
			givenAnswers.questions.push({
				questionId: this.state.data.quiz.questions[this.state.currentQuestionId].id,
				answerId: parseInt(answer, 10)
			})
		} else {
			givenAnswers.questions.push({
				questionId: this.state.data.quiz.questions[this.state.currentQuestionId].id,
				answerValue: answer
			})
		}

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

			postData(`${process.env.REACT_APP_FANTICKETS_API}checkQuizAnswers?sandbox=1`, givenAnswers)
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
				}).catch(err => {
					console.log(err)
				});

		}
	}

	render() {
		return (
			<React.Fragment>
				<Navbar />
				<main id="questions">
					<div className="b-questions">
						{this.state.loading && !this.state.data && !this.state.quizDone ? (
							<div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
								<div className="col-md-5 p-lg-5 mx-auto my-5">
									<p>{`Loading your questions now...`}</p>
								</div>
							</div>
						) : !this.state.loading && !this.state.data && !this.state.quizDone ? (
							<div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
								<div className="col-md-5 p-lg-5 mx-auto my-5">
									<p>{`This match has already been used!`}</p>
								</div>
							</div>
						) : this.state.data && !this.state.quizDone ? (
							<Question cb={this.onClickHandler.bind(this)} question={this.state.data.quiz.questions[this.state.currentQuestionId]} questionId={this.state.currentQuestionId}/>
						) : this.state.quizDone && this.state.callbackError ? (
							<div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
								<div className="col-md-5 p-lg-5 mx-auto my-5">
									<p>{this.state.callbackError}</p>
								</div>
							</div>
						) : this.state.quizDone && this.state.ticketUrl ? (
							<div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
								<div className="col-md-5 p-lg-5 mx-auto my-5">
									<p>{`Congratulations! You've proven to be a real fan, click the button to buy your tickets!`}</p>
									<a className="btn btn-primary" href={this.state.ticketUrl}>Buy tickets</a>
								</div>
							</div>
						) : this.state.data && this.state.quizDone ? (
							<div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
								<div className="col-md-5 p-lg-5 mx-auto my-5">
									<p>{`Quiz done! Checking your results.....`}</p>
								</div>
							</div>
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
