/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.careteam.CareGiverHeader', {
  extend: 'Ext.Container',
  xtype: 'caregiverheader',
  title: 'Care Giver List',
  controller: 'caregiverheadercontroller',
  viewModel: 'caregivermodel',

  items: [
        /* include child components here */
    {
      xtype: 'gridpanel',
      title: 'Care Giver List',
      reference: 'caregiverheaderpanel',
      height: 250,
      cls: 'card-panel',
      bind: {
        store: '{caregiverheaderstore}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          flex: 1,
          dataIndex: 'ttProvID',
          text: 'Provider ID'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'formattedTTCareGiverID',
          text: 'CareGiver ID',
          flex: 1
        },
        {
          xtype: 'gridcolumn',
          flex: 1,
          dataIndex: 'ttfirstName',
          text: 'First Name'
        },
        {
          xtype: 'gridcolumn',
          flex: 1,
          dataIndex: 'ttlastName',
          text: 'Last Name'
        },
        {
          xtype: 'gridcolumn',
          flex: 1,
          dataIndex: 'ttspecialty',
          text: 'Specialty'
        },
        {
          xtype: 'gridcolumn',
          flex: 1,
          dataIndex: 'ttcareGiverType',
          text: 'Participant Type'
        },
        {
          xtype: 'gridcolumn',
          hidden: true,
          dataIndex: 'ttrecipientID',
          text: 'TtRecipientID',
          flex: 1
        },
        {
          xtype: 'gridcolumn',
          hidden: true,
          dataIndex: 'ttCareGiverIND',
          text: 'TtCareGiverIND',
          flex: 1
        }
      ],

      bbar: {
        xtype: 'pagingtoolbar',

        displayInfo: true,

        emptyMsg: 'No Care Givers to display.'
      },

      listeners: {
        itemclick: 'onCareGiverGridClick'
      }
    }]
});