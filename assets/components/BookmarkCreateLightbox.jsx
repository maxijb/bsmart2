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
    	
    			<form className="bookmark-create">
            <p className='modal-title'>New bookmark</p>
      			<fieldset className="modal-main-content-wrapper">
      				<label>URL</label>
              <input type="text" ref="uri" onChange={this.handleChange.bind(this, "uri")} value={this.state.uri} />
              <label>Title</label>
      				<input type="text" ref="name" onChange={this.handleChange.bind(this, "name")} value={this.state.name} />
              <label>Tag</label>
              <SelectOption tags={this.props.tags} ref="tag" />
      			</fieldset>
      			<a className="modal-primary-action" onClick={this.confirm.bind(this)}>Create</a>
      			<a className="modal-secondary-action" onClick={this.props.cancel.bind(this)}>Cancel</a>
          </form>
    );
  }
});

