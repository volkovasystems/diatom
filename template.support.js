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
              			"contributors": [
              				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>",
              				"Vinse Vinalon <vinsevinalon@gmail.com>"
              			],
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
	return "\n\t\tfunction {{{ name }}}( {{{ parameter }}} ){\n\t\t\ttry{\n\t\t\t\tvar parameter = Array.from( arguments );\n\n\t\t\t\tvar template = \"( function evaluate( ){ var result = undefined; @body return result; } ).bind( @bind )( )\"\n\t\t\t\t\t.replace( \"@bind\", \"( typeof global != 'undefined' )? global : ( typeof window != 'undefined' )? window : this\" )\n\t\t\t\t\t.replace( \"@body\", \"try{ result = ( @expression ); }catch( error ){ @error }\" )\n\t\t\t\t\t.replace( \"@error\", \"throw new Error( 'error executing expression, ' + error.stack );\" );\n\n\t\t\t\tif( this instanceof {{{ name }}} && parameter.length ){\n\t\t\t\t\tif( typeof this.initialize == \"function\" ){\n\t\t\t\t\t\tthis.initialize.apply( this, parameter );\n\t\t\t\t\t}\n\n\t\t\t\t\treturn this;\n\n\t\t\t\t}else if( this instanceof {{{ name }}} && !parameter.length ){\n\t\t\t\t\tif( typeof this.initialize == \"function\" ){\n\t\t\t\t\t\tthis.initialize( );\n\t\t\t\t\t}\n\n\t\t\t\t\treturn this;\n\n\t\t\t\t}else if( !( this instanceof {{{ name }}} ) && parameter.length ){\n\t\t\t\t\tvar variable = \"{{{ parameter }}}\".split( \",\" );\n\t\t\t\t\tvar initialize = {{{ name }}}.prototype.initialize;\n\t\t\t\t\tif( typeof initialize == \"function\" ){\n\t\t\t\t\t\tvar pattern = /^function\\s+[a-zA-Z0-9\\_\\$]+\\s*\\(\\s*([a-zA-Z0-9\\_\\$\\s\\,]+?)\\s*\\)/;\n\n\t\t\t\t\t\tvar argument = ( ( initialize.toString( )\n\t\t\t\t\t\t\t.match( pattern ) || [ ] )[ 1 ] || \"\" )\n\t\t\t\t\t\t\t.split( /\\,\\s*/ )\n\t\t\t\t\t\t\t.map( function onEachParameter( variable ){ return variable.trim( ); } )\n\t\t\t\t\t\t\t.filter( function onEachParameter( variable ){ return !!variable; } );\n\n\t\t\t\t\t\tif( argument.length > 0 ){\n\t\t\t\t\t\t\tvariable = argument;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\tvar expression = \"function delegate( @parameter ){ return new this( @parameter ); }\"\n\t\t\t\t\t\t.replace( /@parameter/g,\n\t\t\t\t\t\t\tparameter.map( function onEachParameter( item, index ){\n\t\t\t\t\t\t\t\treturn variable[ index ] || \"abcdefghijklmnopqrstuvwxyz\"[ index ];\n\t\t\t\t\t\t\t} ).join( \",\" ) );\n\n\t\t\t\t\texpression = template.replace( \"@expression\", expression );\n\n\t\t\t\t\treturn eval( expression ).apply( {{{ name }}}, parameter );\n\n\t\t\t\t}else{\n\t\t\t\t\tvar expression = \"function delegate( ){ return new this( ); }\";\n\n\t\t\t\t\texpression = template.replace( \"@expression\", expression );\n\n\t\t\t\t\treturn eval( expression ).call( {{{ name }}} );\n\t\t\t\t}\n\n\t\t\t}catch( error ){\n\t\t\t\tthrow new Error( \"error creating instance of {{{ name }}}, \" + error.stack );\n\t\t\t}\n\t\t};\n\t";































































};

