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

	render() {
		return (
			<div className="question">
				<p>this is question {this.props.questionId}</p>
				<form onSubmit={this.onSubmit.bind(this)}>
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
	cb: PropTypes.func,
	test: PropTypes.number
}