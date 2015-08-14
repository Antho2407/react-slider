var React = require('react');
require('velocity-animate');
require('velocity-animate/velocity.ui');

var canvas = null;
var context = null;

var Slider = React.createClass({

	loadCss:function(url) {
	    // var link = document.createElement("link");
	    // link.type = "text/css";
	    // link.rel = "stylesheet";
	    // link.href = url;
	    // document.getElementsByTagName("head")[0].appendChild(link);
	},

	loadImages: function(sources, callback) {
	    var images = [];
	    var loadedImages = 0;
	    //var numImages = 0;
	    var length = sources.length;

		for (var i = 0; i < length; i++) {
			console.log(sources[i]);
		    images[i] = new Image();
	    	images[i].onload = function() {
	    		console.log("load " + loadedImages);
		        if(++loadedImages >= length) {
		        	callback(images);
		        }
	      	};
	      	images[i].src = sources[i];
		}

	    // get num of sources
	    // for(var src in sources) {
	    // 	numImages++;
	    // }
	},

	getDefaultProps: function() {
		return {
			images : []
		};
		// return {
		// 	animation: "transition.swoopIn", 
		// 	duration: 600,
		// 	stagger: 100,
		// 	radius: 200, 
		// 	easing: [0.175, 0.885, 0.32, 1.275],
		// 	distance: -1
		// };
	},

	componentWillMount: function(){
		// this.loadCss("css/app.css");
	},

	componentDidMount:function(){
		$("#wrapper-canvas").html('<canvas id="myCanvas" width="200" height="250"></canvas>');
		canvas = document.getElementById('myCanvas');
		context = canvas.getContext('2d');

		this.loadImages(this.props.images, function(images) {
			var length = images.length;
			for (var i = 0; i < length; i++) {
				context.drawImage(images[i], (i*200), 30, 200, 200);
			}
      	});
	},

	render: function() {

  		return (
			<div id="wrapper-canvas">
    		</div>
    	);
  	}
});

	module.exports = Slider;