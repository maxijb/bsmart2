var React = require('react');
var TagsList = require('./TagsList');
var TagsCreate = require('./TagsCreate');
var pubsub = require('./Utils/PubSub');
var CommonMixins = require('./CommonMixins');
var TagsStore = require('./Stores/TagsStore');


module.exports = React.createClass({
  mixins: [CommonMixins.translationMixin],
  componentDidMount: function() {
    var _this = this;
    pubsub.on('EVENT:tags-updated', function(tags, active) {
      _this.setState({tags: tags, active: active});
    });
  },

  getInitialState: function() {
    //server side rendering
    if (this.props.tags) {
	   return {tags: (this.props.tags || null), active: {}};
    } else {
      //client side rendering consumes service
      return {tags: TagsStore.getTags(), active: TagsStore.getActive()};
    }
  },

  removeTag: function(id) {
    var i, 
        j, 
        tags = this.state.tags;

    //find in array
    for (i = 0; i < tags.length; i++ ) {
        if (tags[i].id == id) {
            j = i;
            break;
        }
    }

    //update state
    tags.splice(j, 1);
    this.setState({tags: tags});

    //delete from database
    $.post('/tag/destroy/' + id);
  },

  toggleTag: function(id) {
    pubsub.emit("ACTION:tag-toggle", id);
  },

  selectTag: function(id) {

     pubsub.emit("ACTION:tag-selected", {tag_id: id});

      var active  = this.state.active,
        tags      = this.state.tags, 
        i,
        j;

      active[id] = true;
      pubsub.emit("ACTION:tag-selected", active);

      //find in array
      for (i = 0; i < tags.length; i++ ) {
          if (tags[i].id == id) {
              j = i;
              break;
          }
      }

      tags[j].active = 1;
      this.setState({tags: tags, active: active});

  },

  render: function() {
    return (
    	<div className="tags-container bookmarks-filters-box">
        <h2>{this.__("myBookmarks")}<i className="bicon-settings"></i></h2>
    		<TagsList tags={this.state.tags} removeTag={this.removeTag} selectTag={this.toggleTag}/> 
        <TagsCreate />
    	</div>
    );
  }
});

