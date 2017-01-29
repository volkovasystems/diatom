"use strict";

/*;
	@module-license:
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
	@end-module-license

	@module-configuration:
		{
			"package": "diatom",
			"path": "diatom/diatom.js",
			"file": "diatom.js",
			"module": "diatom",
			"author": "Richeve S. Bebedor",
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
			],
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

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var falzy = require("falzy");
var komento = require("komento");
var llamalize = require("llamalize");
var protype = require("protype");

//: @support-module:
//: @reference: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from
_from2.default || (Array.from = function () {
	var r = Object.prototype.toString,
	    n = function n(_n) {
		return "function" == typeof _n || "[object Function]" === r.call(_n);
	},
	    t = function t(r) {
		var n = Number(r);
		return isNaN(n) ? 0 : 0 !== n && isFinite(n) ? (n > 0 ? 1 : -1) * Math.floor(Math.abs(n)) : n;
	},
	    e = Math.pow(2, 53) - 1,
	    o = function o(r) {
		var n = t(r);return Math.min(Math.max(n, 0), e);
	};
	return function (r) {
		var t = this,
		    e = Object(r);
		if (null == r) throw new TypeError("Array.from requires an array-like object - not null or undefined");
		var a,
		    u = arguments.length > 1 ? arguments[1] : void 0;if ("undefined" != typeof u) {
			if (!n(u)) throw new TypeError("Array.from: when provided, the second argument must be a function");
			arguments.length > 2 && (a = arguments[2]);
		}for (var i, f = o(e.length), c = n(t) ? Object(new t(f)) : new Array(f), h = 0; f > h;) {
			i = e[h], u ? c[h] = "undefined" == typeof a ? u(i, h) : u.call(a, i, h) : c[h] = i, h += 1;
		}return c.length = f, c;
	};
}());
//: @end-support-module

var diatom = function diatom(name) {
	/*;
 	@meta-configuration:
 		{
 			"name:required": "string"
 		}
 	@end-meta-configuration
 */

	if (!protype(name, STRING) || falzy(name)) {
		throw new Error("invalid name");
	}

	if (!/^[A-Z][A-Za-z0-9]+$/.test(name)) {
		throw new Error("name is not simple");
	}

	name = llamalize(name, true);

	try {
		var blueprint = komento(function template() {
			return "\n\t\t\t\tfunction {{name}}( option, callback ){\n\t\t\t\t\tvar parameter = Array.from( arguments );\n\n\t\t\t\t\tvar template = \"( function evaluate( ){ var result = undefined; @body return result; } ).bind( @bind )( )\"\n\t\t\t\t\t\t.replace( \"@bind\", \"( typeof global != 'undefined' )? global : ( typeof window != 'undefined' )? window : this\" )\n\t\t\t\t\t\t.replace( \"@body\", \"try{ result = ( @expression ); }catch( error ){ @error }\" )\n\t\t\t\t\t\t.replace( \"@error\", \"throw new Error( 'error executing expression, ' + error );\" );\n\n\t\t\t\t\tif( this instanceof {{name}} && parameter.length ){\n\t\t\t\t\t\tif( typeof this.initialize == \"function\" ){\n\t\t\t\t\t\t\tthis.initialize.apply( this, parameter );\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\treturn this;\n\n\t\t\t\t\t}else if( this instanceof {{name}} && !parameter.length ){\n\t\t\t\t\t\tif( typeof this.initialize == \"function\" ){\n\t\t\t\t\t\t\tthis.initialize( );\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\treturn this;\n\n\t\t\t\t\t}else if( !( this instanceof {{name}} ) && parameter.length ){\n\t\t\t\t\t\tvar expression = \"function delegate( @parameter ){ return new this( @parameter ); }\"\n\t\t\t\t\t\t\t.replace( /@parameter/g,\n\t\t\t\t\t\t\t\tparameter.map( function onEachParameter( item, index ){\n\t\t\t\t\t\t\t\t\treturn \"abcdefghijklmnopqrstuvwxyz\"[ index ];\n\t\t\t\t\t\t\t\t} ).join( \",\" ) );\n\n\t\t\t\t\t\texpression = template.replace( \"@expression\", expression );\n\n\t\t\t\t\t\treturn eval( expression ).apply( {{name}}, parameter );\n\n\t\t\t\t\t}else{\n\t\t\t\t\t\tvar expression = \"function delegate( ){ return new this( ); }\";\n\n\t\t\t\t\t\texpression = template.replace( \"@expression\", expression );\n\n\t\t\t\t\t\treturn eval( expression ).call( {{name}} );\n\t\t\t\t\t}\n\t\t\t\t};\n\t\t\t";
		}, { "name": name });

		return new Function("return " + blueprint)();
	} catch (error) {
		throw new Error("function not created properly, " + error);
	}
};

