var React = require('react');
var BookmarkCreateLightbox = require('./BookmarkCreateLightbox');
var SearchBox = require('./SearchBox');
var _ = require('lodash');
var pubsub = require('./Utils/PubSub');

module.exports = React.createClass({
  
  componentDidMount: function() {
  },

  getInitialState: function() {
    return {
      showLightbox: false,
      tags: this.props.tags
    }
  },

  openCreateLightbox: function() {
  	this.setState({showLightbox: true}); 
  },

  closeCreateLightbox: function() {
  	this.setState({showLightbox: false});
    this.refs.lightbox.reset();
  },

  create: function(bookmark) {

    pubsub.emit("ACTION:bookmark-create", 
                _.extend({user_id: W.user.id}, bookmark), 
                () => {
                        this.setState({loading: false});
                        this.closeCreateLightbox();
                    }
                );
      
   

  },

  render: function() {

  	return (
      <div>
      		<a className="button new-bookmark-action" onClick={this.openCreateLightbox.bind(this)}>Add a bookmark</a>
      		<BookmarkCreateLightbox ref="lightbox" confirm={this.create.bind(this)} cancel={this.closeCreateLightbox.bind(this)} show={this.state.showLightbox} tags={this.state.tags} />
          <SearchBox />
      </div>
    );
  }
});

