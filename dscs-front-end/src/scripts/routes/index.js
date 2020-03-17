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
				<Route exact path="/quiz/:matchId" render={(props) => <Quiz {...props} />}/>
				<Route exact path="/questions/:matchId" render={(props) => <Questions {...props} />}/>
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
			</Switch>
		)
	}
}

export default Routes;

Routes.propTypes = {
	data: PropTypes.array
}