module.exports = diatom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpYXRvbS5qcyJdLCJuYW1lcyI6WyJmYWx6eSIsInJlcXVpcmUiLCJrb21lbnRvIiwibGxhbWFsaXplIiwicHJvdHlwZSIsIkFycmF5IiwiZnJvbSIsInIiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsIm4iLCJjYWxsIiwidCIsIk51bWJlciIsImlzTmFOIiwiaXNGaW5pdGUiLCJNYXRoIiwiZmxvb3IiLCJhYnMiLCJlIiwicG93IiwibyIsIm1pbiIsIm1heCIsIlR5cGVFcnJvciIsImEiLCJ1IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiaSIsImYiLCJjIiwiaCIsImRpYXRvbSIsIm5hbWUiLCJTVFJJTkciLCJFcnJvciIsInRlc3QiLCJibHVlcHJpbnQiLCJ0ZW1wbGF0ZSIsIkZ1bmN0aW9uIiwiZXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBEQSxJQUFNQSxRQUFRQyxRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1DLFVBQVVELFFBQVMsU0FBVCxDQUFoQjtBQUNBLElBQU1FLFlBQVlGLFFBQVMsV0FBVCxDQUFsQjtBQUNBLElBQU1HLFVBQVVILFFBQVMsU0FBVCxDQUFoQjs7QUFFQTtBQUNDO0FBQ0EsbUJBQWFJLE1BQU1DLElBQU4sR0FBVyxZQUFVO0FBQUMsS0FBSUMsSUFBRUMsT0FBT0MsU0FBUCxDQUFpQkMsUUFBdkI7QUFBQSxLQUFnQ0MsSUFBRSxXQUFTQSxFQUFULEVBQVc7QUFDaEYsU0FBTSxjQUFZLE9BQU9BLEVBQW5CLElBQXNCLHdCQUFzQkosRUFBRUssSUFBRixDQUFPRCxFQUFQLENBQWxEO0FBQTRELEVBRHpCO0FBQUEsS0FDMEJFLElBQUUsU0FBRkEsQ0FBRSxDQUFTTixDQUFULEVBQVc7QUFBQyxNQUFJSSxJQUFFRyxPQUFPUCxDQUFQLENBQU47QUFDM0UsU0FB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LENBbURDLE9BQU9HLEtBQVAsRUFBYztBQUNkLFFBQU0sSUFBSUwsS0FBSixxQ0FBOENLLEtBQTlDLENBQU47QUFDQTtBQUNELENBekVEOztBQTJFQUMsT0FBT0MsT0FBUCxHQUFpQlYsTUFBakIiLCJmaWxlIjoiZGlhdG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qO1xuXHRAbW9kdWxlLWxpY2Vuc2U6XG5cdFx0VGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cdFx0QG1pdC1saWNlbnNlXG5cblx0XHRDb3B5cmlnaHQgKEBjKSAyMDE3IFJpY2hldmUgU2lvZGluYSBCZWJlZG9yXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXG5cblx0XHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRcdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcblx0XHR0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdFx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuXHRcdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5cdFx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5cdFx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuXHRcdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5cdFx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblx0XHRTT0ZUV0FSRS5cblx0QGVuZC1tb2R1bGUtbGljZW5zZVxuXG5cdEBtb2R1bGUtY29uZmlndXJhdGlvbjpcblx0XHR7XG5cdFx0XHRcInBhY2thZ2VcIjogXCJkaWF0b21cIixcblx0XHRcdFwicGF0aFwiOiBcImRpYXRvbS9kaWF0b20uanNcIixcblx0XHRcdFwiZmlsZVwiOiBcImRpYXRvbS5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJkaWF0b21cIixcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXG5cdFx0XHRcdFwiSm9obiBMZW5vbiBNYWdoYW5veSA8am9obmxlbm9ubWFnaGFub3lAZ21haWwuY29tPlwiXG5cdFx0XHRdLFxuXHRcdFx0XCJlTWFpbFwiOiBcInJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cIixcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92b2xrb3Zhc3lzdGVtcy9kaWF0b20uZ2l0XCIsXG5cdFx0XHRcInRlc3RcIjogXCJkaWF0b20tdGVzdC5qc1wiLFxuXHRcdFx0XCJnbG9iYWxcIjogdHJ1ZVxuXHRcdH1cblx0QGVuZC1tb2R1bGUtY29uZmlndXJhdGlvblxuXG5cdEBtb2R1bGUtZG9jdW1lbnRhdGlvbjpcblx0XHRDbGFzcyBibHVlcHJpbnQuXG5cdEBlbmQtbW9kdWxlLWRvY3VtZW50YXRpb25cblxuXHRAaW5jbHVkZTpcblx0XHR7XG5cdFx0XHRcImZhbHp5XCI6IFwiZmFsenlcIixcblx0XHRcdFwia29tZW50b1wiOiBcImtvbWVudG9cIixcblx0XHRcdFwibGxhbWFsaXplXCI6IFwibGxhbWFsaXplXCIsXG5cdFx0XHRcInByb3R5cGVcIjogXCJwcm90eXBlXCJcblx0XHR9XG5cdEBlbmQtaW5jbHVkZVxuKi9cblxuY29uc3QgZmFsenkgPSByZXF1aXJlKCBcImZhbHp5XCIgKTtcbmNvbnN0IGtvbWVudG8gPSByZXF1aXJlKCBcImtvbWVudG9cIiApO1xuY29uc3QgbGxhbWFsaXplID0gcmVxdWlyZSggXCJsbGFtYWxpemVcIiApO1xuY29uc3QgcHJvdHlwZSA9IHJlcXVpcmUoIFwicHJvdHlwZVwiICk7XG5cbi8vOiBAc3VwcG9ydC1tb2R1bGU6XG5cdC8vOiBAcmVmZXJlbmNlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9mcm9tXG5cdEFycmF5LmZyb218fChBcnJheS5mcm9tPWZ1bmN0aW9uKCl7dmFyIHI9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxuPWZ1bmN0aW9uKG4pe1xuXHRyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBufHxcIltvYmplY3QgRnVuY3Rpb25dXCI9PT1yLmNhbGwobil9LHQ9ZnVuY3Rpb24ocil7dmFyIG49TnVtYmVyKHIpO1xuXHRyZXR1cm4gaXNOYU4obik/MDowIT09biYmaXNGaW5pdGUobik/KG4+MD8xOi0xKSpNYXRoLmZsb29yKE1hdGguYWJzKG4pKTpufSxcblx0ZT1NYXRoLnBvdygyLDUzKS0xLG89ZnVuY3Rpb24ocil7dmFyIG49dChyKTtyZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgobiwwKSxlKX07XG5cdHJldHVybiBmdW5jdGlvbihyKXt2YXIgdD10aGlzLGU9T2JqZWN0KHIpO1xuXHRpZihudWxsPT1yKXRocm93IG5ldyBUeXBlRXJyb3IoXCJBcnJheS5mcm9tIHJlcXVpcmVzIGFuIGFycmF5LWxpa2Ugb2JqZWN0IC0gbm90IG51bGwgb3IgdW5kZWZpbmVkXCIpO1xuXHR2YXIgYSx1PWFyZ3VtZW50cy5sZW5ndGg+MT9hcmd1bWVudHNbMV06dm9pZCAwO2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiB1KXtcblx0aWYoIW4odSkpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkFycmF5LmZyb206IHdoZW4gcHJvdmlkZWQsIHRoZSBzZWNvbmQgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuXHRhcmd1bWVudHMubGVuZ3RoPjImJihhPWFyZ3VtZW50c1syXSl9Zm9yKHZhciBpLGY9byhlLmxlbmd0aCksYz1uKHQpP1xuXHRPYmplY3QobmV3IHQoZikpOm5ldyBBcnJheShmKSxoPTA7Zj5oOylpPWVbaF0sXG5cdHU/Y1toXT1cInVuZGVmaW5lZFwiPT10eXBlb2YgYT91KGksaCk6dS5jYWxsKGEsaSxoKTpjW2hdPWksaCs9MTtyZXR1cm4gYy5sZW5ndGg9ZixjfX0oKSk7XG4vLzogQGVuZC1zdXBwb3J0LW1vZHVsZVxuXG5jb25zdCBkaWF0b20gPSBmdW5jdGlvbiBkaWF0b20oIG5hbWUgKXtcblx0Lyo7XG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcblx0XHRcdHtcblx0XHRcdFx0XCJuYW1lOnJlcXVpcmVkXCI6IFwic3RyaW5nXCJcblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdGlmKCAhcHJvdHlwZSggbmFtZSwgU1RSSU5HICkgfHwgZmFsenkoIG5hbWUgKSApe1xuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIG5hbWVcIiApO1xuXHR9XG5cblx0aWYoICEoIC9eW0EtWl1bQS1aYS16MC05XSskLyApLnRlc3QoIG5hbWUgKSApe1xuXHRcdHRocm93IG5ldyBFcnJvciggXCJuYW1lIGlzIG5vdCBzaW1wbGVcIiApO1xuXHR9XG5cblx0bmFtZSA9IGxsYW1hbGl6ZSggbmFtZSwgdHJ1ZSApO1xuXG5cdHRyeXtcblx0XHRsZXQgYmx1ZXByaW50ID0ga29tZW50byggZnVuY3Rpb24gdGVtcGxhdGUoICl7XG5cdFx0XHRyZXR1cm4gYFxuXHRcdFx0XHRmdW5jdGlvbiB7e25hbWV9fSggb3B0aW9uLCBjYWxsYmFjayApe1xuXHRcdFx0XHRcdHZhciBwYXJhbWV0ZXIgPSBBcnJheS5mcm9tKCBhcmd1bWVudHMgKTtcblxuXHRcdFx0XHRcdHZhciB0ZW1wbGF0ZSA9IFwiKCBmdW5jdGlvbiBldmFsdWF0ZSggKXsgdmFyIHJlc3VsdCA9IHVuZGVmaW5lZDsgQGJvZHkgcmV0dXJuIHJlc3VsdDsgfSApLmJpbmQoIEBiaW5kICkoIClcIlxuXHRcdFx0XHRcdFx0LnJlcGxhY2UoIFwiQGJpbmRcIiwgXCIoIHR5cGVvZiBnbG9iYWwgIT0gJ3VuZGVmaW5lZCcgKT8gZ2xvYmFsIDogKCB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICk/IHdpbmRvdyA6IHRoaXNcIiApXG5cdFx0XHRcdFx0XHQucmVwbGFjZSggXCJAYm9keVwiLCBcInRyeXsgcmVzdWx0ID0gKCBAZXhwcmVzc2lvbiApOyB9Y2F0Y2goIGVycm9yICl7IEBlcnJvciB9XCIgKVxuXHRcdFx0XHRcdFx0LnJlcGxhY2UoIFwiQGVycm9yXCIsIFwidGhyb3cgbmV3IEVycm9yKCAnZXJyb3IgZXhlY3V0aW5nIGV4cHJlc3Npb24sICcgKyBlcnJvciApO1wiICk7XG5cblx0XHRcdFx0XHRpZiggdGhpcyBpbnN0YW5jZW9mIHt7bmFtZX19ICYmIHBhcmFtZXRlci5sZW5ndGggKXtcblx0XHRcdFx0XHRcdGlmKCB0eXBlb2YgdGhpcy5pbml0aWFsaXplID09IFwiZnVuY3Rpb25cIiApe1xuXHRcdFx0XHRcdFx0XHR0aGlzLmluaXRpYWxpemUuYXBwbHkoIHRoaXMsIHBhcmFtZXRlciApO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0XHRcdH1lbHNlIGlmKCB0aGlzIGluc3RhbmNlb2Yge3tuYW1lfX0gJiYgIXBhcmFtZXRlci5sZW5ndGggKXtcblx0XHRcdFx0XHRcdGlmKCB0eXBlb2YgdGhpcy5pbml0aWFsaXplID09IFwiZnVuY3Rpb25cIiApe1xuXHRcdFx0XHRcdFx0XHR0aGlzLmluaXRpYWxpemUoICk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiB0aGlzO1xuXG5cdFx0XHRcdFx0fWVsc2UgaWYoICEoIHRoaXMgaW5zdGFuY2VvZiB7e25hbWV9fSApICYmIHBhcmFtZXRlci5sZW5ndGggKXtcblx0XHRcdFx0XHRcdHZhciBleHByZXNzaW9uID0gXCJmdW5jdGlvbiBkZWxlZ2F0ZSggQHBhcmFtZXRlciApeyByZXR1cm4gbmV3IHRoaXMoIEBwYXJhbWV0ZXIgKTsgfVwiXG5cdFx0XHRcdFx0XHRcdC5yZXBsYWNlKCAvXFxAcGFyYW1ldGVyL2csXG5cdFx0XHRcdFx0XHRcdFx0cGFyYW1ldGVyLm1hcCggZnVuY3Rpb24gb25FYWNoUGFyYW1ldGVyKCBpdGVtLCBpbmRleCApe1xuXHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIFwiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIlsgaW5kZXggXTtcblx0XHRcdFx0XHRcdFx0XHR9ICkuam9pbiggXCIsXCIgKSApO1xuXG5cdFx0XHRcdFx0XHRleHByZXNzaW9uID0gdGVtcGxhdGUucmVwbGFjZSggXCJAZXhwcmVzc2lvblwiLCBleHByZXNzaW9uICk7XG5cblx0XHRcdFx0XHRcdHJldHVybiBldmFsKCBleHByZXNzaW9uICkuYXBwbHkoIHt7bmFtZX19LCBwYXJhbWV0ZXIgKTtcblxuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0dmFyIGV4cHJlc3Npb24gPSBcImZ1bmN0aW9uIGRlbGVnYXRlKCApeyByZXR1cm4gbmV3IHRoaXMoICk7IH1cIjtcblxuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IHRlbXBsYXRlLnJlcGxhY2UoIFwiQGV4cHJlc3Npb25cIiwgZXhwcmVzc2lvbiApO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gZXZhbCggZXhwcmVzc2lvbiApLmNhbGwoIHt7bmFtZX19ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0YDtcblx0XHR9LFxuXG5cdFx0eyBcIm5hbWVcIjogbmFtZSB9ICk7XG5cblx0XHRyZXR1cm4gbmV3IEZ1bmN0aW9uKCBgcmV0dXJuICR7IGJsdWVwcmludCB9YCApKCApO1xuXG5cdH1jYXRjaCggZXJyb3IgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIGBmdW5jdGlvbiBub3QgY3JlYXRlZCBwcm9wZXJseSwgJHsgZXJyb3IgfWAgKTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkaWF0b207XG4iXX0=
