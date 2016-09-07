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

	@end-module-documentation

	@include:
		{
			"excursio": "excursio",
			"komento": "komento",
			"llamalize": "llamalize",
			"raze": "raze"
		}
	@end-include
*/

if( typeof window == "undefined" ){
	var excursio = require( "excursio" );
	var komento = require( "komento" );
	var llamalize = require( "llamalize" );
	var raze = require( "raze" );

	global.excursio = excursio;
	global.raze = raze;
}

if( typeof window != "undefined" &&
	!( "excursio" in window ) )
{
	throw new Error( "excursio is not defined" );
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
	/*;
		@meta-configuration:
			{
				"name:required": "string"
			}
		@end-meta-configuration
	*/

	if( !name ){
		throw new Error( "empty class name" );
	}

	if( !( /^[A-Z][A-Za-z0-9]+$/ ).test( name ) ){
		throw new Error( "name is not simple" );
	}

	name = llamalize( name, true );

	try{
		var blueprint = komento( function template( ){
			/*!
				function {{name}}( option, callback ){
					var parameter = raze( arguments );

					if( this instanceof {{name}} &&
						parameter.length )
					{
						if( typeof this.initialize == "function" ){
							this.initialize.apply( this, parameter );
						}

						return this;

					}else if( this instanceof {{name}} &&
						!parameter.length )
					{
						if( typeof this.initialize == "function" ){
							this.initialize( );
						}

						return this;

					}else if( !( this instanceof {{name}} ) &&
						parameter.length )
					{
						return excursio( "function delegate( @parameter ){ return new this( @parameter ); }"
							.replace( /\@parameter/g,
								parameter.map( function onEachParameter( _parameter, index ){
									return "abcdefghijklmnopqrstuvwxyz"[ index ];
								} ).join( "," ) ) )
							.apply( {{name}}, parameter );

					}else{
						return excursio( "function delegate( ){ return new this( ); }" )
							.call( {{name}} );
					}
				};
			*/
		},

		{ "name": name } );

		return new Function( "return " + blueprint.replace( /\n/gm, "" ) )( );

	}catch( error ){
		throw new Error( "function not created properly, " + error.stack );
	}
};

if( typeof module != "undefined" ){
	module.exports = diatom;
}
