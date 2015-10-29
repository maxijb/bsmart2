import TagsList from './TagsList';
import TagsCreate from './TagsCreate';
import pubsub from './Utils/PubSub';

import CommonMixins from './CommonMixins';
import TagsStore from './Stores/TagsStore';

import React from 'react';
import AddI18n from './Utils/AddI18n';


class TagsContainer extends React.Component {

  constructor(props) {
    super(props);

    if (props.tags) {
      //server side rendering
      this.state = {tags: (props.tags || {}), active: {}};
    } else {
      //client side rendering consumes service
      this.state = {tags: TagsStore.getTags(), active: TagsStore.getActive(), tagListOpen: false };
    }
    this.props = props || {};
    AddI18n.call(this);
  }


  componentDidMount() {
    pubsub.on('EVENT:tags-updated', (tags, active) => {
      this.setState({tags: tags, active: active});
    });

    pubsub.on("ACTION:taglist-toggle", (state) => {
       this.setState({tagListOpen: state});
    });
  }


  removeTag(id) {
   
    let j, 
        tags = this.state.tags;

    //find in array
    for (let i = 0; i < tags.length; i++ ) {
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
  }

  toggleTag(id) {
      pubsub.emit("ACTION:tag-toggle", id);
  }

  selectTag(id) {

     pubsub.emit("ACTION:tag-selected", {tag_id: id});

      var active  = this.state.active,
        tags      = this.state.tags, 
        j;

      active[id] = true;
      pubsub.emit("ACTION:tag-selected", active);

      //find in array
      for (let i = 0; i < tags.length; i++ ) {
          if (tags[i].id == id) {
              j = i;
              break;
          }
      }

      tags[j].active = 1;
      this.setState({tags: tags, active: active});

  }

  render() {
    return (
    	<div className={"tags-container bookmarks-filters-box " + (this.state.tagListOpen ? "slideoff" : "")}>
        <h2>{this.__("myBookmarks")}</h2>
    		<TagsList tags={this.state.tags} removeTag={this.removeTag.bind(this)} selectTag={this.toggleTag.bind(this)}/> 
        <TagsCreate />
    	</div>
    );
  }
}

export default TagsContainer;
