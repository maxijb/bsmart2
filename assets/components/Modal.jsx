import React from 'react';

class Modal extends React.Component {
  
  constructor(props) {
     super(props);

     let {child, show, ...other} = props;
     this.other = other;
  }

  componentDidMount() {}  

  render() {
    return (
        <div className={"popup " + (this.props.show ? "" : " hidden")}>
            <this.props.child {...this.other}/>
        </div>
    );
  }

}

export default Modal;

