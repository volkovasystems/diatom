"use strict";

const diatom = require( "./diatom.js" );

const Test = diatom( "Test" );
Test.prototype.initialize = function initialize( hello ){
	console.log( arguments );
};

Test( "hello", "world", "yeah" );
