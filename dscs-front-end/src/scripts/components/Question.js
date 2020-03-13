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
		this.setState({
			answer: e.target.value
		})
	}

	onSubmit(e) {
		e.preventDefault();

		let answer = this.state.answer;

		// Dear heavenly father forgive me for I have sinned.
		// Dear group members who read this, I am not proud of what I have done
		// But I will push this code, for those of you who wish to receive a 9 or higher
		document.querySelector('.b-question__label input[type=radio]:checked').checked = false;

		this.setState({
			answer: ''
		}, () => {
			this.props.cb(answer)
		})
	}

	renderOptions() {
		let uuid = Math.random().toString(36).substring(2, 8);

		if(this.props.question.type === 'lyrics') {
			return (
				this.props.question.multipleChoice.answers.map((el, i) => {
					return (
						<div onChange={this.onChange} className="b-question__label" key={i} id={`answer-${el.id}`}>
							<input name={`answer-${uuid}`} type="radio" value={el.id} id={`id-${el.id}`} />
							<label htmlFor={`id-${el.id}`}>{el.value}</label>
						</div>
					)
				})
			)
		} else if(this.props.question.type === 'albumcover') {
			return (
				this.props.question.multipleChoice.answers.map((el, i) => {
					return (
						<div onChange={this.onChange} className="b-question__label" key={i} id={`answer-${el.id}`}>
							<input name={`answer-${uuid}`} type="radio" value={el.id} id={`id-${el.id}`} />
							<label htmlFor={`id-${el.id}`}><img className="b-question__image" src={el.value} alt={`Cover image for answer ${el.id}`} /></label>
						</div>
					)
				})
			)
		} else {
			return false
		}


	}

	render() {
		let options = this.renderOptions();

		return (
			<div className={`b-question ${this.props.question.type}`}>
				<p>Question {this.props.questionId + 1}</p>
				<h3>{this.props.question.instruction}</h3>
				<h4>{this.props.question.question}</h4>
				<form onSubmit={this.onSubmit.bind(this)}>
					<div className="b-question__questions">
						{options}
					</div>
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