import {backendAPI} from './APIs';

/**
 * Represents Project API
 * @constructor
 */
export function ProjectService() {
  let _listener = () => {};

  const service = {
    async list() {
      return await backendAPI.get('/api/projects')
          .then((resp) => {
            return Promise.resolve(resp.data);
          })
          .catch((err) => {
            return Promise.reject(err.data);
          });
    },

    async create(name) {
      return await backendAPI.post('/api/projects/new', {name: name})
          .then((resp) => {
            _listener();
            return Promise.resolve(resp.data);
          })
          .catch((err) => {
            return Promise.reject(err.response.data);
          });
    },

    async get(id) {
      return await backendAPI.get(`/api/projects/${id}`)
          .then((resp) => {
            return Promise.resolve(resp.data);
          })
          .catch((err) => {
            return Promise.reject(err.response.data);
          });
    },

    async onChanged(listener) {
      _listener = listener;
    },
  };

  return service;
}
