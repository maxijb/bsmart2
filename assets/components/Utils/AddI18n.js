function addi18n() {
	try {
		this.__ = typeof window == "undefined" ? 
			//server side
			this.props.i18n || function(a){ return a } 
			: 
			//client side
			window.__;
	} catch(e) {
		//fallback if it goes wrong... just return the key
		this.__ = function(a){ return a } ; 
	}
}
		
export default addi18n;