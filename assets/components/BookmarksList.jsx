var React = require('react');
var Bookmark = require('./Bookmark');
var SearchBox = require('./SearchBox');
var BookmarkInformationBar = require('./BookmarkInformationBar');
var pubsub = require('./Utils/PubSub');


var BookmarkList = React.createClass({
  
  componentDidMount: function() {
      var _this = this;
      pubsub.on("EVENT:bookmarks-updated", function(bookmarks) {
        console.log(bookmarks);
         _this.setState({bookmarks: bookmarks});
      })
  },

  getInitialState: function() {
     return {
       bookmarks: this.props.bookmarks || []
     };
  },
  

  render: function() {
    var _this = this;
  	
    var items = (this.state.bookmarks || []).map(function (item, i) {
      return (
        <Bookmark tag={item} key={item.id} />
      );
    });

    return (
    	<div className="bookmarks-list">
        <BookmarkInformationBar/>
        <div className='bookmark-row'>
    		  {items}
        </div>
    	</div>
    );
  }
});


module.exports = BookmarkList;