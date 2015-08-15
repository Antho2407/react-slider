var React = require('react');
require('velocity-animate');
require('velocity-animate/velocity.ui');

var canvas = null;
var context = null;
var images = null;

var isDragging = false;
var moveXAmount = 0;
var startX = 0;
var oldX = 0;
var canvasOffset=null;
var offsetX=null;

// This parts is useful to know the real length of the slider
var limitX = 0;
var lastWidth = 0;

// Calculate aspect ratio 
// We want the maximum width/height
function getAspectRatio(srcWidth, srcHeight, maxWidth, maxHeight) {
  var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  var bestWidth = srcWidth*ratio;
  var bestHeight = srcHeight*ratio;
  return { width: bestWidth, height: bestHeight };
}

// Redraw pictures
function refreshcanvas(){
	// Clear cancas
	context.clearRect(0, 0, canvas.width, canvas.height);
	var length = images.length;
	limitX = 0;

	// For each picture
	for (var i = 0; i < length; i++) {
		
		// Draw the picture with the good ratio
		var img = images[i];
    	var imgSize = getAspectRatio(img.width, img.height, canvas.width, canvas.height);
    	
    	// Center the picture
    	var centerHeight = (canvas.height - imgSize.height) / 2
  		
  		// Draw the pictures next to each others
  		context.drawImage(img,(limitX) + moveXAmount,centerHeight,imgSize.width, imgSize.height);
  		lastWidth = imgSize.width;;
  		limitX += imgSize.width;
	}
}

// Slider component
var Slider = React.createClass({

	// Preload pictures
	loadImages: function(sources, callback) {
	    images = [];
	    var loadedImages = 0;
	    var length = sources.length;

	    // For each picture 
	    // Load the source
		for (var i = 0; i < length; i++) {
		    images[i] = new Image();
	    	images[i].onload = function() {
		        
	    		// When all the pictures ar loaded
	    		// Fire callback
		        if(++loadedImages >= length) {
		        	callback();
		        }
	      	};
	      	images[i].src = sources[i];
		}
	},

	getDefaultProps: function() {
		return {
			images : []
		};
	},

	componentWillMount: function(){
	},

	componentDidMount:function(){
		// Build canvas
		document.getElementById("wrapper-canvas").innerHTML = '<canvas id="myCanvas" width="600" height="400"></canvas>';
		canvas = document.getElementById("myCanvas");
		context = canvas.getContext('2d');

		// Keep offset to avoid bad mouse position
		canvasOffset=$("#myCanvas").offset();
		offsetX=canvasOffset.left;
		canvas.addEventListener("after:render", function(){ canvas.calcOffset() });
		
		// Avoid double click bug
		canvas.onselectstart = function () { return false; }

		// Mousedown -> begin dragging
		canvas.onmousedown = function(event){
			isDragging = true;
			// Keep the start click
			startX = parseInt(event.clientX-offsetX);
		};

		// Mouseup -> finish dragging
		window.onmouseup = function(){
			oldX = moveXAmount;
		    isDragging = false;
		};

		// Mousemove -> slide pictures
		window.onmousemove = function(event) {
		    if( isDragging == true )
		    {   
		    	// Calculate the new position
		    	// The reference is the startclick and not the mouse position itself
		        var moveXtmp = parseInt(event.clientX-offsetX) - startX + oldX;
		        
		        // Avoid sliding if we reach the limits
		        if (moveXtmp > (-(limitX-lastWidth))&&(moveXtmp<=0)){
			        moveXAmount = moveXtmp;
			        refreshcanvas();
		    	}
		    }
		};

		// Load pictures
		this.loadImages(this.props.images, function() {
			refreshcanvas();
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