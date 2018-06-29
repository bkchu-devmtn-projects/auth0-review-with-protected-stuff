import React, { Component } from 'react';
import axios from 'axios';
import { HashRouter as Router, Link } from 'react-router-dom';
import routes from './routes';
import './App.css';

class App extends Component {
  //keep in mind, this usually happens in redux
  //you want a userReducer in redux so that you can access the logged in user anywhere.
  state = {
    user: {}
  };

  componentDidMount() {
    //keep in mind, this usually happens in redux
    axios.get('/me').then(response => {
      this.setState({ user: response.data });
    });
  }

  render() {
    const style = {
      buttons: {
        margin: '10px'
      },
      button: {
        color: 'white',
        border: '1px solid white',
        padding: '5px',
        textDecoration: 'none',
        margin: '10px'
      },
      link: {
        color: 'white'
      },
      nav: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '50%',
        margin: '20px auto'
      }
    };

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <div style={style.buttons}>
              {/* if the user object exists, show the logout button, otherwise show the login button */}
              {this.state.user ? (
                <a style={style.button} href="http://localhost:3001/logout">
                  Logout
                </a>
              ) : (
                <a style={style.button} href="http://localhost:3001/login">
                  Login
                </a>
              )}
            </div>

            {/* if the user object exists, enable navbar links */}
            {this.state.user && (
              <nav style={style.nav}>
                <Link style={style.link} to="/routeA">
                  routeA
                </Link>
                <Link style={style.link} to="/routeB">
                  routeB
                </Link>
                <Link style={style.link} to="/routeC">
                  routeC
                </Link>
              </nav>
            )}
          </header>

          {/* if the user object exists, enable routes */}
          {this.state.user && routes}
        </div>
      </Router>
    );
  }
}

export default App;
