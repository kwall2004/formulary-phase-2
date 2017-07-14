/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.integratedcaredata.NursingFacility', {
  extend: 'Ext.panel.Panel',
  xtype: 'nursingfacility',
  title: 'Nursing Facility',

  items: [
    {
      xtype: 'gridpanel',
      cls: 'card-panel',
      height: 200,
      minWidth: 400,
      maxWidth: 1400,
      scrollable: true,
      maxHeight: 600,
      minHeight: 300,
      title: 'Nursing Facility',
      bind: {
        store: '{NurseFacilityStore}'
      },

      defaults: {
        xtype: 'gridcolumn'
      },
      columns: [
        {
          dataIndex: 'NFLocation',
          text: 'Location',
          flex: 1
        },
        {
          dataIndex: 'determinationStatus',
          text: 'Status',
          flex: 1
        },
        {
          dataIndex: 'startDate',
          text: 'Start Date',
          flex: 1
        },
        {
          dataIndex: 'endDate',
          text: 'Completion Date',
          flex: 1
        },
        {
          dataIndex: 'comments',
          text: 'Comments',
          flex: 1
        }
      ]
    }
  ]
});