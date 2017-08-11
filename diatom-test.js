
const assert = require( "assert" );
const diatom = require( "./diatom.js" );

const Test = diatom( "Test" );

assert.equal( typeof Test == "function", true, "should be equal to true" );

Test.prototype.initialize = function initialize( ){
	this.parameters = Array.from( arguments );
};

let test = Test( "hello", "world", "yeah" );

assert.deepEqual( Test[ Symbol.for( "class" ) ],
	Symbol.for( "class" ), "should be equal to Symbol.for( 'class' )" );

assert.equal( test instanceof Test, true, "should be equal to true" );

assert.deepEqual( test.parameters, [ "hello", "world", "yeah" ],
	"should be equal to [ 'hello', 'world', 'yeah' ]" );

console.log( "ok" );
