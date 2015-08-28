var React = require('react');
var ColorSelector = require('./ColorSelector');
module.exports = React.createClass({
  
  componentDidMount: function() {
  },

  getInitialState: function() {
    return {
      value: ''
    }
  },

  handleChange: function(event) {
  	this.setState({value: event.target.value});
  },

  selectColor: function(color) {
  	this.setState({color: color});
  },

  confirm: function() {
    this.props.confirm(this.state.value, this.refs.colorSelector.state.active);
  },

  reset: function() {
    this.setState({value: ""});
    this.refs.colorSelector.reset();
  },

  render: function() {

  	return (
    	<div className={"tag-create-lightbox-dimmer " + (this.props.show ? "" : " hidden")}>
    		<div className='tag-create-lightbox'>
    			<p className='title'>New label</p>
    			<fieldset>
    				<p>Name your new label</p>
    				<input type="text" id="tag-create-input" onChange={this.handleChange} value={this.state.value} />
    				<p>Pick a color</p>
    				<ColorSelector select={this.selectColor} ref="colorSelector"/>
    			</fieldset>
    			<a className="button primary" onClick={this.confirm}>Create</a>
    			<a className="button" onClick={this.props.cancel}>Cancel</a>
    		</div>
    	</div>
    );
  }
});

