import 'react-app-polyfill/ie11';

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'scripts/App';
import 'styles/main.scss';
import * as serviceWorker from './scripts/push/serviceWorker';

ReactDOM.render(<App />, document.getElementById('app-container'));

serviceWorker.register();
