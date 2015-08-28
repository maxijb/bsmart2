var React = require('react');
module.exports = React.createClass({
  
  componentDidMount: function() {
  },
  

  
  render: function() {
    return (
      <span className="searched-label">{this.props.tag.name}</span> 
    );
  }
});

