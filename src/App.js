
import React, { Component} from 'react';
import Main from './components/MainComponent.js'
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/Store';

const store = ConfigureStore();
class App extends Component {
  render(){
  return (
    <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
  );
  }
}

export default App;