Ext.define('Atlas.atlasformulary.view.formularyconfig.RulesPanel', {
  extend: 'Ext.panel.Panel',
  xtype: 'formularyconfig-rulespanel',
  controller: 'formularyconfig-rulespanelcontroller',

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
      selectedTier: null,
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
      tiers: {
        type: 'formularytier',
        autoLoad: true,

        listeners: {
          load: 'onTiersLoaded'
        }
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
          xtype: 'checkbox',
          itemId: 'coveredCheckbox',
          boxLabel: 'Covered',
          flex: 1,

          bind: {
            value: '{coveredCheckBox}'
          }
        },
        {
          xtype: 'combobox',
          itemId: 'tierCombo',
          flex: 2,

          displayField: 'FrmlryTierName',
          valueField: 'FrmlryTierSK',

          bind: {
            value: '{selectedTier}',
            store: '{tiers}'
          },
          // Even though autoLoad is true on the store, the first click of the dropdown prompts it to load again (perhaps a result of this component being added dynamically?).
          // Setting queryMode to local here prevents the second load.
          queryMode: 'local'
        },
        {
          xtype: 'button',
          text: 'UM',
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
              text: 'Rules'
            },
            {
              text: 'Tiers',
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
          itemId: 'reviewButton',
          text: 'Submit for Review',
          handler: 'onSendForReviewClick'
        },
        {
          xtype: 'button',
          itemId: 'approveButton',
          text: 'Approve',
          handler: 'onApproveClick'
        },
        {
          xtype: 'button',
          itemId: 'rejectButton',
          text: 'Reject',
          handler: 'onRejectClick'
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
