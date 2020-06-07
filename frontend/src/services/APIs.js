import axios from 'axios';

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_BACKEND_URL === undefined ? 'https://0.0.0.0:8000' : process.env.REACT_APP_BACKEND_URL;

export const backendAPI = axios.create({
  // withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN',
  baseURL: baseURL,
  timeout: 30000,
});

backendAPI.setRefreshTokenErrorListener = function(func = () => null) {
  backendAPI.refreshTokenErrorListener = func;
};

backendAPI.isRefreshingToken = false;

/**
 * Refreshes JWT token
 * @param {Object} user must have refresh_token
 * @param {Object} config
 * @return {Promise}
 */
export async function refreshToken(user, config) {
  backendAPI.isRefreshingToken = true;
  return await backendAPI
      .post('/api/v1/auth_refresh/', {refresh: user.refresh_token}, config)
      .then((resp) => {
        backendAPI.isRefreshingToken = false;
        // New request with new token
        if (config !== undefined) {
          config.headers['Authorization'] = `Bearer ${resp.data.access}`;
          return new Promise((resolve, reject) => {
            axios.request(config).then((response) => {
              backendAPI.defaults
                  .headers['Authorization'] = `Bearer ${resp.data.access}`;
              resolve(response);
            }).catch((error) => {
              reject(error);
            });
          });
        }

        backendAPI.defaults
            .headers['Authorization'] = `Bearer ${resp.data.access}`;
        return Promise.resolve();
      })
      .catch((error) => {
        return Promise.reject(error);
      });
}

backendAPI.interceptors.response.use((response) => {
  // Return a successful response back to the calling service
  return response;
}, (error) => {
  // Return any error which is not due to authentication back
  // to the calling service
  if (error.response === undefined || error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  if (backendAPI.isRefreshingToken) {
    backendAPI.isRefreshingToken = false;
    backendAPI.refreshTokenErrorListener();
  }

  // Try request again with new token
  const userJson = localStorage.getItem('user');
  if (userJson === null || userJson === undefined) {
    return new Promise((resolve, reject) => reject(error));
  }

  const user = JSON.parse(userJson);
  return refreshToken(user, error.config);
});
