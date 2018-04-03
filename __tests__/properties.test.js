'use strict';

const fs = require( 'fs' ),
	config = require( '../' ),
	stylelint = require( 'stylelint' ),
	validCss = fs.readFileSync( './__tests__/properties-valid.css', 'utf-8' ),
	invalidCss = fs.readFileSync( './__tests__/properties-invalid.css', 'utf-8' );

describe( 'flags no warnings with valid properties css', () => {
	let result;

	beforeEach( () => {
		result = stylelint.lint({
			code: validCss,
			config,
		});
	});

	it( 'did not error', () => {
		return result.then( data => (
			expect( data.errored ).toBeFalsy()
		) );
	});

	it( 'flags no warnings', () => {
		return result.then( data => (
			expect( data.results[0].warnings ).toHaveLength( 0 )
		) );
	});
});

describe( 'flags warnings with invalid properties css', () => {
	let result;

	beforeEach( () => {
		result = stylelint.lint({
			code: invalidCss,
			config,
		});
	});

	it( 'did error', () => {
		return result.then( data => (
			expect( data.errored ).toBeTruthy()
		) );
	});

	it( 'flags correct number of warnings', () => {
		return result.then( data => (
			expect( data.results[0].warnings ).toHaveLength( 7 )
		) );
	});

	it( 'snapshot matches warnings', () => {
		return result.then( data => (
			expect( data.results[0].warnings ).toMatchSnapshot()
		) );
	});
});
