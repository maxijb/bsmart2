var React = require('react');

module.exports = components.AutocompleteItem = React.createClass({
  
  highlightText: function() {   
  	var search = this.props.searchText,
  		name = this.props.item.name,
  		index = name.search(new RegExp(search, 'i')),
  		len = this.props.searchText.length;

  	if (index !== -1) {
	  	return ( 
	  		<span>
	  			{name.substr(0, index)}
	  			<b>{name.substr(index, len)}</b>
	  			{name.substr(index+len)}
	  		</span>
	  	);
  	} else {
  		return (
  			<span>{name}</span>
  		);
  	}
  },

  render: function() {
    return (
    	 <li className={'autocomplete-item ' + (this.props.item.active ? 'active': '') } 
    	 	 data-id={this.props.item.name_id} 
    	 	 onClick={this.props.clickHandler.bind(null, this.props.order)}
    	 >
    	 	{this.highlightText()}
    	 </li>
    	);
  }
});



