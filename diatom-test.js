
const assert = require( "assert" );
const diatom = require( "./diatom.js" );

const Test = diatom( "Test" );

assert.equal( typeof Test == "function", true, "should be true" );

Test.prototype.initialize = function initialize( ){
	this.parameters = Array.from( arguments );
};

let test = Test( "hello", "world", "yeah" );

assert.equal( test instanceof Test, true, "should be true" );

assert.deepEqual( test.parameters, [ "hello", "world", "yeah" ], "should be deeply equal" );

console.log( "ok" );
