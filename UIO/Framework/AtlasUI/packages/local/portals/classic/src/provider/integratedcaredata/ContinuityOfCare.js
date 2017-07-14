/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.integratedcaredata.ContinuityOfCare', {
  extend: 'Ext.panel.Panel',
  xtype: 'continuityofcare',
  title: 'Continuity Of Care',

  items: [
    {
      xtype: 'gridpanel',
      cls: 'card-panel',
      height: 300,
      scrollable: true,
      maxHeight: 600,
      minHeight: 300,
      title: 'Continuity Of Care',
      bind: {
        store: '{ContinuityOfCareStore}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          dataIndex: 'waiveredServices',
          text: 'Waiver Code',
          flex: 1
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'allergies',
          text: 'Allergies',
          flex: 1
        }
      ]
    }
  ]
});