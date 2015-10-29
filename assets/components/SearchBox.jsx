var React = require('react');
var CommonMixins = require('./CommonMixins');

  
module.exports = React.createClass({

  mixins: [CommonMixins.translationMixin],
  
  componentDidMount: function() {
  },
  
    //<a className="remove-button" onClick={this.remove.bind(this, this.props.tag.id)}>X</a>

  render: function() { 
    return (
      <form id="searchbox" action="" method="post">
        <input id="searchbar" type="text" placeholder={this.__("searchABookmarkByLabelOrName")} />
        <span id="searchbtn" className="bicon-search" value={this.__("search")} />
      </form>
    );
  }
});

