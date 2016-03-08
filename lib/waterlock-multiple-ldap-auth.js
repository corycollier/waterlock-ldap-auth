'use strict';

// Variable declarations. Do it all in once place.
var _           = require('lodash')
  , path        = require('path')
  , LdapAuth    = require('ldapauth-fork')
  , authType    = 'multiple-ldap'
  , configPath  = path.normalize(__dirname+'/../../../config/waterlock.js')
  , installPath = path.normalize(__dirname+'/../../../')
  , wlconfig    = require(configPath).waterlock
  , method      = {}
;

exports.authType = authType;

/**
 * Where the software is installed
 */
exports.installPath = installPath;

/**
 * Conditionally export mail trasport data if
 * user has opted for password tokens i.e. password
 * resets
 */
method = wlconfig.authMethod;
if (typeof wlconfig.authMethod[0] === 'object') {
  for (var i = 0; i < wlconfig.authMethod.length; i++) {
    if (wlconfig.authMethod[i].name === 'waterlock-multiple-ldap-auth') {
      method = wlconfig.authMethod[i];
    }
  }
}

/**
 * the entire config
 */
exports.config = wlconfig;

/**
 * the config for this method
 */
exports.authConfig = method;

/**
 * the LDAP module
 */
exports.ldap = LdapAuth;

/**
 * The mapped attributes
 */
exports.attributes = method.attributes || {};

/**
 * the LDAP connection information
 */
_.forOwn(method.connections, function(connection, name) {
  exports.connection[name] = _.merge(connection, {
    searchAttributes: _.union(['dn', 'entryUUID'], _.keys(method.attributes))
  });
});

/**
 * Specify the actions that this package provides
 */
exports.actions = require('./controllers');

/**
 * Specify the model methods this package provides
 */
exports.model = require('./models');
