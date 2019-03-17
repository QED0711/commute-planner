import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// APOLLO
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory'; // included with apollo boot
import { HttpLink } from 'apollo-link-http'; // included with apollo boot
import {ApolloProvider} from 'react-apollo';


// COMPONENTS
import CurrentRoutes from './components/CurrentRoutes';


const client = new ApolloClient({
    link: new HttpLink({uri: "http://localhost:4000/graphql"}),
    cache: new InMemoryCache()
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h2>Routes</h2>
          <CurrentRoutes />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
