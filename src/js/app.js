window.jQuery = window.$ = require("jquery");

var Slider = require('./components/slider.react');

var React = require('react');
window.React = React;

// The React component take a list of pictures
var images = [
    "./images/dog.jpg", 
	"./images/sunset.jpg",  
	"./images/turtle.jpg", 
    "./images/profil.jpg", 
	"./images/cat.jpg"
];

var App = React.createClass({

	getInitialState: function() {
         return {
         }
     },

	render: function() {

		return (
			<div id="container">
    			<Slider images={images} />
    		</div>
    	);
   }
});

module.exports = App;

React.render(<App/>, document.body);