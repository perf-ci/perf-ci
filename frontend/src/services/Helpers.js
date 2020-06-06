
/**
 * Adds HTTTP status to error object if error.response is defined.
 * If there is no response it return s{error: error.message}
 * @param {Object} error
 * @return {Promise}
 */
export default function handleHttpError(error) {
  return Promise.reject(
      error.response !== undefined && error.response.data !== undefined ?
          Object.assign(
              error.response.data,
              {httpStatus: error.response.status}) :
          {error: error.message});
}
