# stylelint-config-wordpress
[![NPM version](http://img.shields.io/npm/v/stylelint-config-wordpress.svg)](https://www.npmjs.org/package/stylelint-config-wordpress) [![Travis Build Status](https://img.shields.io/travis/stylelint/stylelint-config-wordpress/master.svg?label=unix%20build)](https://travis-ci.org/stylelint/stylelint-config-wordpress) [![AppVeyor Build Status](https://img.shields.io/appveyor/ci/jeddy3/stylelint-config-wordpress/master.svg?label=windows%20build)](https://ci.appveyor.com/project/jeddy3/stylelint-config-wordpress)

> WordPress shareable config for stylelint.

Configuration rules to ensure your CSS is compliant with the [WordPress CSS Coding Standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/css/).

## Installation

```console
$ npm install stylelint-config-wordpress
```

* _PostCSS `5.x` or `4.x` compatibility_ - versions `1.0.0+` of the linter are compatible with PostCSS `5.0.4+`. Whereas, versions `0.2.0 and below` are compatible with PostCSS `4.x`.

## Usage

Require the config and use it for stylelint's option. For example, using the JS API approach:

```js
var fs = require("fs")
var postcss = require("postcss")
var reporter = require("postcss-reporter")
var stylelint = require("stylelint")
var configWordPress = require("stylelint-config-wordpress")

// css to be processed
var css = fs.readFileSync("input.css", "utf8")

postcss([
  stylelint(configWordPress), // use stylelint-config-wordpress
  reporter(),
 ])
.process(css, { from: "input.css" })
.then()
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
