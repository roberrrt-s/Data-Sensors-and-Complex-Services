// Core
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
//import { Provider } from 'react-redux'
//import { createStore } from 'redux'

import Routes from "./routes/index"
//import rootReducer from "./reducers/index";

//const store = createStore(rootReducer);

class App extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			//<Provider store={store}>
				<BrowserRouter>
					<Routes />
				</BrowserRouter>
			//</Provider>
		);
	}
}

export default App;

