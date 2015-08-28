var React = require('react');

module.exports = components.SearchboxInput = React.createClass({
  render: function() {
    return (
    	<input type='text' className='searchbox-input' value={this.props.searchText} onChange={this.props.changeHandler} />
    	);
  }
});



