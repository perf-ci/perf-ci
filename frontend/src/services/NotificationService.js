// eslint-disable-next-line require-jsdoc
export function NotificationService() {
  let _listener = (error, msg) => {
  };

  const _cleanFunc = () => {
    _listener(false, '');
  };

  const service = {
    notifyError(message) {
      _listener(true, message);
      window.setTimeout(_cleanFunc, 3000);
    },

    notifySuccess(message) {
      _listener(false, message);
      window.setTimeout(_cleanFunc, 3000);
    },

    onNotified(listener) {
      _listener = listener;
    },
  };

  return service;
}
