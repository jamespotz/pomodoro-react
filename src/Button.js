import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  iconOrName() {
    if (this.props.icon) return this.props.icon;
    return this.props.name
  }

  render() {
    return (
      <button 
      name={this.props.name}
      className="bg-transparent hover:bg-white text-white font-semibold hover:text-grey-dark h-12 w-12 mx-4 border border-white hover:border-transparent rounded-full" 
      onClick={() => { this.props.onClick() }}>
       {this.iconOrName()}
      </button>
    );
  }
};

export default Button;