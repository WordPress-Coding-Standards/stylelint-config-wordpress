'use strict';

const fs = require( 'fs' ),
	config = require( '../scss.js' ),
	stylelint = require( 'stylelint' ),
	validScss = fs.readFileSync( './__tests__/scss-valid.scss', 'utf-8' ),
	invalidScss = fs.readFileSync( './__tests__/scss-invalid.scss', 'utf-8' );

describe( 'flags no warnings with valid scss', () => {
	let result;

	beforeEach( () => {
		result = stylelint.lint( {
			code: validScss,
			config,
		} );
	} );

	it( 'did not error', () => {
		return result.then( ( data ) => expect( data.errored ).toBeFalsy() );
	} );

	it( 'flags no warnings', () => {
		return result.then( ( data ) =>
			expect( data.results[ 0 ].warnings ).toHaveLength( 0 )
		);
	} );
} );

describe( 'flags warnings with invalid scss', () => {
	let result;

	beforeEach( () => {
		result = stylelint.lint( {
			code: invalidScss,
			config,
		} );
	} );

	it( 'did error', () => {
		return result.then( ( data ) => expect( data.errored ).toBeTruthy() );
	} );

	it( 'flags correct number of warnings', () => {
		return result.then( ( data ) =>
			expect( data.results[ 0 ].warnings ).toHaveLength( 8 )
		);
	} );
} );
