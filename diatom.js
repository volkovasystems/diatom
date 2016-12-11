/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2016 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "diatom",
			"path": "diatom/diatom.js",
			"file": "diatom.js",
			"module": "diatom",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/diatom.git",
			"test": "diatom-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Class blueprint.
	@end-module-documentation

	@include:
		{
			"falzy": "falzy",
			"komento": "komento",
			"llamalize": "llamalize",
			"protype": "protype"
		}
	@end-include
*/

const falzy = require( "falzy" );
const komento = require( "komento" );
const llamalize = require( "llamalize" );
const protype = require( "protype" );

//: @support-module:
	//: @reference: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from
	Array.from||(Array.from=function(){var r=Object.prototype.toString,n=function(n){
	return"function"==typeof n||"[object Function]"===r.call(n)},t=function(r){var n=Number(r);
	return isNaN(n)?0:0!==n&&isFinite(n)?(n>0?1:-1)*Math.floor(Math.abs(n)):n},
	e=Math.pow(2,53)-1,o=function(r){var n=t(r);return Math.min(Math.max(n,0),e)};
	return function(r){var t=this,e=Object(r);
	if(null==r)throw new TypeError("Array.from requires an array-like object - not null or undefined");
	var a,u=arguments.length>1?arguments[1]:void 0;if("undefined"!=typeof u){
	if(!n(u))throw new TypeError("Array.from: when provided, the second argument must be a function");
	arguments.length>2&&(a=arguments[2])}for(var i,f=o(e.length),c=n(t)?
	Object(new t(f)):new Array(f),h=0;f>h;)i=e[h],
	u?c[h]="undefined"==typeof a?u(i,h):u.call(a,i,h):c[h]=i,h+=1;return c.length=f,c}}());
//: @end-support-module

const diatom = function diatom( name ){
	/*;
		@meta-configuration:
			{
				"name:required": "string"
			}
		@end-meta-configuration
	*/

	if( !protype( name, STRING ) || falzy( name ) ){
		throw new Error( "invalid name" );
	}

	if( !( /^[A-Z][A-Za-z0-9]+$/ ).test( name ) ){
		throw new Error( "name is not simple" );
	}

	name = llamalize( name, true );

	try{
		let blueprint = komento( function template( ){
			/*!
				function {{name}}( option, callback ){
					var parameter = Array.from( arguments );

					var template = "( function evaluate( ){ var result = undefined; @body return result; } ).bind( @bind )( )"
						.replace( "@bind", "( typeof global != 'undefined' )? global : ( typeof window != 'undefined' )? window : this" )
						.replace( "@body", "try{ result = ( @expression ); }catch( error ){ @error }" )
						.replace( "@error", "throw new Error( 'error executing expression, ' + error );" );

					if( this instanceof {{name}} && parameter.length ){
						if( typeof this.initialize == "function" ){
							this.initialize.apply( this, parameter );
						}

						return this;

					}else if( this instanceof {{name}} && !parameter.length ){
						if( typeof this.initialize == "function" ){
							this.initialize( );
						}

						return this;

					}else if( !( this instanceof {{name}} ) && parameter.length ){
						var expression = "function delegate( @parameter ){ return new this( @parameter ); }"
							.replace( /\@parameter/g,
								parameter.map( function onEachParameter( item, index ){
									return "abcdefghijklmnopqrstuvwxyz"[ index ];
								} ).join( "," ) );

						expression = template.replace( "@expression", expression );

						return eval( expression ).apply( {{name}}, parameter );

					}else{
						var expression = "function delegate( ){ return new this( ); }";

						expression = template.replace( "@expression", expression );

						return eval( expression ).call( {{name}} );
					}
				};
			*/
		},

		{ "name": name } );

		return new Function( `return ${ blueprint }` )( );

	}catch( error ){
		throw new Error( `function not created properly, ${ error }` );
	}
};

module.exports = diatom;
