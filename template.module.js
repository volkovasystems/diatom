"use strict";

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
