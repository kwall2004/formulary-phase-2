/**
 * Created by c4539 on 11/14/2016.
 */
Ext.define('Atlas.portals.view.provider.MemberSearchWindow', {
  extend: 'Ext.Container',
  xtype: 'portalsprovidermembersearchwindow',
  controller: 'portalsprovidermembersearchwindow',
  layout: 'border',
  width: 690,
  height: 390,
  items: [
    {
      xtype: 'panel',
      cls: 'formPanel',
      style: {
        padding: '10px'
      },
      region: 'north',
      layout: {
        type: 'hbox',
        align: 'center'
      },
      items: [
        {
          xtype: 'textfield',
          reference: 'memberInput',
          flex: 1
        },
        {
          xtype: 'button',
          text: 'Search',
          iconCls: 'x-fa fa-search',
          handler: 'memberSearch',
          reference: 'memberSearchButton'
        }
      ],
      defaultButton: 'memberSearchButton'
    },
    {
      xtype: 'container',
      region: 'north',
      bind: {
        html: '<span style="color:red;">{errorMessage}</span>'
      }
    },
    {
      xtype: 'grid',
      region: 'center',
      title: 'Member Details',
      columns: [
        {
          text: 'Member ID',
          dataIndex: 'membeRID',
          flex: 1
        },
        {
          text: 'Last Name',
          dataIndex: 'lastName',
          flex: 1
        },
        {
          text: 'First Name',
          dataIndex: 'firstName',
          flex: 1
        },
        {
          text: 'Sex',
          dataIndex: 'gender'
        },
        {
          text: 'Birth Date',
          dataIndex: 'birthDate',
          flex: 1,
          xtype: 'datecolumn',
          format: 'm/d/Y'
        },
        {
          text: 'SSN',
          dataIndex: 'socSecnum',
          flex: 1
        },
        {
          text: 'Case #',
          dataIndex: 'caseNumber',
          flex: 1
        }
      ],
      bind: {
        store: '{memberSearch}'
      },
      listeners: {
        rowclick: 'onRowClick',
        rowdblclick: 'onRowDblClick'
      }
    },
    {
      xtype: 'toolbar',
      region: 'south',
      items: ['->',
        {
          xtype: 'button',
          text: 'OK',
          handler: 'onOKClick'
        },
        {
          xtype: 'button',
          text: 'Cancel',
          handler: 'onCancelClick'
        }, '->'
      ]
    }
  ]
});