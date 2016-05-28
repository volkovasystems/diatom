"use strict";

/*:
	@module-license:
		The MIT License (MIT)

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
			"packageName": "diatom",
			"fileName": "diatom.js",
			"moduleName": "diatom",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/diatom.git",
			"testCase": "diatom-test.js",
			"isGlobal": true
		}
	@end-module-configuration

	@module-documentation:

	@end-module-documentation
*/

if( typeof window == "undefined" ){
	var harden = require( "harden" );
	var komento = require( "komento" );
	var raze = require( "raze" );
	var titlelize = require( "titlelize" );
}

if( typeof window != "undefined" &&
	!( "harden" in window ) )
{
	throw new Error( "harden is not defined" );
}

if( typeof window != "undefined" &&
	!( "komento" in window ) )
{
	throw new Error( "komento is not defined" );
}

if( typeof window != "undefined" &&
	!( "raze" in window ) )
{
	throw new Error( "raze is not defined" );
}

if( typeof window != "undefined" &&
	!( "titlelize" in window ) )
{
	throw new Error( "titlelize is not defined" );
}

var diatom = function diatom( name ){
	/*:
		@meta-configuration:
			{
				"name:required": "string"
			}
		@end-meta-configuration
	*/

	if( !name ){
		console.log( "fatal, empty class name" );

		throw new Error( "empty class name" );
	}

	if( !( /^[A-Za-z][A-Za-z0-9]+$/ ).test( name ) ){
		console.log( "fatal, name is not simple", name );

		throw new Error( "name is not simple" );
	}

	name = titlelize( name );

	try{
		var blueprint = komento( function template( ){
			/*!
				function {{name}}( option, callback ){
					if( typeof raze == "undefined" ){
						console.log( "fatal, raze is not defined",
							"class built with diatom should use raze",
							"install and include raze before using this class",
							"{{name}}" );

						throw new Error( "raze is not defined" );
					}

					var parameter = raze( arguments );

					if( this instanceof {{name}} &&
						parameter.length )
					{
						if( typeof this.initialize == "function" ){
							this.initialize.apply( this, parameter );

						}else{
							console.log( "warning, diatom class should have initialize method",
								"proceeding without initialization",
								"{{name}}" );
						}

						return this;

					}else if( this instanceof {{name}} &&
						!parameter.length )
					{
						return this;

					}else if( !( this instanceof {{name}} ) &&
						parameter.length )
					{
						return {{name}}.apply( new {{name}}( ), parameter );

					}else{
						return {{name}}.apply( new {{name}}( ) );
					}
				};
			*/
		},

		{ "name": name } );

		return new Function( "return " + blueprint.replace( /\n/gm, "" ) )( );

	}catch( error ){
		console.log( "fatal, function is not created properly", error );

		throw error;
	}
};

if( typeof module != "undefined" ){
	module.exports = diatom;
}
