"use strict";

const diatom = require( "./diatom.js" );

const Merchant = diatom( "Merchant" );
Merchant.prototype.initialize = function initialize( hello, world, yeah ){
	console.log( arguments );
};

Merchant( "hello", "world", "yeah" );
