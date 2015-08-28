var React = require('react');
var AutocompleteItem = require('./AutocompleteItem');

module.exports = components.AutocompleteList = React.createClass({
  render: function() {
    var that = this;
  	var items = this.props.autocompleteItems.map(function (item, i) {
      return (
        <AutocompleteItem item={item} 
                          searchText={that.props.searchText} 
                          key={i} 
                          order={i} 
                          clickHandler={that.props.clickHandler}/>
      );
    });


    return (
    	 <ul className='autocomplete-list'>
    	 	{items}
    	 </ul>
    	);
  }
});



