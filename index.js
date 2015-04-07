/* jshint node: true */
'use strict';
var path = require('path');
var find = require('broccoli-stew').find;
var rename = require('broccoli-stew').rename;
var log = require('broccoli-stew').log;
var mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-primer',
  treeForVendor: function() {
    var primerPath = path.join(__dirname, 'node_modules', 'primer');
    var expandedPrimerPath = expand(path.join(primerPath, 'css', 'primer.css'));
    var primerCSS = rename(find(expandedPrimerPath), function() {
      return 'primer/primer.css';
    });
    return mergeTrees([primerCSS]);
  },
  included: function included(app) {
    this._super.included.apply(this, arguments);
    app.import('vendor/primer/primer.css');
  }
};

function expand(input) {
  var dirname = path.dirname(input);
  var file = path.basename(input);

  return dirname + '/{' + file + '}';
}
