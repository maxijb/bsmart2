var React = require('react');
var CommonMixins = require('./CommonMixins');
var pubsub = require('./Utils/PubSub');
var MiniTag = require('./MiniTag');

module.exports = React.createClass({
  mixins: [CommonMixins.translationMixin],
  componentDidMount: function() {

      pubsub.on("EVENT:tags-updated", (tags, active) => {
        var activeTags = [];
        for (var i in active) {
          activeTags.push(tags[i]);
        } 

        this.setState({activeTags: activeTags});
      });
  },

  getInitialState: function() {
    return {activeTags : []};
  },

  render: function() {
    var items = this.state.activeTags.map(function(item, i) {
       return (
          <MiniTag tag={item} />
       )
    });
  	return (
    	<p className="search-results-feedback">
        {this.__("showingAllBookmarksWithLabels")}: 
          {items}
      </p>
    );
  }
});

