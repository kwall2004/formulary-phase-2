Ext.define('Atlas.portals.provider.UserGuideController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.portalsprovideruserguide',

  init: function () {
    Ext.getCmp('mypanel').setHtml('<iframe src=\'resources/provider/forms/MHPProviderPortalUserGuide.pdf\' ' +
    'height=\'100%\' width=\'100%\'></iframe>');
  }
});