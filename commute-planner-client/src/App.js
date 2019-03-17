import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// APOLLO
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory'; // included with apollo boot
import { HttpLink } from 'apollo-link-http'; // included with apollo boot
import {ApolloProvider} from 'react-apollo';


// COMPONENTS
import Routes from './components/Routes';
import CurrentRoute from './components/CurrentRoute';
import NewRouteForm from './components/NewRouteForm';



const client = new ApolloClient({
    link: new HttpLink({uri: "http://localhost:4000/graphql"}),
    cache: new InMemoryCache()
})


class App extends Component {
  constructor(){
    super();
    
    this.state = {
      currentRoute: null,
    }

    this.setCurrentRoute = this.setCurrentRoute.bind(this)

  }
  

  setCurrentRoute(routeID){
    console.log(routeID);
    this.setState({currentRoute: routeID});
  }


  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h2>Routes</h2>
          <Routes setCurrentRoute={this.setCurrentRoute} />
          <CurrentRoute routeID={this.state.currentRoute}/>
          <NewRouteForm />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
