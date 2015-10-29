import React from 'react';
import TagsCreateLightbox from './TagsCreateLightbox';
import TagsStore from './Stores/TagsStore';
import pubsub from './Utils/PubSub';
console.log('tagcreate', pubsub);

class TagsCreate extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = {
        showLightbox: false
      }
      this.props = props;
  }

  openCreateTagLightbox() {
    this.setState({showLightbox: true});
  }

  closeCreateTagLightbox() {
    this.setState({showLightbox: false});
    this.refs.lightbox.reset();
  }

  create(name, color) {
    this.setState({loading: true});

    pubsub.emit("ACTION:tag-create", name, color, () => {
      this.setState({loading: false});
      this.closeCreateTagLightbox();
    });
  }

  render() { 

    return (
      <div className="tag-create">
        <p className='tag-create-line'>
          <a className="button new-label-action" onClick={this.openCreateTagLightbox.bind(this)}>Create new tag</a>
        </p>
        <TagsCreateLightbox ref="lightbox" confirm={this.create.bind(this)} cancel={this.closeCreateTagLightbox.bind(this)} show={this.state.showLightbox} />
      </div>
    );
  }

}

export default TagsCreate;