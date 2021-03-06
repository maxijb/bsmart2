import React from 'react';
import ColorSelector from './ColorSelector';


class TagsCreateLightbox extends React.Component {
  
  constructor() {
    super();
    this.state = {
      value: '' 
    }
  }

  componentDidMount() {}  

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  selectColor(color) {
    this.setState({color: color});
  }

  confirm() {
    this.props.confirm(this.state.value, this.refs.colorSelector.state.active, (this.props.tagToEdit || null));
    this.reset();
  }

  reset() {
    this.setState({value: ""});
    this.refs.colorSelector.reset();
  }

  render() {

    let value = this.props.tagToEdit ? this.props.tagToEdit.name : this.state.value;
    let color = this.props.tagToEdit ? this.props.tagToEdit.color : null;

    return (
        <form className='tag-create-lightbox'>
          <p className='modal-title'>Create a new label</p>
          <fieldset className="modal-main-content-wrapper">
            <label>Name your label:</label>
            <input type="text" id="tag-create-input" onChange={this.handleChange.bind(this)} value={value} />
            <label>Pick a color:</label>
            <ColorSelector select={this.selectColor} ref="colorSelector"/>
          </fieldset>
          <a className="modal-primary-action" onClick={this.confirm.bind(this)}>Create</a>
          <a className="modal-secondary-action" onClick={this.props.cancel}>Cancel</a>
        </form>
    );

  }
  
}

export default TagsCreateLightbox;

