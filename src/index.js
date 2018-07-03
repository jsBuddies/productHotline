import React from 'react';
import { render } from "react-dom";
import './index.css';
import Router from './components/Router';
import App from './App';

// render(<App />, document.getElementById('root'));
render(<Router />, document.getElementById('root'));
