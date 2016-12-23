"use strict";

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpYXRvbS5qcyJdLCJuYW1lcyI6WyJmYWx6eSIsInJlcXVpcmUiLCJrb21lbnRvIiwibGxhbWFsaXplIiwicHJvdHlwZSIsIkFycmF5IiwiZnJvbSIsInIiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsIm4iLCJjYWxsIiwidCIsIk51bWJlciIsImlzTmFOIiwiaXNGaW5pdGUiLCJNYXRoIiwiZmxvb3IiLCJhYnMiLCJlIiwicG93IiwibyIsIm1pbiIsIm1heCIsIlR5cGVFcnJvciIsImEiLCJ1IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiaSIsImYiLCJjIiwiaCIsImRpYXRvbSIsIm5hbWUiLCJTVFJJTkciLCJFcnJvciIsInRlc3QiLCJibHVlcHJpbnQiLCJ0ZW1wbGF0ZSIsIkZ1bmN0aW9uIiwiZXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMERBLElBQU1BLFFBQVFDLFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTUMsVUFBVUQsUUFBUyxTQUFULENBQWhCO0FBQ0EsSUFBTUUsWUFBWUYsUUFBUyxXQUFULENBQWxCO0FBQ0EsSUFBTUcsVUFBVUgsUUFBUyxTQUFULENBQWhCOztBQUVBO0FBQ0M7QUFDQSxtQkFBYUksTUFBTUMsSUFBTixHQUFXLFlBQVU7QUFBQyxLQUFJQyxJQUFFQyxPQUFPQyxTQUFQLENBQWlCQyxRQUF2QjtBQUFBLEtBQWdDQyxJQUFFLFdBQVNBLEVBQVQsRUFBVztBQUNoRixTQUFNLGNBQVksT0FBT0EsRUFBbkIsSUFBc0Isd0JBQXNCSixFQUFFSyxJQUFGLENBQU9ELEVBQVAsQ0FBbEQ7QUFBNEQsRUFEekI7QUFBQSxLQUMwQkUsSUFBRSxTQUFGQSxDQUFFLENBQVNOLENBQVQsRUFBVztBQUFDLE1BQUlJLElBQUVHLE9BQU9QLENBQVAsQ0FBTjtBQUMzRSxTQUFPUSxN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REMsT0FBT0csS0FBUCxFQUFjO0FBQ2QsUUFBTSxJQUFJTCxLQUFKLHFDQUE4Q0ssS0FBOUMsQ0FBTjtBQUNBO0FBQ0QsQ0F6RUQ7O0FBMkVBQyxPQUFPQyxPQUFQLEdBQWlCVixNQUFqQiIsImZpbGUiOiJkaWF0b20uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKjtcblx0QG1vZHVsZS1saWNlbnNlOlxuXHRcdFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXHRcdEBtaXQtbGljZW5zZVxuXG5cdFx0Q29weXJpZ2h0IChAYykgMjAxNiBSaWNoZXZlIFNpb2RpbmEgQmViZWRvclxuXHRcdEBlbWFpbDogcmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVxuXG5cdFx0UGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuXHRcdG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcblx0XHRpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG5cdFx0dG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuXHRcdGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuXHRcdGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblx0XHRUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcblx0XHRjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5cdFx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuXHRcdElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuXHRcdEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuXHRcdEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcblx0XHRMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuXHRcdE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5cdFx0U09GVFdBUkUuXG5cdEBlbmQtbW9kdWxlLWxpY2Vuc2VcblxuXHRAbW9kdWxlLWNvbmZpZ3VyYXRpb246XG5cdFx0e1xuXHRcdFx0XCJwYWNrYWdlXCI6IFwiZGlhdG9tXCIsXG5cdFx0XHRcInBhdGhcIjogXCJkaWF0b20vZGlhdG9tLmpzXCIsXG5cdFx0XHRcImZpbGVcIjogXCJkaWF0b20uanNcIixcblx0XHRcdFwibW9kdWxlXCI6IFwiZGlhdG9tXCIsXG5cdFx0XHRcImF1dGhvclwiOiBcIlJpY2hldmUgUy4gQmViZWRvclwiLFxuXHRcdFx0XCJjb250cmlidXRvcnNcIjogW1xuXHRcdFx0XHRcIkpvaG4gTGVub24gTWFnaGFub3kgPGpvaG5sZW5vbm1hZ2hhbm95QGdtYWlsLmNvbT5cIlxuXHRcdFx0XSxcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXG5cdFx0XHRcInJlcG9zaXRvcnlcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdm9sa292YXN5c3RlbXMvZGlhdG9tLmdpdFwiLFxuXHRcdFx0XCJ0ZXN0XCI6IFwiZGlhdG9tLXRlc3QuanNcIixcblx0XHRcdFwiZ2xvYmFsXCI6IHRydWVcblx0XHR9XG5cdEBlbmQtbW9kdWxlLWNvbmZpZ3VyYXRpb25cblxuXHRAbW9kdWxlLWRvY3VtZW50YXRpb246XG5cdFx0Q2xhc3MgYmx1ZXByaW50LlxuXHRAZW5kLW1vZHVsZS1kb2N1bWVudGF0aW9uXG5cblx0QGluY2x1ZGU6XG5cdFx0e1xuXHRcdFx0XCJmYWx6eVwiOiBcImZhbHp5XCIsXG5cdFx0XHRcImtvbWVudG9cIjogXCJrb21lbnRvXCIsXG5cdFx0XHRcImxsYW1hbGl6ZVwiOiBcImxsYW1hbGl6ZVwiLFxuXHRcdFx0XCJwcm90eXBlXCI6IFwicHJvdHlwZVwiXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbmNvbnN0IGZhbHp5ID0gcmVxdWlyZSggXCJmYWx6eVwiICk7XG5jb25zdCBrb21lbnRvID0gcmVxdWlyZSggXCJrb21lbnRvXCIgKTtcbmNvbnN0IGxsYW1hbGl6ZSA9IHJlcXVpcmUoIFwibGxhbWFsaXplXCIgKTtcbmNvbnN0IHByb3R5cGUgPSByZXF1aXJlKCBcInByb3R5cGVcIiApO1xuXG4vLzogQHN1cHBvcnQtbW9kdWxlOlxuXHQvLzogQHJlZmVyZW5jZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZnJvbVxuXHRBcnJheS5mcm9tfHwoQXJyYXkuZnJvbT1mdW5jdGlvbigpe3ZhciByPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcsbj1mdW5jdGlvbihuKXtcblx0cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbnx8XCJbb2JqZWN0IEZ1bmN0aW9uXVwiPT09ci5jYWxsKG4pfSx0PWZ1bmN0aW9uKHIpe3ZhciBuPU51bWJlcihyKTtcblx0cmV0dXJuIGlzTmFOKG4pPzA6MCE9PW4mJmlzRmluaXRlKG4pPyhuPjA/MTotMSkqTWF0aC5mbG9vcihNYXRoLmFicyhuKSk6bn0sXG5cdGU9TWF0aC5wb3coMiw1MyktMSxvPWZ1bmN0aW9uKHIpe3ZhciBuPXQocik7cmV0dXJuIE1hdGgubWluKE1hdGgubWF4KG4sMCksZSl9O1xuXHRyZXR1cm4gZnVuY3Rpb24ocil7dmFyIHQ9dGhpcyxlPU9iamVjdChyKTtcblx0aWYobnVsbD09cil0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJyYXkuZnJvbSByZXF1aXJlcyBhbiBhcnJheS1saWtlIG9iamVjdCAtIG5vdCBudWxsIG9yIHVuZGVmaW5lZFwiKTtcblx0dmFyIGEsdT1hcmd1bWVudHMubGVuZ3RoPjE/YXJndW1lbnRzWzFdOnZvaWQgMDtpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgdSl7XG5cdGlmKCFuKHUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJBcnJheS5mcm9tOiB3aGVuIHByb3ZpZGVkLCB0aGUgc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvblwiKTtcblx0YXJndW1lbnRzLmxlbmd0aD4yJiYoYT1hcmd1bWVudHNbMl0pfWZvcih2YXIgaSxmPW8oZS5sZW5ndGgpLGM9bih0KT9cblx0T2JqZWN0KG5ldyB0KGYpKTpuZXcgQXJyYXkoZiksaD0wO2Y+aDspaT1lW2hdLFxuXHR1P2NbaF09XCJ1bmRlZmluZWRcIj09dHlwZW9mIGE/dShpLGgpOnUuY2FsbChhLGksaCk6Y1toXT1pLGgrPTE7cmV0dXJuIGMubGVuZ3RoPWYsY319KCkpO1xuLy86IEBlbmQtc3VwcG9ydC1tb2R1bGVcblxuY29uc3QgZGlhdG9tID0gZnVuY3Rpb24gZGlhdG9tKCBuYW1lICl7XG5cdC8qO1xuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XG5cdFx0XHR7XG5cdFx0XHRcdFwibmFtZTpyZXF1aXJlZFwiOiBcInN0cmluZ1wiXG5cdFx0XHR9XG5cdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cblx0Ki9cblxuXHRpZiggIXByb3R5cGUoIG5hbWUsIFNUUklORyApIHx8IGZhbHp5KCBuYW1lICkgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBuYW1lXCIgKTtcblx0fVxuXG5cdGlmKCAhKCAvXltBLVpdW0EtWmEtejAtOV0rJC8gKS50ZXN0KCBuYW1lICkgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwibmFtZSBpcyBub3Qgc2ltcGxlXCIgKTtcblx0fVxuXG5cdG5hbWUgPSBsbGFtYWxpemUoIG5hbWUsIHRydWUgKTtcblxuXHR0cnl7XG5cdFx0bGV0IGJsdWVwcmludCA9IGtvbWVudG8oIGZ1bmN0aW9uIHRlbXBsYXRlKCApe1xuXHRcdFx0cmV0dXJuIGBcblx0XHRcdFx0ZnVuY3Rpb24ge3tuYW1lfX0oIG9wdGlvbiwgY2FsbGJhY2sgKXtcblx0XHRcdFx0XHR2YXIgcGFyYW1ldGVyID0gQXJyYXkuZnJvbSggYXJndW1lbnRzICk7XG5cblx0XHRcdFx0XHR2YXIgdGVtcGxhdGUgPSBcIiggZnVuY3Rpb24gZXZhbHVhdGUoICl7IHZhciByZXN1bHQgPSB1bmRlZmluZWQ7IEBib2R5IHJldHVybiByZXN1bHQ7IH0gKS5iaW5kKCBAYmluZCApKCApXCJcblx0XHRcdFx0XHRcdC5yZXBsYWNlKCBcIkBiaW5kXCIsIFwiKCB0eXBlb2YgZ2xvYmFsICE9ICd1bmRlZmluZWQnICk/IGdsb2JhbCA6ICggdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyApPyB3aW5kb3cgOiB0aGlzXCIgKVxuXHRcdFx0XHRcdFx0LnJlcGxhY2UoIFwiQGJvZHlcIiwgXCJ0cnl7IHJlc3VsdCA9ICggQGV4cHJlc3Npb24gKTsgfWNhdGNoKCBlcnJvciApeyBAZXJyb3IgfVwiIClcblx0XHRcdFx0XHRcdC5yZXBsYWNlKCBcIkBlcnJvclwiLCBcInRocm93IG5ldyBFcnJvciggJ2Vycm9yIGV4ZWN1dGluZyBleHByZXNzaW9uLCAnICsgZXJyb3IgKTtcIiApO1xuXG5cdFx0XHRcdFx0aWYoIHRoaXMgaW5zdGFuY2VvZiB7e25hbWV9fSAmJiBwYXJhbWV0ZXIubGVuZ3RoICl7XG5cdFx0XHRcdFx0XHRpZiggdHlwZW9mIHRoaXMuaW5pdGlhbGl6ZSA9PSBcImZ1bmN0aW9uXCIgKXtcblx0XHRcdFx0XHRcdFx0dGhpcy5pbml0aWFsaXplLmFwcGx5KCB0aGlzLCBwYXJhbWV0ZXIgKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXM7XG5cblx0XHRcdFx0XHR9ZWxzZSBpZiggdGhpcyBpbnN0YW5jZW9mIHt7bmFtZX19ICYmICFwYXJhbWV0ZXIubGVuZ3RoICl7XG5cdFx0XHRcdFx0XHRpZiggdHlwZW9mIHRoaXMuaW5pdGlhbGl6ZSA9PSBcImZ1bmN0aW9uXCIgKXtcblx0XHRcdFx0XHRcdFx0dGhpcy5pbml0aWFsaXplKCApO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcztcblxuXHRcdFx0XHRcdH1lbHNlIGlmKCAhKCB0aGlzIGluc3RhbmNlb2Yge3tuYW1lfX0gKSAmJiBwYXJhbWV0ZXIubGVuZ3RoICl7XG5cdFx0XHRcdFx0XHR2YXIgZXhwcmVzc2lvbiA9IFwiZnVuY3Rpb24gZGVsZWdhdGUoIEBwYXJhbWV0ZXIgKXsgcmV0dXJuIG5ldyB0aGlzKCBAcGFyYW1ldGVyICk7IH1cIlxuXHRcdFx0XHRcdFx0XHQucmVwbGFjZSggL1xcQHBhcmFtZXRlci9nLFxuXHRcdFx0XHRcdFx0XHRcdHBhcmFtZXRlci5tYXAoIGZ1bmN0aW9uIG9uRWFjaFBhcmFtZXRlciggaXRlbSwgaW5kZXggKXtcblx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBcImFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCJbIGluZGV4IF07XG5cdFx0XHRcdFx0XHRcdFx0fSApLmpvaW4oIFwiLFwiICkgKTtcblxuXHRcdFx0XHRcdFx0ZXhwcmVzc2lvbiA9IHRlbXBsYXRlLnJlcGxhY2UoIFwiQGV4cHJlc3Npb25cIiwgZXhwcmVzc2lvbiApO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gZXZhbCggZXhwcmVzc2lvbiApLmFwcGx5KCB7e25hbWV9fSwgcGFyYW1ldGVyICk7XG5cblx0XHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRcdHZhciBleHByZXNzaW9uID0gXCJmdW5jdGlvbiBkZWxlZ2F0ZSggKXsgcmV0dXJuIG5ldyB0aGlzKCApOyB9XCI7XG5cblx0XHRcdFx0XHRcdGV4cHJlc3Npb24gPSB0ZW1wbGF0ZS5yZXBsYWNlKCBcIkBleHByZXNzaW9uXCIsIGV4cHJlc3Npb24gKTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIGV2YWwoIGV4cHJlc3Npb24gKS5jYWxsKCB7e25hbWV9fSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdGA7XG5cdFx0fSxcblxuXHRcdHsgXCJuYW1lXCI6IG5hbWUgfSApO1xuXG5cdFx0cmV0dXJuIG5ldyBGdW5jdGlvbiggYHJldHVybiAkeyBibHVlcHJpbnQgfWAgKSggKTtcblxuXHR9Y2F0Y2goIGVycm9yICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBgZnVuY3Rpb24gbm90IGNyZWF0ZWQgcHJvcGVybHksICR7IGVycm9yIH1gICk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGlhdG9tO1xuIl19
