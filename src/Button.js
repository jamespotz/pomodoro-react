import React, { Component } from 'react';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="
        bg-transparent 
        hover:bg-black 
        text-black-dark 
        font-semibold 
        hover:text-white 
        py-2 
        px-4 
        mx-4 
        border 
        border-black 
        hover:border-transparent 
        rounded-full" 
      onClick={() => { this.props.onClick() }}>
       {this.props.name}
      </button>
    );
  }
};

export default Button;