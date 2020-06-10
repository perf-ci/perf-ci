import {backendAPI} from './APIs';

/**
 * Represents Project API
 * @constructor
 */
export function ProjectService() {
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
            return Promise.resolve(resp.data);
          })
          .catch((err) => {
            return Promise.reject(err.response.data);
          });
    },
  };

  return service;
}
