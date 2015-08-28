var React = require('react');
var Tag = require('./Tag');
module.exports = React.createClass({
  
  componentDidMount: function() {
  },
  
  getDefaultProps: function() {
    return {
      select: function(){}

    };
  },

  remove: function(id, event) {
    this.props.remove(id);
    event.preventDefault();
  },

    //<a className="remove-button" onClick={this.remove.bind(this, this.props.tag.id)}>X</a>

  render: function() {
    return (
      <li className="tag" data-id={this.props.tag.id} onClick={this.props.select.bind(this, this.props.tag.id)}>
          <span className={"label-checkbox " + (this.props.tag.active ? "label-checkbox-on bicon-tickfull" : "")}></span>
          <span className="label-name">{this.props.tag.name}</span>
      </li>
    );
  }
});