module.exports = template;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlbXBsYXRlLnN1cHBvcnQuanMiXSwibmFtZXMiOlsidGVtcGxhdGUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNERBLElBQU1BLFdBQVcsU0FBU0EsUUFBVCxHQUFvQjtBQUNwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdFQSxDQWpFRDs7QUFtRUFDLE9BQU9DLE9BQVAsR0FBaUJGLFFBQWpCIiwiZmlsZSI6InRlbXBsYXRlLnN1cHBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qO1xyXG5cdEBzdWJtb2R1bGUtbGljZW5zZTpcclxuXHRcdFRoZSBNSVQgTGljZW5zZSAoTUlUKVxyXG5cdFx0QG1pdC1saWNlbnNlXHJcblxyXG5cdFx0Q29weXJpZ2h0IChAYykgMjAxNyBSaWNoZXZlIFNpb2RpbmEgQmViZWRvclxyXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXHJcblxyXG5cdFx0UGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG5cdFx0dG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuXHRcdEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuXHRcdE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblx0XHRTT0ZUV0FSRS5cclxuXHRAZW5kLXN1Ym1vZHVsZS1saWNlbnNlXHJcblxyXG5cdEBzdWJtb2R1bGUtY29uZmlndXJhdGlvbjpcclxuXHRcdHtcclxuXHRcdFx0XCJwYWNrYWdlXCI6IFwiZGlhdG9tXCIsXHJcblx0XHRcdFwicGF0aFwiOiBcImRpYXRvbS90ZW1wbGF0ZS5tb2R1bGUuanNcIixcclxuXHRcdFx0XCJmaWxlXCI6IFwidGVtcGxhdGUubW9kdWxlLmpzXCIsXHJcblx0XHRcdFwibW9kdWxlXCI6IFwiZGlhdG9tXCIsXHJcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXHJcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXHJcblx0XHRcdFwiY29udHJpYnV0b3JzXCI6IFtcclxuXHRcdFx0XHRcIkpvaG4gTGVub24gTWFnaGFub3kgPGpvaG5sZW5vbm1hZ2hhbm95QGdtYWlsLmNvbT5cIixcclxuXHRcdFx0XHRcIlZpbnNlIFZpbmFsb24gPHZpbnNldmluYWxvbkBnbWFpbC5jb20+XCJcclxuXHRcdFx0XSxcclxuXHRcdFx0XCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3ZvbGtvdmFzeXN0ZW1zL2RpYXRvbS5naXRcIixcclxuXHRcdFx0XCJ0ZXN0XCI6IFwiZGlhdG9tLXRlc3QuanNcIixcclxuXHRcdFx0XCJpbnRlcm5hbFwiOiB0cnVlXHJcblx0XHR9XHJcblx0QGVuZC1zdWJtb2R1bGUtY29uZmlndXJhdGlvblxyXG5cclxuXHRAc3VibW9kdWxlLWRvY3VtZW50YXRpb246XHJcblx0XHRCbHVlcHJpbnQgdGVtcGxhdGVcclxuXHRAZW5kLXN1Ym1vZHVsZS1kb2N1bWVudGF0aW9uXHJcblxyXG5cdEBub3RlOlxyXG5cdFx0RG8gbm90IGVkaXQgdGhpcyB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UncmUgZG9pbmcuXHJcblxyXG5cdFx0VGhpcyBibHVlcHJpbnQgdGVtcGxhdGUgaXMgaW50ZW5kZWQgdG8gc3VwcG9ydCBwcmV2aW91cyB2ZXJzaW9ucyBvZiBqYXZhc2NyaXB0LlxyXG5cclxuXHRcdERvIG5vdCBpbmNvcnBvcmF0ZSBhbnkgdGhpcmQgcGFydHkgb3IgYW55IGRlcGVuZGVuY3kgbW9kdWxlcyB0byB0aGlzIHRlbXBsYXRlLlxyXG5cclxuXHRcdERvIG5vdCBhZGQgbmV3ZXIgdmVyc2lvbnMgb2Ygc3ludGF4ZXMgd2l0aG91dCBjb25zdWx0aW5nIHRvIHRoZSBtYWluIGF1dGhvci5cclxuXHRAZW5kLW5vdGVcclxuKi9cclxuXHJcbmNvbnN0IHRlbXBsYXRlID0gZnVuY3Rpb24gdGVtcGxhdGUoICl7XHJcblx0cmV0dXJuIGBcclxuXHRcdGZ1bmN0aW9uIHt7eyBuYW1lIH19fSgge3t7IHBhcmFtZXRlciB9fX0gKXtcclxuXHRcdFx0dHJ5e1xyXG5cdFx0XHRcdHZhciBwYXJhbWV0ZXIgPSBBcnJheS5mcm9tKCBhcmd1bWVudHMgKTtcclxuXHJcblx0XHRcdFx0dmFyIHRlbXBsYXRlID0gXCIoIGZ1bmN0aW9uIGV2YWx1YXRlKCApeyB2YXIgcmVzdWx0ID0gdW5kZWZpbmVkOyBAYm9keSByZXR1cm4gcmVzdWx0OyB9ICkuYmluZCggQGJpbmQgKSggKVwiXHJcblx0XHRcdFx0XHQucmVwbGFjZSggXCJAYmluZFwiLCBcIiggdHlwZW9mIGdsb2JhbCAhPSAndW5kZWZpbmVkJyApPyBnbG9iYWwgOiAoIHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgKT8gd2luZG93IDogdGhpc1wiIClcclxuXHRcdFx0XHRcdC5yZXBsYWNlKCBcIkBib2R5XCIsIFwidHJ5eyByZXN1bHQgPSAoIEBleHByZXNzaW9uICk7IH1jYXRjaCggZXJyb3IgKXsgQGVycm9yIH1cIiApXHJcblx0XHRcdFx0XHQucmVwbGFjZSggXCJAZXJyb3JcIiwgXCJ0aHJvdyBuZXcgRXJyb3IoICdlcnJvciBleGVjdXRpbmcgZXhwcmVzc2lvbiwgJyArIGVycm9yLnN0YWNrICk7XCIgKTtcclxuXHJcblx0XHRcdFx0aWYoIHRoaXMgaW5zdGFuY2VvZiB7e3sgbmFtZSB9fX0gJiYgcGFyYW1ldGVyLmxlbmd0aCApe1xyXG5cdFx0XHRcdFx0aWYoIHR5cGVvZiB0aGlzLmluaXRpYWxpemUgPT0gXCJmdW5jdGlvblwiICl7XHJcblx0XHRcdFx0XHRcdHRoaXMuaW5pdGlhbGl6ZS5hcHBseSggdGhpcywgcGFyYW1ldGVyICk7XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdFx0XHRcdH1lbHNlIGlmKCB0aGlzIGluc3RhbmNlb2Yge3t7IG5hbWUgfX19ICYmICFwYXJhbWV0ZXIubGVuZ3RoICl7XHJcblx0XHRcdFx0XHRpZiggdHlwZW9mIHRoaXMuaW5pdGlhbGl6ZSA9PSBcImZ1bmN0aW9uXCIgKXtcclxuXHRcdFx0XHRcdFx0dGhpcy5pbml0aWFsaXplKCApO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHRcdFx0XHR9ZWxzZSBpZiggISggdGhpcyBpbnN0YW5jZW9mIHt7eyBuYW1lIH19fSApICYmIHBhcmFtZXRlci5sZW5ndGggKXtcclxuXHRcdFx0XHRcdHZhciB2YXJpYWJsZSA9IFwie3t7IHBhcmFtZXRlciB9fX1cIi5zcGxpdCggXCIsXCIgKTtcclxuXHRcdFx0XHRcdHZhciBpbml0aWFsaXplID0ge3t7IG5hbWUgfX19LnByb3RvdHlwZS5pbml0aWFsaXplO1xyXG5cdFx0XHRcdFx0aWYoIHR5cGVvZiBpbml0aWFsaXplID09IFwiZnVuY3Rpb25cIiApe1xyXG5cdFx0XHRcdFx0XHR2YXIgcGF0dGVybiA9IC9eZnVuY3Rpb25cXFxccytbYS16QS1aMC05XFxcXF9cXFxcJF0rXFxcXHMqXFxcXChcXFxccyooW2EtekEtWjAtOVxcXFxfXFxcXCRcXFxcc1xcXFwsXSs/KVxcXFxzKlxcXFwpLztcclxuXHJcblx0XHRcdFx0XHRcdHZhciBhcmd1bWVudCA9ICggKCBpbml0aWFsaXplLnRvU3RyaW5nKCApXHJcblx0XHRcdFx0XHRcdFx0Lm1hdGNoKCBwYXR0ZXJuICkgfHwgWyBdIClbIDEgXSB8fCBcIlwiIClcclxuXHRcdFx0XHRcdFx0XHQuc3BsaXQoIC9cXFxcLFxcXFxzKi8gKVxyXG5cdFx0XHRcdFx0XHRcdC5tYXAoIGZ1bmN0aW9uIG9uRWFjaFBhcmFtZXRlciggdmFyaWFibGUgKXsgcmV0dXJuIHZhcmlhYmxlLnRyaW0oICk7IH0gKVxyXG5cdFx0XHRcdFx0XHRcdC5maWx0ZXIoIGZ1bmN0aW9uIG9uRWFjaFBhcmFtZXRlciggdmFyaWFibGUgKXsgcmV0dXJuICEhdmFyaWFibGU7IH0gKTtcclxuXHJcblx0XHRcdFx0XHRcdGlmKCBhcmd1bWVudC5sZW5ndGggPiAwICl7XHJcblx0XHRcdFx0XHRcdFx0dmFyaWFibGUgPSBhcmd1bWVudDtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdHZhciBleHByZXNzaW9uID0gXCJmdW5jdGlvbiBkZWxlZ2F0ZSggQHBhcmFtZXRlciApeyByZXR1cm4gbmV3IHRoaXMoIEBwYXJhbWV0ZXIgKTsgfVwiXHJcblx0XHRcdFx0XHRcdC5yZXBsYWNlKCAvXFxAcGFyYW1ldGVyL2csXHJcblx0XHRcdFx0XHRcdFx0cGFyYW1ldGVyLm1hcCggZnVuY3Rpb24gb25FYWNoUGFyYW1ldGVyKCBpdGVtLCBpbmRleCApe1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHZhcmlhYmxlWyBpbmRleCBdIHx8IFwiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIlsgaW5kZXggXTtcclxuXHRcdFx0XHRcdFx0XHR9ICkuam9pbiggXCIsXCIgKSApO1xyXG5cclxuXHRcdFx0XHRcdGV4cHJlc3Npb24gPSB0ZW1wbGF0ZS5yZXBsYWNlKCBcIkBleHByZXNzaW9uXCIsIGV4cHJlc3Npb24gKTtcclxuXHJcblx0XHRcdFx0XHRyZXR1cm4gZXZhbCggZXhwcmVzc2lvbiApLmFwcGx5KCB7e3sgbmFtZSB9fX0sIHBhcmFtZXRlciApO1xyXG5cclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHZhciBleHByZXNzaW9uID0gXCJmdW5jdGlvbiBkZWxlZ2F0ZSggKXsgcmV0dXJuIG5ldyB0aGlzKCApOyB9XCI7XHJcblxyXG5cdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IHRlbXBsYXRlLnJlcGxhY2UoIFwiQGV4cHJlc3Npb25cIiwgZXhwcmVzc2lvbiApO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBldmFsKCBleHByZXNzaW9uICkuY2FsbCgge3t7IG5hbWUgfX19ICk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fWNhdGNoKCBlcnJvciApe1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvciggXCJlcnJvciBjcmVhdGluZyBpbnN0YW5jZSBvZiB7e3sgbmFtZSB9fX0sIFwiICsgZXJyb3Iuc3RhY2sgKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRgO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZTtcclxuIl19
//# sourceMappingURL=template.support.js.map
