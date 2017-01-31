"use strict";

const diatom = require( "./diatom.js" );

const Merchant = diatom( "Merchant" );
Merchant.prototype.initialize = function initialize( ){
	console.log( arguments );
};

Merchant( "hello", "world", "yeah" );

const Test = diatom( "Test" );
Test.prototype.initialize = function initialize( hello ){
	console.log( arguments );
};

Merchant( "hello", "world", "yeah" );
