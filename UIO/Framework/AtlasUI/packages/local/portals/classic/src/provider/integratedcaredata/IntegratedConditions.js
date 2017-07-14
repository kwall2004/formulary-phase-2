/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.integratedcaredata.IntegratedConditions', {
  extend: 'Ext.panel.Panel',
  xtype: 'integratedconditions',
  title: 'Integrated Conditions',

  items: [
    {
      xtype: 'gridpanel',
      cls: 'card-panel',
      height: 250,
      scrollable: true,
      maxHeight: 400,
      minHeight: 200,
      titleAlign: 'center',
      title: 'Medical (Top 10)',

      bind: {
        store: '{IntegratedConditionsStoreMed}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          flex: 1,
          dataIndex: 'diagCodes',
          text: 'Diag Code'
        },
        {
          xtype: 'gridcolumn',
          flex: 1,
          dataIndex: 'diagDescription',
          text: 'Diagnosis'
        },
        {
          xtype: 'gridcolumn',
          flex: 1,
          dataIndex: 'diagType',
          text: 'Diag Type'
        },
        {
          xtype: 'gridcolumn',
          flex: 1,
          dataIndex: 'dateOfService',
          text: 'Last Date of Service'
        },
        {
          xtype: 'gridcolumn',
          flex: 1,
          dataIndex: 'NPI',
          text: 'NPI on Last Claim'
        },
        {
          xtype: 'gridcolumn',
          flex: 1,
          hidden: true,
          dataIndex: 'conditionSource',
          text: 'Condition Source'
        }
      ]
    },
    {
      xtype: 'gridpanel',
      cls: 'card-panel',
      height: 250,
      scrollable: true,
      maxHeight: 400,
      minHeight: 200,
      titleAlign: 'center',
      title: 'Behavioral (Top 10)',
      bind: {
        store: '{IntegratedConditionsStoreBehavior}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          flex: 1,
          dataIndex: 'diagCodesBehavior',
          text: 'Diag Code'
        },
        {
          xtype: 'gridcolumn',
          flex: 1,
          dataIndex: 'diagDescriptionBehavior',
          text: 'Diagnosis'
        },
        {
          xtype: 'gridcolumn',
          flex: 1,
          dataIndex: 'diagTypeBehavior',
          text: 'Diag Type'
        },
        {
          xtype: 'gridcolumn',
          flex: 1,
          dataIndex: 'dateOfServiceBHBehavior',
          text: 'Last Date of Service'
        },
        {
          xtype: 'gridcolumn',
          flex: 1,
          dataIndex: 'NPIBHBehavior',
          text: 'NPI on Last Claim'
        },
        {
          xtype: 'gridcolumn',
          flex: 1,
          hidden: true,
          dataIndex: 'conditionSourceBehavior',
          text: 'Condition Source'
        }
      ]
    }
  ]
});