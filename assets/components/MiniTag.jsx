import React from 'react';

class Minitag extends React.Component {
  
  componentDidMount() {}  

  render() {
    return (
      <span className="searched-label">{this.props.tag.name}</span>
    );
  }
}

export default Minitag;