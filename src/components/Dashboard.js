import React from 'react';

class Dashboard extends React.Component {
  render() {
    // Throttle search 
    if(this.props.movieTitles.length == this.props.movieCount) {
      return (
        <ul id="dashboard">
          {this.props.movieTitles.map(title => {
            return (
              <li key={title}>
                <h3>{title[0]}</h3>
                <br />
                <p>{title[1]}</p>
              </li>
            )
          })}
        </ul>
      );
    }
    else {
      return (
        <div id="dashboard">
        </div>
      )
    }
  }
}

export default Dashboard;