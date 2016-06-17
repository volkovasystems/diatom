"use strict";

/*:
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

	@end-module-documentation

	@include:
		{
			"harden": "harden",
			"komento": "komento",
			"llamalize": "llamalize",
			"raze": "raze"
		}
	@end-include
*/

if( typeof window == "undefined" ){
	var called = require( "called" );
	var harden = require( "harden" );
	var heredito = require( "heredito" );
	var komento = require( "komento" );
	var llamalize = require( "llamalize" );
	var raze = require( "raze" );

	global.called = called;
	global.heredito = heredito;
	global.raze = raze;
}

if( typeof window != "undefined" &&
	!( "called" in window ) )
{
	throw new Error( "called is not defined" );
}

if( typeof window != "undefined" &&
	!( "harden" in window ) )
{
	throw new Error( "harden is not defined" );
}

if( typeof window != "undefined" &&
	!( "heredito" in window ) )
{
	throw new Error( "heredito is not defined" );
}

if( typeof window != "undefined" &&
	!( "komento" in window ) )
{
	throw new Error( "komento is not defined" );
}

if( typeof window != "undefined" &&
	!( "llamalize" in window ) )
{
	throw new Error( "llamalize is not defined" );
}

if( typeof window != "undefined" &&
	!( "raze" in window ) )
{
	throw new Error( "raze is not defined" );
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

	name = llamalize( name, true );

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

					if( typeof heredito == "undefined" ){
						console.log( "fatal, heredito is not defined",
							"class built with diatom should use heredito",
							"install and include heredito before using this class",
							"{{name}}" );

						throw new Error( "heredito is not defined" );
					}

					if( typeof called == "undefined" ){
						console.log( "fatal, called is not defined",
							"class built with diatom should use called",
							"install and include called before using this class",
							"{{name}}" );

						throw new Error( "called is not defined" );
					}

					var parameter = raze( arguments );

					if( this instanceof {{name}} &&
						parameter.length )
					{
						if( typeof this.initialize == "function" ){
							if( this.constructor.name == "_{{name}}" &&
								this.parent.constructor.name == "{{name}}" &&
								this.parent.initialize == "function" )
							{
								this.parent.initialize = called.bind( this )( this.parent.initialize );

								this.parent.initialize.apply( this, parameter );

							}else{
								this.initialize = called.bind( this )( this.initialize );

								this.initialize.apply( this, parameter );
							}

						}else{
							console.log( "warning, diatom class should have initialize method",
								"proceeding without initialization",
								"{{name}}" );
						}

						return this;

					}else if( this instanceof {{name}} &&
						!parameter.length )
					{
						if( typeof this.initialize == "function" ){
							if( this.constructor.name == "_{{name}}" &&
								this.parent.constructor.name == "{{name}}" &&
								this.parent.initialize == "function" )
							{
								this.parent.initialize = called.bind( this )( this.parent.initialize );

								this.parent.initialize( );

							}else{
								this.initialize = called.bind( this )( this.initialize );

								this.initialize( );
							}

						}else{
							console.log( "warning, diatom class should have initialize method",
								"proceeding without initialization",
								"{{name}}" );
						}

						return this;

					}else if( !( this instanceof {{name}} ) &&
						parameter.length )
					{
						var _{{name}} = function _{{name}}( ){ return this; };

						_{{name}} = heredito( _{{name}}, {{name}} );

						_{{name}}.prototype.initialize = called( function initialize( ){ return this; } );

						return {{name}}.apply( new _{{name}}( ), parameter );

					}else{
						var _{{name}} = function _{{name}}( ){ return this; };

						_{{name}} = heredito( _{{name}}, {{name}} );

						_{{name}}.prototype.initialize = called( function initialize( ){ return this; } );

						return {{name}}.apply( new _{{name}}( ) );
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
