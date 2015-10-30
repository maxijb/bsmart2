import React from 'react';

class Tag extends React.Component {
  
  componentDidMount() {}  

  getDefaultProps() {
    return {
      select: function(){}
    };
  }
  
  removeTag(event) {
    event.stopPropagation();
    this.props.remove(this.props.tag);
  }


  render() {
    return (
        <li className="tag" data-id={this.props.tag.id} onClick={this.props.select.bind(this, this.props.tag.id)}>
            <span className={"label-checkbox " + (this.props.tag.active ? "label-checkbox-on bicon-tickfull" : "")}></span>
            <span className="label-name">{this.props.tag.name}</span>
            <span className="label-action bicon-acedit"></span>
            <span className="label-action bicon-trashcan" onClick={this.removeTag.bind(this)}></span> 
        </li>
    );
  }

}

export default Tag;

