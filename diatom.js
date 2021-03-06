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
			"shft": "shft"
		}
	@end-include
*/

const arid = require( "arid" );
const burne = require( "burne" );
const falzy = require( "falzy" );
const komento = require( "komento" );
const llamalize = require( "llamalize" );
const shft = require( "shft" );

const template = require( "./template.js" );

const CLASS = Symbol.for( "class" );
const CLASS_NAME_PATTERN = /^[A-Z][A-Za-z0-9]+$/;
const DIATOMIC = Symbol( "diatomic" );

const diatom = function diatom( name, parameter ){
	/*;
		@meta-configuration:
			{
				"name:required": "string",
				"parameter": "...string"
			}
		@end-meta-configuration
	*/

	if( falzy( name ) || typeof name != "string" ){
		throw new Error( "invalid name" );
	}

	/*;
		@note:
			We want to ensure that the class created conforms to the conventional
				class namespace structure.
		@end-note
	*/
	if( !CLASS_NAME_PATTERN.test( name ) ){
		throw new Error( "name does not conform to conventional class name structure" );
	}

	parameter = shft( arguments );

	/*;
		@note:
			These are standard conventional default parameter.
		@end-note
	*/
	if( arid( parameter ) ){
		parameter = [ "option", "callback" ];
	}

	name = llamalize( name, true );

	try{
		let blueprint = komento( template, { "name": name, "parameter": parameter.join( "," ) } );

		blueprint = new Function( `return ${ blueprint }` )( );

		burne( CLASS, blueprint );

		burne( DIATOMIC, blueprint );

		return blueprint;

	}catch( error ){
		throw new Error( `function not created properly, ${ error.stack }` );
	}
};

module.exports = diatom;
