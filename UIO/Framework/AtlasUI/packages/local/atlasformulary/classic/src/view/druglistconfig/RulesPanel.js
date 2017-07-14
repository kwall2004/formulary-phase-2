Ext.define('Atlas.atlasformulary.view.druglistconfig.RulesPanel', {
  extend: 'Ext.panel.Panel',
  xtype: 'druglistconfig-rulespanel',
  controller: 'druglistconfig-rulespanelcontroller',
  scrollable: true,

  viewModel: {
    data: {
      drugListSK: null,
      coveredCheckBox: false,
      mode: 'read',
      saveRuleButtonText: 'Create Rule'
    }
  },

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      layout: 'center',
      items: [
        {
          xtype: 'segmentedbutton',
          allowMultiple: false,
          items: [
            {
              text: 'Rules',
              pressed: true
            }
          ]
        }
      ]
    },
    {
      xtype: 'toolbar',
      dock: 'bottom',
      layout: 'column',
      items: [
        {
          xtype: 'button',
          itemId: 'backButton',
          text: 'Back',
          handler: 'onBackPressed'
        },
        {
          xtype: 'button',
          itemId: 'saveRuleButton',
          text: 'Create Rule',
          handler: 'onSaveRuleClick',

          bind: {
            text: '{saveRuleButtonText}'
          }
        },
        {
          xtype: 'button',
          itemId: 'deleteRuleButton',
          text: 'Delete Rule',
          handler: 'onDeleteRuleClick'
        }
      ]
    }
  ],

  items: [
    {
      xtype: 'panel',
      itemId: 'contentPlaceHolder',
      layout: {
        type: 'fit',
        align: 'stretch'
      }
    }
  ]
});
