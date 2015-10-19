function addi18n() {
	try {
		this.__ = typeof window == "undefined" ? 
			this.props.i18n || function(a){ return a } 
			: 
			window.__;
	} catch(e) {
		this.__ = function(a){ return a } ; 
	}
}
		
export default addi18n;