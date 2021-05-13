import React, { Component } from 'react';

import SyncStorage from 'sync-storage';

import Navigation from './src/navigation/Navigation';

class App extends Component {
  state = {};

  componentDidMount() {
    SyncStorage.init();
  }

  render() {
    return (
      <Navigation />
    );
  }
}
export default App;



