var React = require('react');
var TagsCreateLightbox = require('./TagsCreateLightbox');
var TagsStore = require('./Stores/TagsStore');
var pubsub = require('./Utils/PubSub');

module.exports = React.createClass({
  
  componentDidMount: function() {
  },

  getInitialState: function() {
    return {
      showLightbox: false
    }
  },

  openCreateTagLightbox: function() {
  	this.setState({showLightbox: true});
  },

  closeCreateTagLightbox: function() {
  	this.setState({showLightbox: false});
    this.refs.lightbox.reset();
  },

  create: function(name, color) {
    var _this = this;
    this.setState({loading: true});

    pubsub.emit("ACTION:tag-create", name, color, function() {
      _this.setState({loading: false});
      _this.closeCreateTagLightbox();
    });
  },

  render: function() {

  	return (
    	<div className="tag-create">
    		<p className='tag-create-line'>
    			<a className="button" onClick={this.openCreateTagLightbox}>Create new tag</a>
    		</p>
    		<TagsCreateLightbox ref="lightbox" confirm={this.create} cancel={this.closeCreateTagLightbox} show={this.state.showLightbox} />
    	</div>
    );
  }
});

