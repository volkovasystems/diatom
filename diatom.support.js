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
			"arid": "arid",
			"budge": "budge",
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

var arid = require("arid");
var budge = require("budge");
var falzy = require("falzy");
var komento = require("komento");
var llamalize = require("llamalize");
var protype = require("protype");

var template = require("./template.js");

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

var diatom = function diatom(name, parameter) {
	/*;
 	@meta-configuration:
 		{
 			"name:required": "string",
 			"parameter": "...string"
 		}
 	@end-meta-configuration
 */

	if (!protype(name, STRING) || falzy(name)) {
		throw new Error("invalid name");
	}

	if (!/^[A-Z][A-Za-z0-9]+$/.test(name)) {
		throw new Error("name is not simple");
	}

	parameter = budge(arguments);

	if (arid(parameter)) {
		parameter = ["option", "callback"];
	}

	name = llamalize(name, true);

	try {
		var blueprint = komento(template, { "name": name, "parameter": parameter.join(",") });

		return new Function("return " + blueprint)();
	} catch (error) {
		throw new Error("function not created properly, " + error);
	}
};

module.exports = diatom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpYXRvbS5qcyJdLCJuYW1lcyI6WyJhcmlkIiwicmVxdWlyZSIsImJ1ZGdlIiwiZmFsenkiLCJrb21lbnRvIiwibGxhbWFsaXplIiwicHJvdHlwZSIsInRlbXBsYXRlIiwiQXJyYXkiLCJmcm9tIiwiciIsIk9iamVjdCIsInByb3RvdHlwZSIsInRvU3RyaW5nIiwibiIsImNhbGwiLCJ0IiwiTnVtYmVyIiwiaXNOYU4iLCJpc0Zpbml0ZSIsIk1hdGgiLCJmbG9vciIsImFicyIsImUiLCJwb3ciLCJvIiwibWluIiwibWF4IiwiVHlwZUVycm9yIiwiYSIsInUiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJpIiwiZiIsImMiLCJoIiwiZGlhdG9tIiwibmFtZSIsInBhcmFtZXRlciIsIlNUUklORyIsIkVycm9yIiwidGVzdCIsImJsdWVwcmludCIsImpvaW4iLCJGdW5jdGlvbiIsImVycm9yIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTREQSxJQUFNQSxPQUFPQyxRQUFTLE1BQVQsQ0FBYjtBQUNBLElBQU1DLFFBQVFELFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTUUsUUFBUUYsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNRyxVQUFVSCxRQUFTLFNBQVQsQ0FBaEI7QUFDQSxJQUFNSSxZQUFZSixRQUFTLFdBQVQsQ0FBbEI7QUFDQSxJQUFNSyxVQUFVTCxRQUFTLFNBQVQsQ0FBaEI7O0FBRUEsSUFBTU0sV0FBV04sUUFBUyxlQUFULENBQWpCOztBQUVBO0FBQ0M7QUFDQSxtQkFBYU8sTUFBTUMsSUFBTixHQUFXLFlBQVU7QUFBQyxLQUFJQyxJQUFFQyxPQUFPQyxTQUFQLENBQWlCQyxRQUF2QjtBQUFBLEtBQWdDQyxJQUFFLFdBQVNBLEVBQVQsRUFBVztBQUNoRixTQUFNLGNBQVksT0FBT0EsRUFBbkIsSUFBc0Is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QUFOLENBQUosRUFBdUI7QUFDdEJBLGNBQVksQ0FBRSxRQUFGLEVBQVksVUFBWixDQUFaO0FBQ0E7O0FBRURELFFBQU9qQyxVQUFXaUMsSUFBWCxFQUFpQixJQUFqQixDQUFQOztBQUVBLEtBQUc7QUFDRixNQUFJSyxZQUFZdkMsUUFBU0csUUFBVCxFQUFtQixFQUFFLFFBQVErQixJQUFWLEVBQWdCLGFBQWFDLFVBQVVLLElBQVYsQ0FBZ0IsR0FBaEIsQ0FBN0IsRUFBbkIsQ0FBaEI7O0FBRUEsU0FBTyxJQUFJQyxRQUFKLGFBQXlCRixTQUF6QixHQUFQO0FBRUEsRUFMRCxDQUtDLE9BQU9HLEtBQVAsRUFBYztBQUNkLFFBQU0sSUFBSUwsS0FBSixxQ0FBOENLLEtBQTlDLENBQU47QUFDQTtBQUNELENBbENEOztBQW9DQUMsT0FBT0MsT0FBUCxHQUFpQlgsTUFBakIiLCJmaWxlIjoiZGlhdG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qO1xuXHRAbW9kdWxlLWxpY2Vuc2U6XG5cdFx0VGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cdFx0QG1pdC1saWNlbnNlXG5cblx0XHRDb3B5cmlnaHQgKEBjKSAyMDE3IFJpY2hldmUgU2lvZGluYSBCZWJlZG9yXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXG5cblx0XHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRcdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcblx0XHR0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdFx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuXHRcdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5cdFx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5cdFx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuXHRcdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5cdFx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblx0XHRTT0ZUV0FSRS5cblx0QGVuZC1tb2R1bGUtbGljZW5zZVxuXG5cdEBtb2R1bGUtY29uZmlndXJhdGlvbjpcblx0XHR7XG5cdFx0XHRcInBhY2thZ2VcIjogXCJkaWF0b21cIixcblx0XHRcdFwicGF0aFwiOiBcImRpYXRvbS9kaWF0b20uanNcIixcblx0XHRcdFwiZmlsZVwiOiBcImRpYXRvbS5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJkaWF0b21cIixcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXG5cdFx0XHRcdFwiSm9obiBMZW5vbiBNYWdoYW5veSA8am9obmxlbm9ubWFnaGFub3lAZ21haWwuY29tPlwiXG5cdFx0XHRdLFxuXHRcdFx0XCJlTWFpbFwiOiBcInJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cIixcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92b2xrb3Zhc3lzdGVtcy9kaWF0b20uZ2l0XCIsXG5cdFx0XHRcInRlc3RcIjogXCJkaWF0b20tdGVzdC5qc1wiLFxuXHRcdFx0XCJnbG9iYWxcIjogdHJ1ZVxuXHRcdH1cblx0QGVuZC1tb2R1bGUtY29uZmlndXJhdGlvblxuXG5cdEBtb2R1bGUtZG9jdW1lbnRhdGlvbjpcblx0XHRDbGFzcyBibHVlcHJpbnQuXG5cdEBlbmQtbW9kdWxlLWRvY3VtZW50YXRpb25cblxuXHRAaW5jbHVkZTpcblx0XHR7XG5cdFx0XHRcImFyaWRcIjogXCJhcmlkXCIsXG5cdFx0XHRcImJ1ZGdlXCI6IFwiYnVkZ2VcIixcblx0XHRcdFwiZmFsenlcIjogXCJmYWx6eVwiLFxuXHRcdFx0XCJrb21lbnRvXCI6IFwia29tZW50b1wiLFxuXHRcdFx0XCJsbGFtYWxpemVcIjogXCJsbGFtYWxpemVcIixcblx0XHRcdFwicHJvdHlwZVwiOiBcInByb3R5cGVcIlxuXHRcdH1cblx0QGVuZC1pbmNsdWRlXG4qL1xuXG5jb25zdCBhcmlkID0gcmVxdWlyZSggXCJhcmlkXCIgKTtcbmNvbnN0IGJ1ZGdlID0gcmVxdWlyZSggXCJidWRnZVwiICk7XG5jb25zdCBmYWx6eSA9IHJlcXVpcmUoIFwiZmFsenlcIiApO1xuY29uc3Qga29tZW50byA9IHJlcXVpcmUoIFwia29tZW50b1wiICk7XG5jb25zdCBsbGFtYWxpemUgPSByZXF1aXJlKCBcImxsYW1hbGl6ZVwiICk7XG5jb25zdCBwcm90eXBlID0gcmVxdWlyZSggXCJwcm90eXBlXCIgKTtcblxuY29uc3QgdGVtcGxhdGUgPSByZXF1aXJlKCBcIi4vdGVtcGxhdGUuanNcIiApO1xuXG4vLzogQHN1cHBvcnQtbW9kdWxlOlxuXHQvLzogQHJlZmVyZW5jZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZnJvbVxuXHRBcnJheS5mcm9tfHwoQXJyYXkuZnJvbT1mdW5jdGlvbigpe3ZhciByPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcsbj1mdW5jdGlvbihuKXtcblx0cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2Ygbnx8XCJbb2JqZWN0IEZ1bmN0aW9uXVwiPT09ci5jYWxsKG4pfSx0PWZ1bmN0aW9uKHIpe3ZhciBuPU51bWJlcihyKTtcblx0cmV0dXJuIGlzTmFOKG4pPzA6MCE9PW4mJmlzRmluaXRlKG4pPyhuPjA/MTotMSkqTWF0aC5mbG9vcihNYXRoLmFicyhuKSk6bn0sXG5cdGU9TWF0aC5wb3coMiw1MyktMSxvPWZ1bmN0aW9uKHIpe3ZhciBuPXQocik7cmV0dXJuIE1hdGgubWluKE1hdGgubWF4KG4sMCksZSl9O1xuXHRyZXR1cm4gZnVuY3Rpb24ocil7dmFyIHQ9dGhpcyxlPU9iamVjdChyKTtcblx0aWYobnVsbD09cil0aHJvdyBuZXcgVHlwZUVycm9yKFwiQXJyYXkuZnJvbSByZXF1aXJlcyBhbiBhcnJheS1saWtlIG9iamVjdCAtIG5vdCBudWxsIG9yIHVuZGVmaW5lZFwiKTtcblx0dmFyIGEsdT1hcmd1bWVudHMubGVuZ3RoPjE/YXJndW1lbnRzWzFdOnZvaWQgMDtpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgdSl7XG5cdGlmKCFuKHUpKXRocm93IG5ldyBUeXBlRXJyb3IoXCJBcnJheS5mcm9tOiB3aGVuIHByb3ZpZGVkLCB0aGUgc2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvblwiKTtcblx0YXJndW1lbnRzLmxlbmd0aD4yJiYoYT1hcmd1bWVudHNbMl0pfWZvcih2YXIgaSxmPW8oZS5sZW5ndGgpLGM9bih0KT9cblx0T2JqZWN0KG5ldyB0KGYpKTpuZXcgQXJyYXkoZiksaD0wO2Y+aDspaT1lW2hdLFxuXHR1P2NbaF09XCJ1bmRlZmluZWRcIj09dHlwZW9mIGE/dShpLGgpOnUuY2FsbChhLGksaCk6Y1toXT1pLGgrPTE7cmV0dXJuIGMubGVuZ3RoPWYsY319KCkpO1xuLy86IEBlbmQtc3VwcG9ydC1tb2R1bGVcblxuY29uc3QgZGlhdG9tID0gZnVuY3Rpb24gZGlhdG9tKCBuYW1lLCBwYXJhbWV0ZXIgKXtcblx0Lyo7XG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcblx0XHRcdHtcblx0XHRcdFx0XCJuYW1lOnJlcXVpcmVkXCI6IFwic3RyaW5nXCIsXG5cdFx0XHRcdFwicGFyYW1ldGVyXCI6IFwiLi4uc3RyaW5nXCJcblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdGlmKCAhcHJvdHlwZSggbmFtZSwgU1RSSU5HICkgfHwgZmFsenkoIG5hbWUgKSApe1xuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIG5hbWVcIiApO1xuXHR9XG5cblx0aWYoICEoIC9eW0EtWl1bQS1aYS16MC05XSskLyApLnRlc3QoIG5hbWUgKSApe1xuXHRcdHRocm93IG5ldyBFcnJvciggXCJuYW1lIGlzIG5vdCBzaW1wbGVcIiApO1xuXHR9XG5cblx0cGFyYW1ldGVyID0gYnVkZ2UoIGFyZ3VtZW50cyApO1xuXG5cdGlmKCBhcmlkKCBwYXJhbWV0ZXIgKSApe1xuXHRcdHBhcmFtZXRlciA9IFsgXCJvcHRpb25cIiwgXCJjYWxsYmFja1wiIF07XG5cdH1cblxuXHRuYW1lID0gbGxhbWFsaXplKCBuYW1lLCB0cnVlICk7XG5cblx0dHJ5e1xuXHRcdGxldCBibHVlcHJpbnQgPSBrb21lbnRvKCB0ZW1wbGF0ZSwgeyBcIm5hbWVcIjogbmFtZSwgXCJwYXJhbWV0ZXJcIjogcGFyYW1ldGVyLmpvaW4oIFwiLFwiICkgfSApO1xuXG5cdFx0cmV0dXJuIG5ldyBGdW5jdGlvbiggYHJldHVybiAkeyBibHVlcHJpbnQgfWAgKSggKTtcblxuXHR9Y2F0Y2goIGVycm9yICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBgZnVuY3Rpb24gbm90IGNyZWF0ZWQgcHJvcGVybHksICR7IGVycm9yIH1gICk7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZGlhdG9tO1xuIl19
