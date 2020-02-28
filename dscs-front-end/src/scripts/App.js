// Core
import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import PropTypes from 'prop-types';


class App extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div className="l-app">
				<p>if you see this, react + react router + redux work</p>
			</div>
		);
	}
}

export default App;