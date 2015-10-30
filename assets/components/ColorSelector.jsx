var React = require('react');
module.exports = React.createClass({
  
  componentDidMount: function() {
  },
  getDefaultProps: function() {
    return {
      colors: ["000", "666", "333", "ccc", "ddd"]
    };
  },

  getInitialState: function() {
    return {
      active: null
    }
  },

  selectColor: function(color) {
    this.setState({active: color});
  },

  reset: function() {
    this.setState(this.getInitialState());
  },

  render: function() {

    var _this = this;

    var items = this.props.colors.map(function (item, i) {

	  	var style = {
	  		"background": "#"+item
	  	};

      var classAttr = "color-selector-item";// + (this.state.active == item ? "active": "");
      if (item == _this.state.active) classAttr += " active";

       return (
         <div className={classAttr} style={style} onClick={_this.selectColor.bind(_this, item)}>
         </div>
       );
    });


  	return (
    	<div className="color-selector-wrapper">
    		{items}
    	</div>
    );
  }
});

