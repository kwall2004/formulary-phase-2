Ext.define('Atlas.controller.Error', {
  extend: 'Ext.app.Controller',
  alias: 'controller.error',
  listen: {
    controller: {
      '*': {
        'Error': 'onError',
        'Error:Critical': 'onErrorCritical',
        'Error:Server': 'onServerError',
        'Error:Timeout': 'onTimeout'
      }
    }
  },

  onError: function (error) {
    console.warn(error);
  },

  onErrorCritical: function (error) {
    console.error('Critical Error:', error);
  },

  onServerError: function (error) {
    console.error('Sever Error:', error);
  },

  onTimeout: function (error) {
    console.error('Timeout:', error);
  }
});
