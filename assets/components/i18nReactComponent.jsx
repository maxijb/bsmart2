import React from 'react';

class i18nReactComponent extends React.Component {
  
  contructor() {
  	super();
  	try {
		this.__ = typeof window == "undefined" ? 
			this.props.i18n || function(a){ return a } 
			: 
			window.__;

	} catch(e) {}
  }
}

export default i18nReactComponent;