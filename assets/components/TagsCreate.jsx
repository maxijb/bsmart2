import React from 'react';
import TagsCreateLightbox from './TagsCreateLightbox';
import Modal from './Modal';
import TagsStore from './Stores/TagsStore';
import pubsub from './Utils/PubSub';
import AddI18n from './Utils/AddI18n';



class TagsCreate extends React.Component {
  
  constructor(props) {
      super(props);
      this.state = {
        showLightbox: false
      }
      this.props = props;
      AddI18n.call(this);
  }

  openCreateTagLightbox() {
    this.setState({showLightbox: true});
  }

  closeCreateTagLightbox() {
    this.setState({showLightbox: false});
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
          <a className="button new-label-action" onClick={this.openCreateTagLightbox.bind(this)}>{this.__("createNewTag")}</a>
        </p>
        <Modal child={TagsCreateLightbox} confirm={this.create.bind(this)} cancel={this.closeCreateTagLightbox.bind(this)} show={this.state.showLightbox} tagToEdit={this.props.tagToEdit}/>
      </div>
    );
  }

}

export default TagsCreate;