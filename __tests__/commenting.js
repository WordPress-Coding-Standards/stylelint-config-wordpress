import config from "../"
import stylelint from "stylelint"
import test from "ava"

/* eslint-disable */
const validCss = (`
/**
* #.# Section title
*
* Description of section, whether or not it has media queries, etc.
*/

.selector {
	float: left;
}


/**
* #.# Another section title
*
* Description of section, whether or not it has media queries, long comments
* should manually break the line length at 80 characters.
*/

.selector {
	float: right;
}

/* This is a comment about this selector */
.another-selector {
	position: absolute;
	top: 0 !important; /* I should explain why this is so !important */
}

/* Long comments should manually break the line length at 80 characters. */
`)

const invalidCss = (`
/**
* #.# Section title
*
* Description of section, whether or not it has media queries, etc.
*/
.selector {
	float: left;
}
/**
* #.# Another section title
*
* Description of section, whether or not it has media queries, long comments
* should manually break the line length at 80 characters.
*/
.selector {
	float: right;
}
/* This is a comment about this selector */
.another-selector {
	position: absolute;
	top: 0 !important; /* I should explain why this is so !important */
}

/* Comments shouldn't have a line length greater than 80 characters, they should manually break the line length at 80 characters */
`)
/* eslint-enable */

test("There are no warnings with commenting CSS", t => {
  return stylelint.lint({
    code: validCss,
    config: config,
  })
  .then(data => {
    const { errored, results } = data
    const { warnings } = results[0]
    t.falsy(errored, "no errored")
    t.is(warnings.length, 0, "flags no warnings")
  })
})

test("There are warnings with invalid commenting CSS", t => {
  return stylelint.lint({
    code: invalidCss,
    config: config,
  })
  .then(data => {
    const { errored, results } = data
    const { warnings } = results[0]
    t.truthy(errored, "errored")
    t.is(warnings.length, 3, "flags three warnings")
    t.is(warnings[0].text, "Expected empty line before comment (comment-empty-line-before)", "correct warning text")
    t.is(warnings[1].text, "Expected empty line before comment (comment-empty-line-before)", "correct warning text")
    t.is(warnings[2].text, "Expected line length to be no more than 80 characters (max-line-length)", "correct warning text")
  })
})
