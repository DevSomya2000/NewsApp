import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <>
        <div>
          <Navbar />
          <News />
        </div>
      </>
    )
  }
}

// c37a53fb444a47d79801004f83831e2e
