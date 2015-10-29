var React = require('react');
var SelectOption = require('./SelectOption');


module.exports = React.createClass({
  
  componentDidMount: function() {
  },

  getInitialState: function() {
    return {
      uri: '',
      name: ''
    }
  },

  handleChange: function(field, event) {
    var obj = {};
        obj[field] = event.target.value;
  	    this.setState(obj);
  },

  selectColor: function(color) {
  	this.setState({color: color});
  },

  confirm: function() {
    console.log("tagid", this.refs.tag.getValue().id);
    this.props.confirm({
      name: this.state.name, 
      uri: this.state.uri,
      tag_id: this.refs.tag.getValue().id
    });
  },

  reset: function() {
    this.setState(this.getInitialState());
  },

  render: function() {

  	return (
    	<div className={"modal-outer-wrapper" + (this.props.show ? "" : " hidden")}>
    		<div className='modal-inner-wrapper'>
    			<p className='title'>New label</p>
    			<fieldset>
    				<p>URL</p>
            <input type="text" ref="uri" onChange={this.handleChange.bind(this, "uri")} value={this.state.uri} />
            <p>Title</p>
    				<input type="text" ref="name" onChange={this.handleChange.bind(this, "name")} value={this.state.name} />
            <p>Tag</p>
            <SelectOption tags={this.props.tags} ref="tag" />
    			</fieldset>
    			<a className="button primary" onClick={this.confirm.bind(this)}>Create</a>
    			<a className="button" onClick={this.props.cancel.bind(this)}>Cancel</a>
    		</div>
    	</div>
    );
  }
});

