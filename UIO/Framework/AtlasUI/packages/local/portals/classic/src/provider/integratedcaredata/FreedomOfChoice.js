/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.integratedcaredata.FreedomOfChoice', {
  extend: 'Ext.panel.Panel',
  xtype: 'freedomofchoice',
  hidden: true,
  scrollable: true,
  title: 'Freedom of Choice',

  items: [{
    xtype: 'container',
    layout: 'hbox',
    items: [
      {
        xtype: 'gridpanel',
        scrollable: true,
        height: 200,
        margin: '10px 0 0 0',
        maxHeight: 400,
        minHeight: 200,
        title: '',
        columns: [
          {
            xtype: 'gridcolumn',
            dataIndex: 'fAssessmentLevel',
            text: 'Assessment Level'
          },
          {
            xtype: 'gridcolumn',
            dataIndex: 'fDateTime',
            text: 'Date/Time'
          }
        ]
      }
    ]
  }]
});