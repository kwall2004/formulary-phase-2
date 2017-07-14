/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.view.provider.careteam.CareTeamMain', {
  extend: 'Ext.panel.Panel',
  title: 'Care Team',
  xtype: 'careteammain',

  items: [{
    xtype: 'container',

    items: [
      {
        xtype: 'caregiverheader'
      },
      {
        xtype: 'caredetailinfo'
      }
    ]
  }]
});