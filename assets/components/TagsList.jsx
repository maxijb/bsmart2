import React from 'react';
import Tag from './Tag';

class TagList extends React.Component {
  
  render() {
    
    let items = Object.keys(this.props.tags).map((id, i) => {
        let item = this.props.tags[id];
        return (
          <Tag tag={item} key={item.id} remove={this.props.removeTag} select={this.props.selectTag} edit={this.props.editTag} />
        );
    });

    return (
      <ul className="tags-list">
        {items}
      </ul>
    );
  }

}

export default TagList;

