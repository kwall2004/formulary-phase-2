Ext.define('Atlas.portals.model.MemberAuthorizations', {
  extend: 'Atlas.common.model.Base',
  proxy: {
    extraParams: {
      'pListName': 'AuthStatus'
    },
    url: 'member/hp/listitems'
  }
});