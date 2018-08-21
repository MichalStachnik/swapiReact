import React from 'react';

class Menu extends React.Component {

  handleClick = (person) => {
    this.props.menuItemClick(person);
  }
  handleNavClick = (option) => {
    this.props.navItemClick(option);
  }
  render() {
    if(this.props.people) {
      return (
        <ul id="menu">
          {this.props.people.map(person => {
            return <li onClick={() => this.handleClick(person)} key={person.name}>{person.name}</li>;
          })}
          <li>
            <p onClick={() => this.handleNavClick('left')}><i className="fas fa-angle-double-left"></i></p>
            <p onClick={() => this.handleNavClick('right')}><i className="fas fa-angle-double-right"></i></p>
          </li>
        </ul>
      );
    }
    else {
      return (
        <div>
          Loading...
        </div>
      );
    }
  }
}

export default Menu;