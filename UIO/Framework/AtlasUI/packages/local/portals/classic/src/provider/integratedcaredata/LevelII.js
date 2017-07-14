/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.integratedcaredata.LevelII', {
  extend: 'Ext.panel.Panel',
  xtype: 'levelii',
  title: 'Level II',

  items: [
    {
      xtype: 'gridpanel',
      cls: 'card-panel',
      height: 300,
      scrollable: true,
      maxHeight: 600,
      minHeight: 300,
      title: 'Level II',
      bind: {
        store: '{LevelTwoAssessment}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          width: 159,
          dataIndex: 'levelIIIDType',
          text: 'Level II ID Type'
        },
        {
          xtype: 'gridcolumn',
          width: 159,
          dataIndex: 'score',
          text: 'Score'
        },
        {
          xtype: 'gridcolumn',
          width: 159,
          dataIndex: 'BHServiceRequired',
          text: 'PIHP BH Services Required'
        },
        {
          xtype: 'gridcolumn',
          width: 159,
          dataIndex: 'advanceDirectives',
          text: 'Advanced Directives'
        },
        {
          xtype: 'datecolumn',
          width: 159,
          dataIndex: 'dateTimeStamp',
          text: 'Date/Time Stamp',
          format: 'm/d/Y H:i'
        }
      ]
    }
  ]
});