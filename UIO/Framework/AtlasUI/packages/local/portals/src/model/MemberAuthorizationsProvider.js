/**
 * Created by c4147 on 12/9/2016.
 */
Ext.define('Atlas.portals.model.MemberAuthorizationsProvider', {
  extend: 'Atlas.common.model.Base',
  proxy: {
    url: 'member/hp/authprovinfo'
  }
});