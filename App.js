import React from 'react';
import { Provider } from 'react-redux'; 
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/data';
import ViewWrapper from './src/components/ViewWrapper';
//import { API_KEY } from 'react-native-dotenv';

export default class App extends React.Component {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(thunk));
    return (
      <Provider store={store}>
        <ViewWrapper />
      </Provider>
    );
  }
}


