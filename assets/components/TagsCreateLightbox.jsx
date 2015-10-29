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
    this.props.confirm(this.state.value, this.refs.colorSelector.state.active);
  }

  reset() {
    this.setState({value: ""});
    this.refs.colorSelector.reset();
  }

  render() {

    return (
        <div className='tag-create-lightbox'>
          <p className='title'>New label</p>
          <fieldset>
            <p>Name your new label</p>
            <input type="text" id="tag-create-input" onChange={this.handleChange.bind(this)} value={this.state.value} />
            <p>Pick a color</p>
            <ColorSelector select={this.selectColor} ref="colorSelector"/>
          </fieldset>
          <a className="button primary" onClick={this.confirm.bind(this)}>Create</a>
          <a className="button" onClick={this.props.cancel}>Cancel</a>
        </div>
    );

  }
  
}

export default TagsCreateLightbox;

