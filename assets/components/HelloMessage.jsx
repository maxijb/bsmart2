var React = require('react');
var Bye = require('./ByeMessage');

module.exports = components.HelloMessage = React.createClass({
  render: function() {
    return (
    	<div className="wrapper">
    		<div>Hello {this.props.name}</div>
    		<components.ByeMessage name={this.props.name} /> 
    	</div>
    	);
  }
});



