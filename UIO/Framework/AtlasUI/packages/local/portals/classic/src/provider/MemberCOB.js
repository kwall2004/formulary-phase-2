Ext.define('Atlas.portals.view.provider.MemberCOB', {
  extend: 'Ext.panel.Panel',
  xtype: 'portalsMemberCOB',
  title: 'COB',

  controller: 'membercob',

  viewModel: {
    stores: {
      cobgrid: {
        model: 'Atlas.portals.provider.model.MemberLiabilityMasterExt'
      }
    }
  },

  items: [{
    xtype: 'container',

    items: [
      {
        xtype: 'gridpanel',
        title: 'COB',
        cls: 'card-panel',
        height: 500,
        scrollable: true,
        bind: '{cobgrid}',

        columns: [
          {
            text: 'Name',
            dataIndex: 'Carriername',
            flex: 1
          },
          {
            text: 'Group #',
            dataIndex: 'groupNumber',
            flex: 1
          },
          {
            text: 'Policy #',
            dataIndex: 'policyNum',
            flex: 1
          },
          {
            text: 'Effective Date',
            dataIndex: 'effDate',
            renderer: Ext.util.Format.dateRenderer('m/d/Y'),
            flex: 1
          },
          {
            text: 'Term Date',
            dataIndex: 'termDate',
            renderer: Ext.util.Format.dateRenderer('m/d/Y'),
            flex: 1
          }
        ],

        bbar: {
          xtype: 'pagingtoolbar',
          displayInfo: true,
          emptyMsg: '<span style="color: red">No Record(s) Found for COB</span>'
        }
      }
    ]
  }]
});