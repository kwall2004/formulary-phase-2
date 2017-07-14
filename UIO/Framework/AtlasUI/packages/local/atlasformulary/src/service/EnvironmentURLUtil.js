Ext.define('Atlas.atlasformulary.service.EnvironmentURLUtil', {
  singleton: true,

  getEnvironmentBaseURL: function () {
    if(Atlas.apidotnetURL.indexOf('localhost') == -1) {
      return Atlas.apidotnetURL + 'formulary';
    } else {
      return Atlas.apidotnetURL + 'formularyapi/api';
    }
  }
});
