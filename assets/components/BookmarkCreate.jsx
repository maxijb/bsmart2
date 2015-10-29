var React = require('react');
var Modal = require('./Modal');
var BookmarkCreateLightbox = require('./BookmarkCreateLightbox');
var SearchBox = require('./SearchBox');
var _ = require('lodash');
var pubsub = require('./Utils/PubSub');
var AddI18n = require('./Utils/AddI18n');

class TagsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showLightbox: false,
      tags: this.props.tags
    };
    AddI18n.call(this);
  }
  


  componentDidMount() {
  }

  
  openCreateLightbox() {
  	this.setState({showLightbox: true}); 
  }

  closeCreateLightbox() {
  	this.setState({showLightbox: false});
  }

  create(bookmark) {

    pubsub.emit("ACTION:bookmark-create", 
                _.extend({user_id: W.user.id}, bookmark), 
                () => {
                        this.setState({loading: false});
                        this.closeCreateLightbox();
                    }
                );
      
   

  }

  render() {

  	return (
      <div>
      		<a className="button new-bookmark-action" onClick={this.openCreateLightbox.bind(this)}>{this.__("addABookmark")}</a>
      		<Modal child={BookmarkCreateLightbox} confirm={this.create.bind(this)} cancel={this.closeCreateLightbox.bind(this)} show={this.state.showLightbox} tags={this.state.tags} />
          <SearchBox />
      </div>
    );
  }

}

export default TagsContainer;