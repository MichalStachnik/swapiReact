import React, { Component } from 'react';
import './App.css';

import Menu from './components/Menu';
import Dashboard from './components/Dashboard';

class App extends Component {
  state = {
    people: [],
    selectedPerson: '',
    movieTitles: [],
    next: '',
    previous: '',
    movieCount: 0
  };

  componentDidMount = () => {
    // Fetch initial data
    fetch('https://swapi.co/api/people/')
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(data => {
        this.setState({
          people: data.results,
          next: data.next
        });
      });
  }

  // Handle click of person name
  handleMenuItemClick = (person) => {
    // Clear items, set selected person, set the movie count to throttle search
    this.setState({
      selectedPerson: person,
      movieTitles: [],
      movieCount: person.films.length
    });
    // Go through each film url and fetch to get titles
    person.films.forEach(film => {
      fetch(film)
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(data => {
          this.setState({
            movieTitles: [...this.state.movieTitles, [data.title, data.release_date]]
          });
        });
    });
  }

  // Handle click of nav buttons
  handleNavItemClick = (option) => {
    // Left nav click
    if(option == 'left' && this.state.previous) {
      fetch(this.state.previous)
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(data => {
          this.setState({
            people: data.results,
            next: data.next,
            previous: data.previous
          });
        });
    }
    // Right nav click
    if(option == 'right'){
      fetch(this.state.next)
        .then(res => res.json())
        .catch(err => console.log(err))
        .then(data => {
          this.setState({
            people: data.results,
            next: data.next,
            previous: data.previous
          });
        });
    }
  }

  render() {
    return (
      <div id="wrapper">
        <Menu navItemClick={this.handleNavItemClick} menuItemClick={this.handleMenuItemClick} people={this.state.people}/>
        <Dashboard movieCount={this.state.movieCount} movieTitles={this.state.movieTitles}/>
      </div>
    );
  }
}

export default App;
