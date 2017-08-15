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
              			"eMail": "richeve.bebedor@gmail.com",
              			"contributors": [
              				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>",
              				"Vinse Vinalon <vinsevinalon@gmail.com>"
              			],
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
              			"falzy": "falzy",
              			"burne": "burne",
              			"komento": "komento",
              			"llamalize": "llamalize",
              			"protype": "protype",
              			"shft": "shft"
              		}
              	@end-include
              */var _symbol = require("babel-runtime/core-js/symbol");var _symbol2 = _interopRequireDefault(_symbol);var _for = require("babel-runtime/core-js/symbol/for");var _for2 = _interopRequireDefault(_for);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var arid = require("arid");
var burne = require("burne");
var falzy = require("falzy");
var komento = require("komento");
var llamalize = require("llamalize");
var protype = require("protype");
var shft = require("shft");

var template = require("./template.js");

var CLASS = (0, _for2.default)("class");
var CLASS_NAME_PATTERN = /^[A-Z][A-Za-z0-9]+$/;
var DIATOMIC = (0, _symbol2.default)("diatomic");

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

	/*;
   	@note:
   		We want to ensure that the class created conforms to the conventional
   			class namespace structure.
   	@end-note
   */
	if (!CLASS_NAME_PATTERN.test(name)) {
		throw new Error("name does not conform to conventional class name structure");
	}

	parameter = shft(arguments);

	/*;
                              	@note:
                              		These are standard conventional default parameter.
                              	@end-note
                              */
	if (arid(parameter)) {
		parameter = ["option", "callback"];
	}

	name = llamalize(name, true);

	try {
		var blueprint = komento(template, { "name": name, "parameter": parameter.join(",") });

		blueprint = new Function("return " + blueprint)();

		burne(CLASS, blueprint);

		burne(DIATOMIC, blueprint);

		return blueprint;

	} catch (error) {
		throw new Error("function not created properly, " + error.stack);
	}
};

