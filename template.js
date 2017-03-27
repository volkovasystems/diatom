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

var template = function template() {
	return "\n\t\tfunction {{{ name }}}( {{{ parameter }}} ){\n\t\t\ttry{\n\t\t\t\tvar parameter = Array.from( arguments );\n\n\t\t\t\tvar template = \"( function evaluate( ){ var result = undefined; @body return result; } ).bind( @bind )( )\"\n\t\t\t\t\t.replace( \"@bind\", \"( typeof global != 'undefined' )? global : ( typeof window != 'undefined' )? window : this\" )\n\t\t\t\t\t.replace( \"@body\", \"try{ result = ( @expression ); }catch( error ){ @error }\" )\n\t\t\t\t\t.replace( \"@error\", \"throw new Error( 'error executing expression, ' + error.stack );\" );\n\n\t\t\t\tif( this instanceof {{{ name }}} && parameter.length ){\n\t\t\t\t\tif( typeof this.initialize == \"function\" ){\n\t\t\t\t\t\tthis.initialize.apply( this, parameter );\n\t\t\t\t\t}\n\n\t\t\t\t\treturn this;\n\n\t\t\t\t}else if( this instanceof {{{ name }}} && !parameter.length ){\n\t\t\t\t\tif( typeof this.initialize == \"function\" ){\n\t\t\t\t\t\tthis.initialize( );\n\t\t\t\t\t}\n\n\t\t\t\t\treturn this;\n\n\t\t\t\t}else if( !( this instanceof {{{ name }}} ) && parameter.length ){\n\t\t\t\t\tvar variable = \"{{{ parameter }}}\".split( \",\" );\n\t\t\t\t\tvar initialize = {{{ name }}}.prototype.initialize;\n\t\t\t\t\tif( typeof initialize == \"function\" ){\n\t\t\t\t\t\tvar pattern = /^function\\s+[a-zA-Z0-9\\_\\$]+\\s*\\(\\s*([a-zA-Z0-9\\_\\$\\s\\,]+?)\\s*\\)/;\n\n\t\t\t\t\t\tvar argument = ( ( initialize.toString( )\n\t\t\t\t\t\t\t.match( pattern ) || [ ] )[ 1 ] || \"\" )\n\t\t\t\t\t\t\t.split( /\\,\\s*/ )\n\t\t\t\t\t\t\t.map( ( variable ) => { return variable.trim( ); } )\n\t\t\t\t\t\t\t.filter( ( variable ) => { return !!variable; } );\n\n\t\t\t\t\t\tif( argument.length > 0 ){\n\t\t\t\t\t\t\tvariable = argument;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\tvar expression = \"function delegate( @parameter ){ return new this( @parameter ); }\"\n\t\t\t\t\t\t.replace( /@parameter/g,\n\t\t\t\t\t\t\tparameter.map( function onEachParameter( item, index ){\n\t\t\t\t\t\t\t\treturn variable[ index ] || \"abcdefghijklmnopqrstuvwxyz\"[ index ];\n\t\t\t\t\t\t\t} ).join( \",\" ) );\n\n\t\t\t\t\texpression = template.replace( \"@expression\", expression );\n\n\t\t\t\t\treturn eval( expression ).apply( {{{ name }}}, parameter );\n\n\t\t\t\t}else{\n\t\t\t\t\tvar expression = \"function delegate( ){ return new this( ); }\";\n\n\t\t\t\t\texpression = template.replace( \"@expression\", expression );\n\n\t\t\t\t\treturn eval( expression ).call( {{{ name }}} );\n\t\t\t\t}\n\n\t\t\t}catch( error ){\n\t\t\t\tthrow new Error( \"error creating instance of {{{ name }}}, \" + error.stack );\n\t\t\t}\n\t\t};\n\t";































































};

module.exports = template;

//# sourceMappingURL=template.js.map