import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';

import Home from "./Home";
import Profile from "./Profile";
import Quiz from "./Quiz";
import Questions from "./Questions";
import Results from "./Results";

class Routes extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<Switch>
				<Route exact path="/">
					<Home/>
				</Route>
				<Route exact path="/profile" render={(props) => <Profile {...props} data={this.props.data} />} />
				<Route exact path="/quiz">
					<Quiz />
				</Route>
				<Route exact path="/questions/">
					<Questions />
				</Route>
				<Route exact path="/results/">
					<Results />
				</Route>

				<Route
					path="/spotify_callback"
					render={({location}) =>
						<Redirect
							to={{
								pathname: "/profile",
								state: { from: location }
							}}
						/>
					}
				/>

				<Route path="/spotify_callback">
					<Redirect to="/profile" />
				</Route>
			</Switch>
		)
	}
}

export default Routes;

Routes.propTypes = {
	data: PropTypes.array
}