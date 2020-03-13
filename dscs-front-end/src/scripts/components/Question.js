import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {

	constructor() {
		super();

		this.onChange = this.onChange.bind(this)

		this.state = {
			answer: ""
		}
	}

	onChange(e) {
		e.preventDefault();

		this.setState({
			answer: e.target.value
		})
	}

	onSubmit(e) {
		e.preventDefault();
		this.props.cb(this.state.answer)

		this.setState({
			answer: ''
		})
	}

	renderOptions() {
		if(this.props.question.type === 'lyrics') {
			return (
				this.props.question.multipleChoice.answers.map((el, i) => {
					return (
						<div className="b-question__label" key={i} id={`answer-${el.id}`}>
							<input name="answer" type="radio" value={`id-${el.id}`} />
							<label htmlFor={`id-${el.id}`}>{el.value}</label>
						</div>
					)
				})
			)
		} else {
			return <p>no</p>
		}
	}

	render() {
		let options = this.renderOptions();

		return (
			<div className="b-question">
				<p>Question {this.props.questionId + 1}</p>
				<h3>{this.props.question.instruction}</h3>
				<h4>{this.props.question.question}</h4>
				<form onSubmit={this.onSubmit.bind(this)}>
					{options}
					<input type="text" name="answer" value={this.state.answer} onChange={this.onChange} />
					<input type="submit" value="Submit answer" />
				</form>
			</div>
		)
	}
}

export default Question;

Question.propTypes = {
	questionId: PropTypes.number.isRequired,
	question: PropTypes.object.isRequired,
	cb: PropTypes.func,
	test: PropTypes.number
}