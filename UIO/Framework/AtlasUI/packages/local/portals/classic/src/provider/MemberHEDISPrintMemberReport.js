Ext.define('Atlas.portals.view.provider.MemberHEDISPrintMemberReport', {
  extend: 'Ext.window.Window',
  xtype: 'portalsMemberHEDISPrintMemberReport',
  title: 'Print Member Report',
  controller: 'memberhedisprintmemberreport',
  viewModel: {},
  modal: true,
  reference: 'printMemberReportWindow',

  items: [
    {
      xtype: 'form',
      cls: 'card-panel',
      title: 'Adult BMI Information',

      items: [
        {
          xtype: 'displayfield',
          fieldLabel: 'Include'
        },
        {
          xtype: 'checkboxgroup',
          reference: 'memberReportGroup',
      
          items: [
            {
              boxLabel: 'Family Members',
              name: 'familyMembers',
              reference: 'familyMembersBox'
            },
            {
              boxLabel: 'Eligibility History',
              name: 'eligibilityHistory',
              reference: 'eligibilityHistoryBox'
            },
            {
              boxLabel: 'HEDIS',
              name: 'hedis',
              reference: 'hedisBox'
            }
          ],

          listeners: {
            change: 'memberReportGroup'
          }
        },
        {
          xtype: 'checkboxgroup',
          reference: 'memberProfileGroup',

          items: [
            {
              boxLabel: 'Member Profile',
              name: 'memberProfile',
              reference: 'memberProfileBox'
            }
          ],

          listeners: {
            change: 'memberProfileGroup'
          }
        },
        {
          xtype: 'checkboxgroup',
          reference: 'printHraGroup',

          items: [
            {
              boxLabel: 'Print HRA Summary',
              name: 'printHRA',
              reference: 'printHRABox'
            },
            {
              boxLabel: 'Six-Month Pharmacy Detail',
              name: 'sixMonthPharmacy',
              reference: 'sixMonthPharmacyBox'
            }
          ],

          listeners: {
            change: 'printHraGroup'
          }
        },
        {
          xtype: 'textfield',
          fieldLabel: 'lobRep:',
          reference: 'lobRep',
          hidden: true
        }
      ],

      bbar: ['->',{
        xtype: 'button',
        text: 'Ok',
        handler: 'generateReport'
      },
      {
        xtype: 'button',
        text: 'Cancel',
        handler: function () {
          this.up().up().up().close();
        }
      },'->']
    }
  ],

  initComponent: function () {
    var me = this;

    me.getViewModel().data.recipientId = me.itemConfig.recipientId;
    me.getViewModel().data.lobId = me.itemConfig.lobId;
    me.callParent();
  }
});