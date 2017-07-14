Ext.define('Atlas.atlasformulary.data.proxy.FormularyProxy', {
  extend: 'Ext.data.proxy.Rest',
  alias: 'proxy.formulary',

  requires: [
    'Atlas.common.service.URLHelper'
  ],

  // Keep a default copy of the action methods here. Ideally could just null
  // out actionMethods and just check if it exists & has a property, otherwise
  // fallback to the default. But at the moment it's defined as a public property,
  // so we need to be able to maintain the ability to modify/access it.
  actionMethods: {
    create: 'POST',
    read: 'GET',
    update: 'PUT',
    destroy: 'DELETE'
  },

  noCache: false,
  useDefaultXhrHeader: false,
  limitParam: null,
  pageParam: null,
  startParam: null,
  sortParam: null,
  paramsAsJson: true,
  headers: {
    'Content-Type': 'application/json'
  },
  reader: {
    type: 'json',
    rootProperty: 'Rows',
    totalProperty: 'Count'
  },
  writer: {
    type: 'json',
    writeAllFields: true
  },
  /**
   * Get the url for the request taking into account the order of priority,
   * - The request
   * - The api
   * - The url
   * @private
   * @param {Ext.data.Request} request The request
   * @return {String} The url
   */
  getUrl: function (request) {
    var proxy = request.getProxy(),
      operation = request.getOperation(),
      idString = '';

    if (request) {
      // Add Routine to format this outside of this code
      // Enable one spot to handle all special assignment of query string parameters.

      if (request.getAction() === 'read' && request.getOperation().getId()) {
        idString = '?' + proxy.getIdParam() + '=' + operation.getId();
        if (request.config.proxy.treeTypeParam) {
          idString = idString + '?treeType=' + request.config.proxy.treeTypeParam;
        }
      }

      if (request.getAction() === 'destroy' && Boolean(proxy.skParam)) {
        idString = '?' + proxy.getIdParam() + '=' + proxy.skParam;
      }

      return Atlas.atlasformulary.service.EnvironmentURLUtil.getEnvironmentBaseURL() + proxy.url + idString;
    }

    return this.callParent(arguments);
  },

  listeners: {
    exception: function (proxy, response) {
      Atlas.atlasformulary.service.FormularyRestException.exception(response);
    }
  }
});