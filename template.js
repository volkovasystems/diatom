"use strict";

var template = function template() {
	return "\n\t\tfunction {{{ name }}}( {{{ parameter }}} ){\n\t\t\tvar parameter = Array.from( arguments );\n\n\t\t\tvar template = \"( function evaluate( ){ var result = undefined; @body return result; } ).bind( @bind )( )\"\n\t\t\t\t.replace( \"@bind\", \"( typeof global != 'undefined' )? global : ( typeof window != 'undefined' )? window : this\" )\n\t\t\t\t.replace( \"@body\", \"try{ result = ( @expression ); }catch( error ){ @error }\" )\n\t\t\t\t.replace( \"@error\", \"throw new Error( 'error executing expression, ' + error );\" );\n\n\t\t\tif( this instanceof {{{ name }}} && parameter.length ){\n\t\t\t\tif( typeof this.initialize == \"function\" ){\n\t\t\t\t\tthis.initialize.apply( this, parameter );\n\t\t\t\t}\n\n\t\t\t\treturn this;\n\n\t\t\t}else if( this instanceof {{{ name }}} && !parameter.length ){\n\t\t\t\tif( typeof this.initialize == \"function\" ){\n\t\t\t\t\tthis.initialize( );\n\t\t\t\t}\n\n\t\t\t\treturn this;\n\n\t\t\t}else if( !( this instanceof {{{ name }}} ) && parameter.length ){\n\t\t\t\tvar variable = \"{{{ parameter }}}\".split( \",\" );\n\t\t\t\tvar initialize = {{{ name }}}.prototype.initialize;\n\t\t\t\tif( typeof initialize == \"function\" ){\n\t\t\t\t\tvar pattern = /^function\\s+[a-zA-Z0-9\\_\\$]+\\s*\\(\\s*(\\s*[a-zA-Z0-9\\_\\$\\s\\,]+?)\\s*\\)/;\n\n\t\t\t\t\tvariable = ( ( initialize.toString( )\n\t\t\t\t\t\t.match( pattern ) || [ ] )[ 1 ] || \"\" )\n\t\t\t\t\t\t.split( /\\,\\s*/ );\n\t\t\t\t}\n\n\t\t\t\tvar expression = \"function delegate( @parameter ){ return new this( @parameter ); }\"\n\t\t\t\t\t.replace( /@parameter/g,\n\t\t\t\t\t\tparameter.map( function onEachParameter( item, index ){\n\t\t\t\t\t\t\treturn variable[ index ] || \"abcdefghijklmnopqrstuvwxyz\"[ index ];\n\t\t\t\t\t\t} ).join( \",\" ) );\n\n\t\t\t\texpression = template.replace( \"@expression\", expression );\n\n\t\t\t\treturn eval( expression ).apply( {{{ name }}}, parameter );\n\n\t\t\t}else{\n\t\t\t\tvar expression = \"function delegate( ){ return new this( ); }\";\n\n\t\t\t\texpression = template.replace( \"@expression\", expression );\n\n\t\t\t\treturn eval( expression ).call( {{{ name }}} );\n\t\t\t}\n\t\t};\n\t";
};

