'use strict';

var _           = require('lodash')
  , method      = require('../../waterlock-multiple-ldap-auth')
  , Ldap        = method.ldap
  , connections = method.connection
;

/**
 * Login action
 */
module.exports = function(req, res) {
  var failure = null, errorUser = null;

  // Iterate through each of our connections.
  _(connections).forEach(function(connection){
    if (!connection.url) {
      return;
    }
    
    var params   = req.params.all()
      , auth     = new Ldap(connection)
      , criteria = {
          username: params.username
        },
        attr = {
          username  : params.username,
          entryUUID : null,
          dn        : null
        }
    ;

    if (typeof params.username === 'undefined' || typeof params.password === 'undefined') {
      return waterlock.cycle.loginFailure(req, res, null, {
        error: 'Invalid username or password'
      });
    }

    auth.authenticate(params.username, params.password, function(err, user) {
      if (err || !user) {
        console.error(err);
        errorUser = user;
        failure = {error: 'Invalid username or password'}; return;
      }

      attr.entryUUID = user.entryUUID;
      attr.dn        = user.dn;

      _.forOwn(method.attributes, function(fields, oid) {
        _.forOwn(fields, function(definition, name) {
          if (user.hasOwnProperty(oid)) {
            attr[name] = user[oid];
          }
        });
      });

      waterlock.engine.findOrCreateAuth(criteria, attr, function(err, user) {
        if (err || !user) {
          console.error(err);
          errorUser = user;
          failure = {error: 'user not found'}; return;
        }

        return waterlock.cycle.loginSuccess(req, res, user);
      });
    });
  });

  if (failure) {
    return waterlock.cycle.loginFailure(req, res, errorUser, failure);
  }
};
