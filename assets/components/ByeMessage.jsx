var React = require('react');

module.exports = components.ByeMessage = React.createClass({
  render: function() {
    return ( 
    	<div>Bye {this.props.name}</div>
    	);
  }
});



