'use strict';

// Variable declarations. Do it all in once place.
var _           = require('lodash')
  , path        = require('path')
  , LdapAuth    = require('ldapauth-fork')
  , authType    = 'ldap'
  , configPath  = path.normalize(__dirname+'/../../../config/waterlock.js')
  , installPath = path.normalize(__dirname+'/../../../')
  , wlconfig    = require(configPath).waterlock
  , method      = {}
;


exports.authType = authType;

/**
 * [installPath description]
 * @type {[type]}
 */
exports.installPath = installPath;

/**
 * Conditionally export mail trasport data if
 * user has opted for password tokens i.e. password
 * resets
 */
if (typeof wlconfig.authMethod[0] === 'object'){
  for (var i = 0; i < wlconfig.authMethod.length; i++){
    if(wlconfig.authMethod[i].name === 'waterlock-multiple-ldap-auth'){
      method = wlconfig.authMethod[i];
    }
  }
} else {
  method = wlconfig.authMethod;
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
exports.connection = _.merge(
  method.connection,
  {
    searchAttributes: _.union(['dn', 'entryUUID'], _.keys(method.attributes))
  }
);

/**
 * [actions description]
 * @type {[type]}
 */
exports.actions = require('./controllers');

/**
 * [model description]
 * @type {[type]}
 */
exports.model = require('./models');
