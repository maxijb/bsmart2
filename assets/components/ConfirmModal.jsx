import React from 'react';
import Modal from './Modal';
import AddI18n from './Utils/AddI18n';

class ConfirmModal extends React.Component {
  
  constructor(props) {
     super(props);
     AddI18n.call(this);
  }

  componentDidMount() {}  

  render() {

    let child = (
        <div>
          <i className={"bicon-" + this.props.icon}></i>
          <p>{this.props.text}</p>
          <a className="modal-primary-action" onClick={this.props.confirm}>{this.__("confirm")}</a>
          <a className="modal-secondary-action" onClick={this.props.cancel}>{this.__("cancel")}</a>
        </div>
      );

    return (
        <Modal {...this.props} child={child} show={true}/>
    );
  }

}

export default ConfirmModal;