module.exports = template;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlbXBsYXRlLm1vZHVsZS5qcyJdLCJuYW1lcyI6WyJ0ZW1wbGF0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLElBQU1BLFdBQVcsU0FBU0EsUUFBVCxHQUFvQjtBQUNwQztBQXFEQSxDQXRERDs7QUF3REFDLE9BQU9DLE9BQVAsR0FBaUJGLFFBQWpCIiwiZmlsZSI6InRlbXBsYXRlLm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGZ1bmN0aW9uIHRlbXBsYXRlKCApe1xuXHRyZXR1cm4gYFxuXHRcdGZ1bmN0aW9uIHt7eyBuYW1lIH19fSgge3t7IHBhcmFtZXRlciB9fX0gKXtcblx0XHRcdHZhciBwYXJhbWV0ZXIgPSBBcnJheS5mcm9tKCBhcmd1bWVudHMgKTtcblxuXHRcdFx0dmFyIHRlbXBsYXRlID0gXCIoIGZ1bmN0aW9uIGV2YWx1YXRlKCApeyB2YXIgcmVzdWx0ID0gdW5kZWZpbmVkOyBAYm9keSByZXR1cm4gcmVzdWx0OyB9ICkuYmluZCggQGJpbmQgKSggKVwiXG5cdFx0XHRcdC5yZXBsYWNlKCBcIkBiaW5kXCIsIFwiKCB0eXBlb2YgZ2xvYmFsICE9ICd1bmRlZmluZWQnICk/IGdsb2JhbCA6ICggdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyApPyB3aW5kb3cgOiB0aGlzXCIgKVxuXHRcdFx0XHQucmVwbGFjZSggXCJAYm9keVwiLCBcInRyeXsgcmVzdWx0ID0gKCBAZXhwcmVzc2lvbiApOyB9Y2F0Y2goIGVycm9yICl7IEBlcnJvciB9XCIgKVxuXHRcdFx0XHQucmVwbGFjZSggXCJAZXJyb3JcIiwgXCJ0aHJvdyBuZXcgRXJyb3IoICdlcnJvciBleGVjdXRpbmcgZXhwcmVzc2lvbiwgJyArIGVycm9yICk7XCIgKTtcblxuXHRcdFx0aWYoIHRoaXMgaW5zdGFuY2VvZiB7e3sgbmFtZSB9fX0gJiYgcGFyYW1ldGVyLmxlbmd0aCApe1xuXHRcdFx0XHRpZiggdHlwZW9mIHRoaXMuaW5pdGlhbGl6ZSA9PSBcImZ1bmN0aW9uXCIgKXtcblx0XHRcdFx0XHR0aGlzLmluaXRpYWxpemUuYXBwbHkoIHRoaXMsIHBhcmFtZXRlciApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRcdH1lbHNlIGlmKCB0aGlzIGluc3RhbmNlb2Yge3t7IG5hbWUgfX19ICYmICFwYXJhbWV0ZXIubGVuZ3RoICl7XG5cdFx0XHRcdGlmKCB0eXBlb2YgdGhpcy5pbml0aWFsaXplID09IFwiZnVuY3Rpb25cIiApe1xuXHRcdFx0XHRcdHRoaXMuaW5pdGlhbGl6ZSggKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0XHR9ZWxzZSBpZiggISggdGhpcyBpbnN0YW5jZW9mIHt7eyBuYW1lIH19fSApICYmIHBhcmFtZXRlci5sZW5ndGggKXtcblx0XHRcdFx0dmFyIHZhcmlhYmxlID0gXCJ7e3sgcGFyYW1ldGVyIH19fVwiLnNwbGl0KCBcIixcIiApO1xuXHRcdFx0XHR2YXIgaW5pdGlhbGl6ZSA9IHt7eyBuYW1lIH19fS5wcm90b3R5cGUuaW5pdGlhbGl6ZTtcblx0XHRcdFx0aWYoIHR5cGVvZiBpbml0aWFsaXplID09IFwiZnVuY3Rpb25cIiApe1xuXHRcdFx0XHRcdHZhciBwYXR0ZXJuID0gL15mdW5jdGlvblxcXFxzK1thLXpBLVowLTlcXFxcX1xcXFwkXStcXFxccypcXFxcKFxcXFxzKihcXFxccypbYS16QS1aMC05XFxcXF9cXFxcJFxcXFxzXFxcXCxdKz8pXFxcXHMqXFxcXCkvO1xuXG5cdFx0XHRcdFx0dmFyaWFibGUgPSAoICggaW5pdGlhbGl6ZS50b1N0cmluZyggKVxuXHRcdFx0XHRcdFx0Lm1hdGNoKCBwYXR0ZXJuICkgfHwgWyBdIClbIDEgXSB8fCBcIlwiIClcblx0XHRcdFx0XHRcdC5zcGxpdCggL1xcXFwsXFxcXHMqLyApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dmFyIGV4cHJlc3Npb24gPSBcImZ1bmN0aW9uIGRlbGVnYXRlKCBAcGFyYW1ldGVyICl7IHJldHVybiBuZXcgdGhpcyggQHBhcmFtZXRlciApOyB9XCJcblx0XHRcdFx0XHQucmVwbGFjZSggL1xcQHBhcmFtZXRlci9nLFxuXHRcdFx0XHRcdFx0cGFyYW1ldGVyLm1hcCggZnVuY3Rpb24gb25FYWNoUGFyYW1ldGVyKCBpdGVtLCBpbmRleCApe1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdmFyaWFibGVbIGluZGV4IF0gfHwgXCJhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5elwiWyBpbmRleCBdO1xuXHRcdFx0XHRcdFx0fSApLmpvaW4oIFwiLFwiICkgKTtcblxuXHRcdFx0XHRleHByZXNzaW9uID0gdGVtcGxhdGUucmVwbGFjZSggXCJAZXhwcmVzc2lvblwiLCBleHByZXNzaW9uICk7XG5cblx0XHRcdFx0cmV0dXJuIGV2YWwoIGV4cHJlc3Npb24gKS5hcHBseSgge3t7IG5hbWUgfX19LCBwYXJhbWV0ZXIgKTtcblxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHZhciBleHByZXNzaW9uID0gXCJmdW5jdGlvbiBkZWxlZ2F0ZSggKXsgcmV0dXJuIG5ldyB0aGlzKCApOyB9XCI7XG5cblx0XHRcdFx0ZXhwcmVzc2lvbiA9IHRlbXBsYXRlLnJlcGxhY2UoIFwiQGV4cHJlc3Npb25cIiwgZXhwcmVzc2lvbiApO1xuXG5cdFx0XHRcdHJldHVybiBldmFsKCBleHByZXNzaW9uICkuY2FsbCgge3t7IG5hbWUgfX19ICk7XG5cdFx0XHR9XG5cdFx0fTtcblx0YDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdGVtcGxhdGU7XG4iXX0=
