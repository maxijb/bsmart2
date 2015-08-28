var React = require('react');
module.exports = React.createClass({
  
  componentDidMount: function() {
  },

  getInitialState : function() {
    var props = this.props.tags && this.props.tags.length;
    return {
      activeName: props ? this.props.tags[0].name : "",
      activeId: props ? this.props.tags[0].id : -1,
    };
  },

  handleContentClick: function() {
    showList = this.state.showList;
    this.setState({showList: !showList});
    if (!showList) {
      document.addEventListener('click', this.hideList);
    }
  },

  hideList: function() {
    document.removeEventListener('click', this.hideList);
    this.setState({showList: false});
  },

  handleOptionClick: function(item) {
    this.setState({activeId: item.id, activeName: item.name});
  },

  getValue: function() {
      return { id: this.state.activeId, name: this.state.activeName };
  },

  render: function() {
    var _this = this;

    //generate options
    var items = this.props.tags.map(function (item, i) {
      var classAttr = "color-selector-item";// + (this.state.active == item ? "active": "");
      if (item == _this.state.active) classAttr += " active";

       return (
         <li data-id={item.id} onClick={_this.handleOptionClick.bind(_this, item)}>{item.name} </li>
       );
    });


  	return (
    	<div class="fancy-select">
        <div class='fancy-select-content' data-id={this.state.activeId} onClick={this.handleContentClick}>
          <span className="fancy-select-display">{this.state.activeName}</span>
        </div>
        <ul className={"fancy-select-list" + (this.state.showList ? " visible" : "")}>
        	{items}
        </ul>
    	</div>
    );
  }
});

