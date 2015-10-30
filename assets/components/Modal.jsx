import React from 'react';

class Modal extends React.Component {
  
  constructor(props) {
     super(props);

     let {child, show, ...other} = props;
     this.other = other;
  }

  componentDidMount() {}  

  closeModal() {
    this.props.cancel();
    if (typeof this.refs['child'].reset === "function") {
      this.refs['child'].reset()
    }
  }

  closeMaskModal(event) {
    if (event.target.className.match('modal-outer-wrapper')) {
      this.closeModal();
    }
  }

  render() {
    return (
        <div className={"modal-outer-wrapper" + (this.props.show ? "" : " hidden")} onClick={this.closeMaskModal.bind(this)}>
          <div className="modal-inner-wrapper">
            <i className="bicon-close" onClick={this.closeModal.bind(this)}></i>
            <this.props.child {...this.other} ref="child"/>
          </div>
        </div>
    );
  }

}

export default Modal;

