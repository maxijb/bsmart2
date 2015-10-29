import React from 'react';
import pubsub from './Utils/PubSub';


class MenuButton extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {open: false};
  }

 
  componentDidMount() {
   	
  }  

  toggleState() {
  	var state = !this.state.open;
  	this.setState({open: state});
  	pubsub.emit("ACTION:taglist-toggle", state);
  }



  render() {
  	var kind = this.state.open ? "slideoff bicon-close" : "bicon-menu";

    return (
      <span className={"mobile-menu-icon " + kind} onClick={this.toggleState.bind(this)}></span>
    );
  }
}

export default MenuButton;