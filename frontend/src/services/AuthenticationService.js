import {backendAPI} from './APIs';

/**
 * Represents Authentication API
 * @constructor
 */
export function AuthenticationService() {
  let _user = null;
  let _listener = function(user) {};
  backendAPI.get('/api/user')
      .then((resp) => {
        _user = resp.data;
        console.debug('State 1');
        _listener(_user);
      }).catch(() => {
        _user = null;
        _listener(_user);
      });


  const service = {
    get isAuthenticated() {
      return _user != null;
    },

    get user() {
      return _user;
    },

    async logout() {
      await backendAPI.get('/api/logout').finally(() => {
        _user = null;
        _listener(_user);
      });
    },

    onChange(callback) {
      _listener = callback;
    },
  };

  return service;
}
