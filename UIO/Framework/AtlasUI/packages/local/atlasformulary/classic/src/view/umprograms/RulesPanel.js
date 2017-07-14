Ext.define('Atlas.atlasformulary.view.umprograms.RulesPanel', {
  extend: 'Ext.panel.Panel',
  xtype: 'steptherapyconfig-rulespanel',
  controller: 'steptherapyconfig-rulespanelcontroller',

  scrollable: true,

  layout: {
    type: 'fit',
    align: 'stretch'
  },

  viewModel: {
    data: {
      formularySK: null,
      formularyStatus: 'Draft',
      coveredCheckBox: false,
      mode: 'read',
      saveRuleButtonText: 'Create Rule'
    },
    stores: {
      reviewpriority: {
        type: 'formularyreviewpriority'
      },
      reviewapprove: {
        type: 'formularyreviewapprove'
      },
      steps: {
        fields: ['Display', 'Value']
      }
    }
  },

  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'top',
      layout: 'column',
      items: [
        {
          xtype: 'combobox',
          itemId: 'stepCombo',
          flex: 2,

          displayField: 'Display',
          valueField: 'Name',

          bind: {
            store: '{steps}'
          },
          // Even though autoLoad is true on the store, the first click of the dropdown prompts it to load again (perhaps a result of this component being added dynamically?).
          // Setting queryMode to local here prevents the second load.
          queryMode: 'local'
        },
        {
          xtype: 'button',
          text: 'Criteria',
          flex: 1,
          handler: 'showUMCriteria'
        }
      ]
    },
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
          ],

          listeners: {
            toggle: 'onViewButtonsToggled'
          }
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
          handler: 'onDeleteRuleClick',
          disabled: true
        },
        {
          xtype: 'button',
          itemId: 'activateButton',
          text: 'Activate',
          handler: 'onActivateClick'
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
  ],

  listeners: {
    resize: 'onResize'
  }
});
