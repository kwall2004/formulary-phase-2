Ext.define('Atlas.portals.view.rxmember.RxMemberUserGuide', {
  extend: 'Ext.panel.Panel',
  xtype: 'portalsrxmemberuserguide',
  title: 'User Guide',

  layout: {
    type: 'hbox',
    align: 'stretch'
  },

  items: [
    {
      html: '<iframe src="resources/rxmember/forms/MRx_Member_Portal_User_Guide_v1.pdf" width="100%" ' +
			'height="100%"></iframe>',
      flex: 1
    }
  ]
});