import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Question extends Component {

	constructor() {
		super();

		this.onChange = this.onChange.bind(this)

		this.state = {
			answer: "",
			counter: 10
		}

		this.form = React.createRef();
		this.mounted = false;
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
		let radio = document.querySelector('.b-question__label input[type=radio]:checked');
		radio ? radio.checked = false : null;

		let text = document.querySelector('.b-question__label input[type=text]');
		text ? text.value = "" : null;

		this.setState({
			answer: '',
			counter: 10
		}, () => {
			this.props.cb(answer, this.props.question.type)
			this.setCountdown();
		})
	}

	renderOptions() {
		let uuid = Math.random().toString(36).substring(2, 8);

		if(this.props.question.type === 'lyrics') {
			console.log(this.props.question)
			return (
				<div onChange={this.onChange} className="b-question__label" id={`answer-`}>
					<input type="text" name="answer" value={this.state.answer} onChange={this.onChange} />
					<label htmlFor={`id-`}>{}</label>
				</div>
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

	setCountdown() {
		clearInterval(this.myInterval)
		this.myInterval = setInterval(() => {
			const { counter } = this.state

			if (counter > 0) {
				this.setState(({ counter }) => ({
					counter: counter - 1
				}))
			}
			if (counter === 0) {
				clearInterval(this.myInterval)
				this.setState({
					counter: 10
				})
				this.form.current.click()
				this.setCountdown()
			}
		}, 1000)
	}

	componentDidMount() {
		if(!this.mounted) {
			this.setCountdown();
		}
		this.mounted = true;
	}

	componentWillUnmount() {
		clearInterval(this.myInterval)
	}

	render() {
		let options = this.renderOptions();

		return (
			<div className={`b-question ${this.props.question.type}`}>
				<p>Question {this.props.questionId + 1}<span> time left: {this.state.counter}</span></p>
				<h3>{this.props.question.instruction}</h3>
				<h4>{this.props.question.question}</h4>
				<form id="form" onSubmit={this.onSubmit.bind(this)}>
					<div className="b-question__questions">
						{options}
					</div>
					<input ref={this.form} type="submit" value="Submit answer" />
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