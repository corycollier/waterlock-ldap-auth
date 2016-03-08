'use strict';

var method = require('../waterlock-multiple-ldap-auth');
var _  = require('lodash');

exports.attributes = function(attr){
  var template = {
    dn: {
      type: 'string',
      unique: true
    },
    entryUUID: {
      type: 'string',
      unique: true
    }
  };
  _.transform(method.attributes, function(template, fields) {
    _.merge(template, fields);
  }, template);
  _.merge(attr, template);
};
