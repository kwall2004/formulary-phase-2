Ext.define('Atlas.atlasformulary.data.proxy.FormularyAjax', {
  extend: 'Ext.data.Connection',
  singleton: true,

  listeners: {
    requestexception: function (conn, response) {
      Atlas.atlasformulary.service.FormularyRestException.exception(response);
    }
  }
});