var React = require('react');
var Tag = require('./Tag');
module.exports = React.createClass({
  
  componentDidMount: function() {
  },


  render: function() {
    var _this = this;
  	var items = Object.keys(this.props.tags).map(function (id, i) {
      var item = _this.props.tags[id];
      return (
        <Tag tag={item} key={item.id} remove={_this.props.removeTag} select={_this.props.selectTag}/>
      );
    });

    return (
    	<ul className="tags-list">
    		{items}
    	</ul>
    );
  }
});