module.exports = diatom;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpYXRvbS5zdXBwb3J0LmpzIl0sIm5hbWVzIjpbImFyaWQiLCJyZXF1aXJlIiwiYnVybmUiLCJmYWx6eSIsImtvbWVudG8iLCJsbGFtYWxpemUiLCJwcm90eXBlIiwic2hmdCIsInRlbXBsYXRlIiwiQ0xBU1MiLCJDTEFTU19OQU1FX1BBVFRFUk4iLCJESUFUT01JQyIsImRpYXRvbSIsIm5hbWUiLCJwYXJhbWV0ZXIiLCJTVFJJTkciLCJFcnJvciIsInRlc3QiLCJhcmd1bWVudHMiLCJibHVlcHJpbnQiLCJqb2luIiwiRnVuY3Rpb24iLCJlcnJvciIsInN0YWNrIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOERBLElBQU1BLE9BQU9DLFFBQVMsTUFBVCxDQUFiO0FBQ0EsSUFBTUMsUUFBUUQsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNRSxRQUFRRixRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1HLFVBQVVILFFBQVMsU0FBVCxDQUFoQjtBQUNBLElBQU1JLFlBQVlKLFFBQVMsV0FBVCxDQUFsQjtBQUNBLElBQU1LLFVBQVVMLFFBQVMsU0FBVCxDQUFoQjtBQUNBLElBQU1NLE9BQU9OLFFBQVMsTUFBVCxDQUFiOztBQUVBLElBQU1PLFdBQVdQLFFBQVMsZUFBVCxDQUFqQjs7QUFFQSxJQUFNUSxRQUFRLG1CQUFZLE9BQVosQ0FBZDtBQUNBLElBQU1DLHFCQUFxQixxQkFBM0I7QUFDQSxJQUFNQyxXQUFXLHNCQUFRLFVBQVIsQ0FBakI7O0FBRUEsSUFBTUMsU0FBUyxTQUFTQSxNQUFULENBQWlCQyxJQUFqQixFQUF1QkMsU0FBdkIsRUFBa0M7QUFDaEQ7Ozs7Ozs7OztBQVNBLEtBQUlYLE1BQU9VLElBQVAsS0FBaUIsQ0FBQ1AsUUFBU08sSUFBVCxFQUFlRSxNQUFmLENBQXRCLEVBQStDO0FBQzlDLFFBQU0sSUFBSUMsS0FBSixDQUFXLGNBQVgsQ0FBTjtBQUNBOztBQUVEOzs7Ozs7QUFNQSxLQUFJLENBQUNOLG1CQUFtQk8sSUFBbkIsQ0FBeUJKLElBQXpCLENBQUwsRUFBc0M7QUFDckMsUUFBTSxJQUFJRyxLQUFKLENBQVcsNERBQVgsQ0FBTjtBQUNBOztBQUVERixhQUFZUCxLQUFNVyxTQUFOLENBQVo7O0FBRUE7Ozs7O0FBS0EsS0FBSWxCLEtBQU1jLFNBQU4sQ0FBSixFQUF1QjtBQUN0QkEsY0FBWSxDQUFFLFFBQUYsRUFBWSxVQUFaLENBQVo7QUFDQTs7QUFFREQsUUFBT1IsVUFBV1EsSUFBWCxFQUFpQixJQUFqQixDQUFQOztBQUVBLEtBQUc7QUFDRixNQUFJTSxZQUFZZixRQUFTSSxRQUFULEVBQW1CLEVBQUUsUUFBUUssSUFBVixFQUFnQixhQUFhQyxVQUFVTSxJQUFWLENBQWdCLEdBQWhCLENBQTdCLEVBQW5CLENBQWhCOztBQUVBRCxjQUFZLElBQUlFLFFBQUosYUFBeUJGLFNBQXpCLEdBQVo7O0FBRUFqQixRQUFPTyxLQUFQLEVBQWNVLFNBQWQ7O0FBRUFqQixRQUFPUyxRQUFQLEVBQWlCUSxTQUFqQjs7QUFFQSxTQUFPQSxTQUFQOztBQUVBLEVBWEQsQ0FXQyxPQUFPRyxLQUFQLEVBQWM7QUFDZCxRQUFNLElBQUlOLEtBQUoscUNBQThDTSxNQUFNQyxLQUFwRCxDQUFOO0FBQ0E7QUFDRCxDQW5ERDs7QUFxREFDLE9BQU9DLE9BQVAsR0FBaUJiLE1BQWpCIiwiZmlsZSI6ImRpYXRvbS5zdXBwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4vKjtcclxuXHRAbW9kdWxlLWxpY2Vuc2U6XHJcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcclxuXHRcdEBtaXQtbGljZW5zZVxyXG5cclxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3JcclxuXHRcdEBlbWFpbDogcmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVxyXG5cclxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuXHRcdG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuXHRcdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuXHRcdGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5cdFx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblx0XHRUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuXHRcdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5cdFx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5cdFx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuXHRcdEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuXHRcdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5cdFx0U09GVFdBUkUuXHJcblx0QGVuZC1tb2R1bGUtbGljZW5zZVxyXG5cclxuXHRAbW9kdWxlLWNvbmZpZ3VyYXRpb246XHJcblx0XHR7XHJcblx0XHRcdFwicGFja2FnZVwiOiBcImRpYXRvbVwiLFxyXG5cdFx0XHRcInBhdGhcIjogXCJkaWF0b20vZGlhdG9tLmpzXCIsXHJcblx0XHRcdFwiZmlsZVwiOiBcImRpYXRvbS5qc1wiLFxyXG5cdFx0XHRcIm1vZHVsZVwiOiBcImRpYXRvbVwiLFxyXG5cdFx0XHRcImF1dGhvclwiOiBcIlJpY2hldmUgUy4gQmViZWRvclwiLFxyXG5cdFx0XHRcImVNYWlsXCI6IFwicmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVwiLFxyXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXHJcblx0XHRcdFx0XCJKb2huIExlbm9uIE1hZ2hhbm95IDxqb2hubGVub25tYWdoYW5veUBnbWFpbC5jb20+XCIsXHJcblx0XHRcdFx0XCJWaW5zZSBWaW5hbG9uIDx2aW5zZXZpbmFsb25AZ21haWwuY29tPlwiXHJcblx0XHRcdF0sXHJcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92b2xrb3Zhc3lzdGVtcy9kaWF0b20uZ2l0XCIsXHJcblx0XHRcdFwidGVzdFwiOiBcImRpYXRvbS10ZXN0LmpzXCIsXHJcblx0XHRcdFwiZ2xvYmFsXCI6IHRydWVcclxuXHRcdH1cclxuXHRAZW5kLW1vZHVsZS1jb25maWd1cmF0aW9uXHJcblxyXG5cdEBtb2R1bGUtZG9jdW1lbnRhdGlvbjpcclxuXHRcdENsYXNzIGJsdWVwcmludC5cclxuXHRAZW5kLW1vZHVsZS1kb2N1bWVudGF0aW9uXHJcblxyXG5cdEBpbmNsdWRlOlxyXG5cdFx0e1xyXG5cdFx0XHRcImFyaWRcIjogXCJhcmlkXCIsXHJcblx0XHRcdFwiZmFsenlcIjogXCJmYWx6eVwiLFxyXG5cdFx0XHRcImJ1cm5lXCI6IFwiYnVybmVcIixcclxuXHRcdFx0XCJrb21lbnRvXCI6IFwia29tZW50b1wiLFxyXG5cdFx0XHRcImxsYW1hbGl6ZVwiOiBcImxsYW1hbGl6ZVwiLFxyXG5cdFx0XHRcInByb3R5cGVcIjogXCJwcm90eXBlXCIsXHJcblx0XHRcdFwic2hmdFwiOiBcInNoZnRcIlxyXG5cdFx0fVxyXG5cdEBlbmQtaW5jbHVkZVxyXG4qL1xyXG5cclxuY29uc3QgYXJpZCA9IHJlcXVpcmUoIFwiYXJpZFwiICk7XHJcbmNvbnN0IGJ1cm5lID0gcmVxdWlyZSggXCJidXJuZVwiICk7XHJcbmNvbnN0IGZhbHp5ID0gcmVxdWlyZSggXCJmYWx6eVwiICk7XHJcbmNvbnN0IGtvbWVudG8gPSByZXF1aXJlKCBcImtvbWVudG9cIiApO1xyXG5jb25zdCBsbGFtYWxpemUgPSByZXF1aXJlKCBcImxsYW1hbGl6ZVwiICk7XHJcbmNvbnN0IHByb3R5cGUgPSByZXF1aXJlKCBcInByb3R5cGVcIiApO1xyXG5jb25zdCBzaGZ0ID0gcmVxdWlyZSggXCJzaGZ0XCIgKTtcclxuXHJcbmNvbnN0IHRlbXBsYXRlID0gcmVxdWlyZSggXCIuL3RlbXBsYXRlLmpzXCIgKTtcclxuXHJcbmNvbnN0IENMQVNTID0gU3ltYm9sLmZvciggXCJjbGFzc1wiICk7XHJcbmNvbnN0IENMQVNTX05BTUVfUEFUVEVSTiA9IC9eW0EtWl1bQS1aYS16MC05XSskLztcclxuY29uc3QgRElBVE9NSUMgPSBTeW1ib2woIFwiZGlhdG9taWNcIiApO1xyXG5cclxuY29uc3QgZGlhdG9tID0gZnVuY3Rpb24gZGlhdG9tKCBuYW1lLCBwYXJhbWV0ZXIgKXtcclxuXHQvKjtcclxuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XHJcblx0XHRcdHtcclxuXHRcdFx0XHRcIm5hbWU6cmVxdWlyZWRcIjogXCJzdHJpbmdcIixcclxuXHRcdFx0XHRcInBhcmFtZXRlclwiOiBcIi4uLnN0cmluZ1wiXHJcblx0XHRcdH1cclxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXHJcblx0Ki9cclxuXHJcblx0aWYoIGZhbHp5KCBuYW1lICkgfHwgIXByb3R5cGUoIG5hbWUsIFNUUklORyApICl7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBuYW1lXCIgKTtcclxuXHR9XHJcblxyXG5cdC8qO1xyXG5cdFx0QG5vdGU6XHJcblx0XHRcdFdlIHdhbnQgdG8gZW5zdXJlIHRoYXQgdGhlIGNsYXNzIGNyZWF0ZWQgY29uZm9ybXMgdG8gdGhlIGNvbnZlbnRpb25hbFxyXG5cdFx0XHRcdGNsYXNzIG5hbWVzcGFjZSBzdHJ1Y3R1cmUuXHJcblx0XHRAZW5kLW5vdGVcclxuXHQqL1xyXG5cdGlmKCAhQ0xBU1NfTkFNRV9QQVRURVJOLnRlc3QoIG5hbWUgKSApe1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcIm5hbWUgZG9lcyBub3QgY29uZm9ybSB0byBjb252ZW50aW9uYWwgY2xhc3MgbmFtZSBzdHJ1Y3R1cmVcIiApO1xyXG5cdH1cclxuXHJcblx0cGFyYW1ldGVyID0gc2hmdCggYXJndW1lbnRzICk7XHJcblxyXG5cdC8qO1xyXG5cdFx0QG5vdGU6XHJcblx0XHRcdFRoZXNlIGFyZSBzdGFuZGFyZCBjb252ZW50aW9uYWwgZGVmYXVsdCBwYXJhbWV0ZXIuXHJcblx0XHRAZW5kLW5vdGVcclxuXHQqL1xyXG5cdGlmKCBhcmlkKCBwYXJhbWV0ZXIgKSApe1xyXG5cdFx0cGFyYW1ldGVyID0gWyBcIm9wdGlvblwiLCBcImNhbGxiYWNrXCIgXTtcclxuXHR9XHJcblxyXG5cdG5hbWUgPSBsbGFtYWxpemUoIG5hbWUsIHRydWUgKTtcclxuXHJcblx0dHJ5e1xyXG5cdFx0bGV0IGJsdWVwcmludCA9IGtvbWVudG8oIHRlbXBsYXRlLCB7IFwibmFtZVwiOiBuYW1lLCBcInBhcmFtZXRlclwiOiBwYXJhbWV0ZXIuam9pbiggXCIsXCIgKSB9ICk7XHJcblxyXG5cdFx0Ymx1ZXByaW50ID0gbmV3IEZ1bmN0aW9uKCBgcmV0dXJuICR7IGJsdWVwcmludCB9YCApKCApO1xyXG5cclxuXHRcdGJ1cm5lKCBDTEFTUywgYmx1ZXByaW50ICk7XHJcblxyXG5cdFx0YnVybmUoIERJQVRPTUlDLCBibHVlcHJpbnQgKTtcclxuXHJcblx0XHRyZXR1cm4gYmx1ZXByaW50O1xyXG5cclxuXHR9Y2F0Y2goIGVycm9yICl7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoIGBmdW5jdGlvbiBub3QgY3JlYXRlZCBwcm9wZXJseSwgJHsgZXJyb3Iuc3RhY2sgfWAgKTtcclxuXHR9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRpYXRvbTtcclxuIl19
//# sourceMappingURL=diatom.support.js.map
