var React = require('react');
var CommonMixins = require('./CommonMixins');

module.exports = React.createClass({
  
  mixins: [CommonMixins.translationMixin],

  componentDidMount: function() {
  },

  render: function() {
  	return (

      <div className="bookmark">
        <a href="{this.props.tag.uri}" target="_blank">
          <h3 className="bookmark-name">{this.props.tag.name}</h3>
          <p className="bookmark-url">{this.props.tag.uri}</p>
          <i className="bicon-readguide"></i>
        </a>
        <div className="bookmark-actions">
          <span><i className="bicon-acedit"></i>{this.__('edit')}</span>
          <span><i className="bicon-trashcan"></i>{this.__('delete')}</span>
        </div>
      </div>

    );
  }
});

