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

var arid = require("arid");
var budge = require("budge");
var falzy = require("falzy");
var komento = require("komento");
var llamalize = require("llamalize");
var protype = require("protype");

var template = require("./template.js");

var diatom = function diatom(name, parameter) {
	/*;
 	@meta-configuration:
 		{
 			"name:required": "string",
 			"parameter": "...string"
 		}
 	@end-meta-configuration
 */

	if (falzy(name) || !protype(name, STRING)) {
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
		throw new Error("function not created properly, " + error.stack);
	}
};

module.exports = diatom;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpYXRvbS5qcyJdLCJuYW1lcyI6WyJhcmlkIiwicmVxdWlyZSIsImJ1ZGdlIiwiZmFsenkiLCJrb21lbnRvIiwibGxhbWFsaXplIiwicHJvdHlwZSIsInRlbXBsYXRlIiwiZGlhdG9tIiwibmFtZSIsInBhcmFtZXRlciIsIlNUUklORyIsIkVycm9yIiwidGVzdCIsImFyZ3VtZW50cyIsImJsdWVwcmludCIsImpvaW4iLCJGdW5jdGlvbiIsImVycm9yIiwic3RhY2siLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNERBLElBQU1BLE9BQU9DLFFBQVMsTUFBVCxDQUFiO0FBQ0EsSUFBTUMsUUFBUUQsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNRSxRQUFRRixRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1HLFVBQVVILFFBQVMsU0FBVCxDQUFoQjtBQUNBLElBQU1JLFlBQVlKLFFBQVMsV0FBVCxDQUFsQjtBQUNBLElBQU1LLFVBQVVMLFFBQVMsU0FBVCxDQUFoQjs7QUFFQSxJQUFNTSxXQUFXTixRQUFTLGVBQVQsQ0FBakI7O0FBRUEsSUFBTU8sU0FBUyxTQUFTQSxNQUFULENBQWlCQyxJQUFqQixFQUF1QkMsU0FBdkIsRUFBa0M7QUFDaEQ7Ozs7Ozs7OztBQVNBLEtBQUlQLE1BQU9NLElBQVAsS0FBaUIsQ0FBQ0gsUUFBU0csSUFBVCxFQUFlRSxNQUFmLENBQXRCLEVBQStDO0FBQzlDLFFBQU0sSUFBSUMsS0FBSixDQUFXLGNBQVgsQ0FBTjtBQUNBOztBQUVELEtBQUksQ0FBRyxxQkFBRixDQUEwQkMsSUFBMUIsQ0FBZ0NKLElBQWhDLENBQUwsRUFBNkM7QUFDNUMsUUFBTSxJQUFJRyxLQUFKLENBQVcsb0JBQVgsQ0FBTjtBQUNBOztBQUVERixhQUFZUixNQUFPWSxTQUFQLENBQVo7O0FBRUEsS0FBSWQsS0FBTVUsU0FBTixDQUFKLEVBQXVCO0FBQ3RCQSxjQUFZLENBQUUsUUFBRixFQUFZLFVBQVosQ0FBWjtBQUNBOztBQUVERCxRQUFPSixVQUFXSSxJQUFYLEVBQWlCLElBQWpCLENBQVA7O0FBRUEsS0FBRztBQUNGLE1BQUlNLFlBQVlYLFFBQVNHLFFBQVQsRUFBbUIsRUFBRSxRQUFRRSxJQUFWLEVBQWdCLGFBQWFDLFVBQVVNLElBQVYsQ0FBZ0IsR0FBaEIsQ0FBN0IsRUFBbkIsQ0FBaEI7O0FBRUEsU0FBTyxJQUFJQyxRQUFKLGFBQXlCRixTQUF6QixHQUFQO0FBRUEsRUFMRCxDQUtDLE9BQU9HLEtBQVAsRUFBYztBQUNkLFFBQU0sSUFBSU4sS0FBSixxQ0FBOENNLE1BQU1DLEtBQXBELENBQU47QUFDQTtBQUNELENBbENEOztBQW9DQUMsT0FBT0MsT0FBUCxHQUFpQmIsTUFBakIiLCJmaWxlIjoiZGlhdG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qO1xuXHRAbW9kdWxlLWxpY2Vuc2U6XG5cdFx0VGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cdFx0QG1pdC1saWNlbnNlXG5cblx0XHRDb3B5cmlnaHQgKEBjKSAyMDE3IFJpY2hldmUgU2lvZGluYSBCZWJlZG9yXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXG5cblx0XHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuXHRcdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcblx0XHR0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5cdFx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuXHRcdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5cdFx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5cdFx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuXHRcdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5cdFx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblx0XHRTT0ZUV0FSRS5cblx0QGVuZC1tb2R1bGUtbGljZW5zZVxuXG5cdEBtb2R1bGUtY29uZmlndXJhdGlvbjpcblx0XHR7XG5cdFx0XHRcInBhY2thZ2VcIjogXCJkaWF0b21cIixcblx0XHRcdFwicGF0aFwiOiBcImRpYXRvbS9kaWF0b20uanNcIixcblx0XHRcdFwiZmlsZVwiOiBcImRpYXRvbS5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJkaWF0b21cIixcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXG5cdFx0XHRcdFwiSm9obiBMZW5vbiBNYWdoYW5veSA8am9obmxlbm9ubWFnaGFub3lAZ21haWwuY29tPlwiXG5cdFx0XHRdLFxuXHRcdFx0XCJlTWFpbFwiOiBcInJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cIixcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92b2xrb3Zhc3lzdGVtcy9kaWF0b20uZ2l0XCIsXG5cdFx0XHRcInRlc3RcIjogXCJkaWF0b20tdGVzdC5qc1wiLFxuXHRcdFx0XCJnbG9iYWxcIjogdHJ1ZVxuXHRcdH1cblx0QGVuZC1tb2R1bGUtY29uZmlndXJhdGlvblxuXG5cdEBtb2R1bGUtZG9jdW1lbnRhdGlvbjpcblx0XHRDbGFzcyBibHVlcHJpbnQuXG5cdEBlbmQtbW9kdWxlLWRvY3VtZW50YXRpb25cblxuXHRAaW5jbHVkZTpcblx0XHR7XG5cdFx0XHRcImFyaWRcIjogXCJhcmlkXCIsXG5cdFx0XHRcImJ1ZGdlXCI6IFwiYnVkZ2VcIixcblx0XHRcdFwiZmFsenlcIjogXCJmYWx6eVwiLFxuXHRcdFx0XCJrb21lbnRvXCI6IFwia29tZW50b1wiLFxuXHRcdFx0XCJsbGFtYWxpemVcIjogXCJsbGFtYWxpemVcIixcblx0XHRcdFwicHJvdHlwZVwiOiBcInByb3R5cGVcIlxuXHRcdH1cblx0QGVuZC1pbmNsdWRlXG4qL1xuXG5jb25zdCBhcmlkID0gcmVxdWlyZSggXCJhcmlkXCIgKTtcbmNvbnN0IGJ1ZGdlID0gcmVxdWlyZSggXCJidWRnZVwiICk7XG5jb25zdCBmYWx6eSA9IHJlcXVpcmUoIFwiZmFsenlcIiApO1xuY29uc3Qga29tZW50byA9IHJlcXVpcmUoIFwia29tZW50b1wiICk7XG5jb25zdCBsbGFtYWxpemUgPSByZXF1aXJlKCBcImxsYW1hbGl6ZVwiICk7XG5jb25zdCBwcm90eXBlID0gcmVxdWlyZSggXCJwcm90eXBlXCIgKTtcblxuY29uc3QgdGVtcGxhdGUgPSByZXF1aXJlKCBcIi4vdGVtcGxhdGUuanNcIiApO1xuXG5jb25zdCBkaWF0b20gPSBmdW5jdGlvbiBkaWF0b20oIG5hbWUsIHBhcmFtZXRlciApe1xuXHQvKjtcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxuXHRcdFx0e1xuXHRcdFx0XHRcIm5hbWU6cmVxdWlyZWRcIjogXCJzdHJpbmdcIixcblx0XHRcdFx0XCJwYXJhbWV0ZXJcIjogXCIuLi5zdHJpbmdcIlxuXHRcdFx0fVxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXG5cdCovXG5cblx0aWYoIGZhbHp5KCBuYW1lICkgfHwgIXByb3R5cGUoIG5hbWUsIFNUUklORyApICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgbmFtZVwiICk7XG5cdH1cblxuXHRpZiggISggL15bQS1aXVtBLVphLXowLTldKyQvICkudGVzdCggbmFtZSApICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcIm5hbWUgaXMgbm90IHNpbXBsZVwiICk7XG5cdH1cblxuXHRwYXJhbWV0ZXIgPSBidWRnZSggYXJndW1lbnRzICk7XG5cblx0aWYoIGFyaWQoIHBhcmFtZXRlciApICl7XG5cdFx0cGFyYW1ldGVyID0gWyBcIm9wdGlvblwiLCBcImNhbGxiYWNrXCIgXTtcblx0fVxuXG5cdG5hbWUgPSBsbGFtYWxpemUoIG5hbWUsIHRydWUgKTtcblxuXHR0cnl7XG5cdFx0bGV0IGJsdWVwcmludCA9IGtvbWVudG8oIHRlbXBsYXRlLCB7IFwibmFtZVwiOiBuYW1lLCBcInBhcmFtZXRlclwiOiBwYXJhbWV0ZXIuam9pbiggXCIsXCIgKSB9ICk7XG5cblx0XHRyZXR1cm4gbmV3IEZ1bmN0aW9uKCBgcmV0dXJuICR7IGJsdWVwcmludCB9YCApKCApO1xuXG5cdH1jYXRjaCggZXJyb3IgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIGBmdW5jdGlvbiBub3QgY3JlYXRlZCBwcm9wZXJseSwgJHsgZXJyb3Iuc3RhY2sgfWAgKTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBkaWF0b207XG4iXX0=
