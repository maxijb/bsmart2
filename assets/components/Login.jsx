var React = require('react');
var CommonMixins = require('./CommonMixins');

module.exports = React.createClass({
  mixins: [CommonMixins.translationMixin],

  componentDidMount: function() {

  		var _this = this;

  	   	window.fbAsyncInit = function() {
			    FB.init({
			      appId      : '378165722393720',
			      xfbml      : true,
			      version    : 'v2.3'
			    });

			if (!_this.props.user) {
			    FB.getLoginStatus(function(response) {
				    _this.statusChangeCallback(response);
				  });
			    
			}
	    };

	  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "//connect.facebook.net/en_US/sdk.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));

},

	getInitialState: function() {
		return {user: (this.props.user || null)};
	},

  	testAPI: function() {
  			var _this = this;
			    // console.log('Welcome!  Fetching your information.... ');
			    FB.api('/me', function(response) {
			    	if (response.name) {
				    	response.type = 'fb';	
				    	if (!W.user) {
				    		response.native_id = response.id;
				    		delete response.id;
				    		$.post('/user/signup', response, function(data) {
				    			_this.setState({user: data});
						    	var cookie = W.helpers.cookies.decodeCookie($.cookie('w_ctx'));
						    	cookie.user = data;
						    	$.cookie('w_ctx', W.helpers.cookies.encodeCookie(cookie));
						    	window.location = '/dashboard';
				    		})
				    	}
			    	} else {
				    	_this.setState({user: W.user});
			    	}

			      // console.log('Successful login for: ' + response.name);
			      // console.log(response);
			      // document.getElementById('status').innerHTML =
			      //   'Thanks for logging in, ' + response.name + '!';
			    });
	},

  statusChangeCallback: function(response) {
			    console.log('statusChangeCallback');
			    console.log(response);
			    // The response object is returned with a status field that lets the
			    // app know the current login status of the person.
			    // Full docs on the response object can be found in the documentation
			    // for FB.getLoginStatus().
			    if (response.status === 'connected') {
			      // Logged into your app and Facebook.
			      this.testAPI();
			    } else if (response.status === 'not_authorized') {
			      // The person is logged into Facebook, but not your app.
			      //document.getElementById('status').innerHTML = 'Please log ' +'into this app.';
			    } else {
			      // The person is not logged into Facebook, so we're not sure if
			      // they are logged into this app or not.
			      //document.getElementById('status').innerHTML = 'Please log ' +'into Facebook.';
			    }
	},


  checkLoginState: function() {
  		var _this = this;
	    FB.getLoginStatus(function(response) {
	      _this.statusChangeCallback(response);
	    });
  },

  login: function() {
	  	FB.login(this.checkLoginState);

  },

  logout: function() {
  	var _this = this;
  	FB.logout(function() {
  		_this.setState({user: null});
  		var cookie = W.helpers.cookies.decodeCookie($.cookie('w_ctx'));
		delete cookie.user;
		$.cookie('w_ctx', W.helpers.cookies.encodeCookie(cookie));
  	});
  },

  render: function() {
  	var connected = this.state && this.state.user;
    return (
    	<div className="wrapper">
    		<div id="profile-box" className={"status " + (!connected ? 'hidden' : "")}>
				<img src="https://placeholdit.imgix.net/~text?txtsize=5&txt=40%C3%9740&w=40&h=40" />
				<div id="user-details" className="status">
					<p>{connected ? this.state.user.name : ""}</p>
					<a href="#" onClick={this.logout}>{this.__("logOut")}</a>
				</div>
			</div>
    		<div className={"button " + (connected ? 'hidden' : "")} onClick={this.login}>{this.__("logInWithFacebook")}</div>
    	</div>
    	);
  }
});

