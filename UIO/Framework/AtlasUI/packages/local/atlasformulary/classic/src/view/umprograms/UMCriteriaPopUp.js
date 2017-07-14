Ext.define('Atlas.atlasformulary.view.umprograms.UMCriteriaPopUp', {
  extend: 'Ext.window.Window',
  xtype: 'umprograms-umcriteriapopup',
  title: 'UM Criteria',
  height: '60%',
  width: '60%',
  region: 'center',
  modal: true,
  viewModel: 'umcriteriapopup',
  controller: 'umcriteriapopup',
  scrollable: true,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  dockedItems: [
    {
      xtype: 'toolbar',
      dock: 'bottom',
      ui: 'footer',
      layout: {
        pack: 'end',
        type: 'hbox'
      },
      items: [
        {
          xtype: 'button',
          text: 'Save',
          itemId: 'btnSave',
          handler: 'onSave',
          bind: {
            disabled: '{viewOnly}'
          }
        },
        {
          xtype: 'button',
          text: 'Cancel',
          itemId: 'btnCancel',
          handler: 'onCancel'
        }
      ]

    }
  ],
  /* eslint-disable object-curly-newline */
  items: [
    { xtype: 'umprograms-umcriteriapanel1' },
    { xtype: 'umprograms-umcriteriapanel2' },
    { xtype: 'umprograms-umcriteriapanel3' },
    { xtype: 'umprograms-umcriteriapanel4containerholder' },
    { xtype: 'umprograms-umcriteriapanel5containerholder' },
    { xtype: 'umprograms-umcriteriapanel6' }
  ],
  /* eslint-enable object-curly-newline */
  initComponent: function () {
    var me = this;

    if (me.itemConfig.tgtDrugCatgSK) {
      var theModel = Atlas.atlasformulary.model.UMCriteria.load(me.itemConfig.tgtDrugCatgSK);
      me.getViewModel().data.umcriteriarec = theModel;

      theModel.set('UserId', me.itemConfig.tgtUserid);
      theModel.set('DrugCatgSK', me.itemConfig.tgtDrugCatgSK);
      theModel.set('FrmlrySK', me.itemConfig.tgtFrmlryTierSK);
      theModel.set('IsCovered', me.itemConfig.tgtIsCovered);
      theModel.set('UserId', me.itemConfig.tgtUserid);

      me.getViewModel().set('mode', me.itemConfig.tgtMode);
    }

    me.callParent();
  }
});
