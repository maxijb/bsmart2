/*----------------------------------------- 
	.translationMixin
	Adds to the coponent class the property __
   in order to make available this.__("translation")
   and allow translations both in client and server side.
   On the client, it uses window.__  which checks for client-side tranlations available

   On the server, receives a function within the propertie this.props.i18n...
   In case this property is not available just returns a function returning only the original string
----------------------------------------------------*/

module.exports.translationMixin = {
	componentWillMount: function() {
		try {
		this.__ = typeof window == "undefined" ? 
			this.props.i18n || function(a){ return a } 
			: 
			window.__;

		} catch(e) {}
	}
}
