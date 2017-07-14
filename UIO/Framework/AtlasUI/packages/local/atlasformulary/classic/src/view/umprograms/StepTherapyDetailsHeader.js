Ext.define('Atlas.atlasformulary.view.umprograms.StepTherapyDetailsHeader', {
  extend: 'Ext.panel.Panel',
  xtype: 'steptherapyconfig-steptherapydetailsheader',
  controller: 'steptherapydetailscontroller',
  cls: 'border-none',
  viewModel: 'steptherapydetails',

  initComponent: function (config) {
    this.getViewModel().set('programSK', this.programSK);
    this.getViewModel().set('mode', this.mode);
    this.getViewModel().set('titleMode', this.titleMode);
    this.getViewModel().set('formularyStatus', this.formularyStatus);
    this.callParent(config);
  },

  items: [
    {
      xtype: 'container',
      layout: 'column',

      items: [
        {
          xtype: 'container',
          columnWidth: 0.15,
          bodyPadding: 10,
          margin: 10,

          defaults: {
            labelAlign: 'right',
            labelWidth: 100
          },

          items: [
            {
              xtype: 'displayfield',
              fieldLabel: 'Program ID',
              bind: '{stepTherapyHeader.CvrgPrptyPgmSK}'//IS THIS RIGHT???
            },
            {
              xtype: 'displayfield',
              fieldLabel: 'Status',
              bind: '{stepTherapyHeader.Status}'
            }
          ]
        },
        {
          xtype: 'container',
          columnWidth: 0.35,
          bodyPadding: 10,
          margin: 10,

          layout: {
            type: 'vbox',
            align: 'stretch'
          },

          defaults: {
            labelAlign: 'right',
            labelWidth: 125
          },

          items: [
            {
              xtype: 'displayfield',
              fieldLabel: 'Program Name',
              bind: '{stepTherapyHeader.CvrgPrptyPgmName}'
            },
            {
              xtype: 'displayfield',
              fieldLabel: 'Data Source',
              bind: '{stepTherapyHeader.DrugRefDbSK}'//NEED NAME!!!
            }
          ]
        }
      ]
    }
  ]
});
