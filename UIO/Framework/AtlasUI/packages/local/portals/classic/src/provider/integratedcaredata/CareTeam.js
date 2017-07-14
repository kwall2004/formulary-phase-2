/**
 * Created by m4542 on 11/14/2016.
 */
Ext.define('Atlas.portals.provider.integratedcaredata.CareTeam', {
  extend: 'Ext.panel.Panel',
  xtype: 'careteam',
  title: 'Care Team',

  items: [
    {
      xtype: 'gridpanel',
      cls: 'card-panel',
      height: 300,
      maxHeight: 600,
      minHeight: 300,
      title: 'Care Team',
      bind: {
        store: '{CareTeamStore}'
      },
      columns: [
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICTFirstName',
          text: 'First Name'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICTLastName',
          text: 'Last Name'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICTRelationShip',
          text: 'Relationship'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICTAddress',
          text: 'Address'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICTCity',
          text: 'City'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICTState',
          text: 'State'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICTZipCode',
          text: 'Zip Code'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICTPhoneNumber',
          text: 'Phone Number'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICTPhoneExt',
          text: 'Extension'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICTFaxNumber',
          text: 'FAX'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICTEmail',
          text: 'eMail'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICTProviderOrg',
          text: 'Organization'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICTProviderSpecialty',
          text: 'Provider Specialty'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICTDateOfService',
          text: 'Recent Date of Service'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICTTaxonomy',
          text: 'Taxonomy'
        },
        {
          xtype: 'gridcolumn',
          dataIndex: 'ICTNPI',
          text: 'NPI'
        }
      ]
    }
  ]
});