"use strict";

/*;
	@submodule-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
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
	@end-submodule-license

	@submodule-configuration:
		{
			"package": "diatom",
			"path": "diatom/template.module.js",
			"file": "template.module.js",
			"module": "diatom",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/diatom.git",
			"test": "diatom-test.js",
			"internal": true
		}
	@end-submodule-configuration

	@submodule-documentation:
		Blueprint template
	@end-submodule-documentation

	@note:
		Do not edit this unless you know what you're doing.

		This blueprint template is intended to support previous versions of javascript.

		Do not incorporate any third party or any dependency modules to this template.

		Do not add newer versions of syntaxes without consulting to the main author.
	@end-note
*/

const template = function template( ){
	return `
		function {{{ name }}}( {{{ parameter }}} ){
			try{
				var parameter = Array.from( arguments );

				var template = "( function evaluate( ){ var result = undefined; @body return result; } ).bind( @bind )( )"
					.replace( "@bind", "( typeof global != 'undefined' )? global : ( typeof window != 'undefined' )? window : this" )
					.replace( "@body", "try{ result = ( @expression ); }catch( error ){ @error }" )
					.replace( "@error", "throw new Error( 'error executing expression, ' + error.stack );" );

				if( this instanceof {{{ name }}} && parameter.length ){
					if( typeof this.initialize == "function" ){
						this.initialize.apply( this, parameter );
					}

					return this;

				}else if( this instanceof {{{ name }}} && !parameter.length ){
					if( typeof this.initialize == "function" ){
						this.initialize( );
					}

					return this;

				}else if( !( this instanceof {{{ name }}} ) && parameter.length ){
					var variable = "{{{ parameter }}}".split( "," );
					var initialize = {{{ name }}}.prototype.initialize;
					if( typeof initialize == "function" ){
						var pattern = /^function\\s+[a-zA-Z0-9\\_\\$]+\\s*\\(\\s*([a-zA-Z0-9\\_\\$\\s\\,]+?)\\s*\\)/;

						var argument = ( ( initialize.toString( )
							.match( pattern ) || [ ] )[ 1 ] || "" )
							.split( /\\,\\s*/ )
							.map( ( variable ) => { return variable.trim( ); } )
							.filter( ( variable ) => { return !!variable; } );

						if( argument.length > 0 ){
							variable = argument;
						}
					}

					var expression = "function delegate( @parameter ){ return new this( @parameter ); }"
						.replace( /\@parameter/g,
							parameter.map( function onEachParameter( item, index ){
								return variable[ index ] || "abcdefghijklmnopqrstuvwxyz"[ index ];
							} ).join( "," ) );

					expression = template.replace( "@expression", expression );

					return eval( expression ).apply( {{{ name }}}, parameter );

				}else{
					var expression = "function delegate( ){ return new this( ); }";

					expression = template.replace( "@expression", expression );

					return eval( expression ).call( {{{ name }}} );
				}

			}catch( error ){
				throw new Error( "error creating instance of {{{ name }}}, " + error.stack );
			}
		};
	`;
};

module.exports = template;
