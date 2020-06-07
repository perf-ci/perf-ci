import {backendAPI} from './APIs';
import handleHttpError from './Helpers';

/**
 * Represents Authentication API
 * @constructor
 */
export function AuthenticationService() {
  const userJson = localStorage.getItem('user');
  let _user = userJson != null ? JSON.parse(userJson) : null;
  let _errorMessage = '';

  const service = {
    get isAuthenticated() {
      return _user != null;
    },

    get username() {
      return this.isAuthenticated ? _user.username : null;
    },

    get token() {
      return this.isAuthenticated ? _user.token : null;
    },

    get lastErrorMessage() {
      return _errorMessage;
    },
    async login() {
      this.logout();

      await backendAPI.get('/github/login', {})
          .then((resp) => {
            console.log(resp.data);
            // _user = {username: username, refresh_token: resp.data.refresh};
            // localStorage.setItem('user', JSON.stringify(_user));
            //
            // const config = resp.config;
            // config.headers['Authorization'] = `Bearer ${resp.data.access}`;
            // backendAPI.request(config);
          })
          .catch((error) => {
            if (error.config !== undefined) { // for tests
              error.config.headers['Authorization'] = null;
            }

            if (error.response !== undefined && error.response.status === 401) {
              _errorMessage = 'Incorrect username or password.';
            } else {
              _errorMessage = error.message;
            }
          });

      if (this.listener !== undefined) {
        this.listener(this);
      }
      return [this.isAuthenticated, _errorMessage];
    },

    logout() {
      _errorMessage = '';
      _user = null;
      localStorage.removeItem('user');

      if (this.listener !== undefined) {
        this.listener(this);
      }
    },

    onChanged(func) {
      this.listener = func;
    },
  };

  backendAPI.setRefreshTokenErrorListener(() => service.logout());
  return service;
}
