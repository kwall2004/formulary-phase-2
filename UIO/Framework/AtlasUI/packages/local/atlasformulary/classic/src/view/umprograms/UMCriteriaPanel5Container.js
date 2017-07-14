Ext.define('Atlas.member.view.memberprofile.UMCriteriaPanel5Container', {
  extend: 'Ext.form.FieldContainer',
  xtype: 'umprograms-umcriteriapanel5container',
  layout: {
    type: 'column'
  },
  defaults: {
    labelWidth: 0,
    labelAlign: ''
  },
  initComponent: function () {
    var me = this;
    me.defaults.labelWidth = this.itemConfig.tgtLblWidth;
    me.defaults.labelAlign = this.itemConfig.tgtLblAlign;
    me.items = [
      {
        xtype: 'container',
        columnWidth: 0.25,
        layout: 'anchor',
        flex: 1,
        defaults: {
          xtype: 'displayfield',
          labelWidth: 180,
          width: 180,
          labelAlign: 'right'
        },
        items: [
          {
            fieldLabel: this.itemConfig.tgtLabel
          }
        ]
      },
      {

        xtype: 'container',
        columnWidth: 0.25,
        layout: 'anchor',
        flex: 1,
        defaults: {
          xtype: 'textfield',
          labelWidth: 40,
          width: 120
        },
        items: [
          {
            fieldLabel: 'Min',
            name: this.itemConfig.tgtItem1,
            itemId: this.itemConfig.tgtItem1,
            bind: this.itemConfig.tgtBind1
          }
        ]
      },
      {
        xtype: 'container',
        columnWidth: 0.25,
        layout: 'anchor',
        flex: 1,
        defaults: {
          xtype: 'textfield',
          labelWidth: 40,
          width: 120
        },
        items: [
          {
            fieldLabel: 'Max',
            name: this.itemConfig.tgtItem2,
            itemId: this.itemConfig.tgtItem2,
            bind: this.itemConfig.tgtBind2
          }
        ]
      },
      {
        xtype: 'container',
        columnWidth: 0.25,
        layout: 'anchor',
        flex: 1,
        defaults: {
          xtype: 'textfield',
          labelWidth: 40,
          width: 190,
          padding: '0 10 0 0'
        },
        items: [
          {
            xtype: 'combo',
            editable: true,
            name: this.itemConfig.tgtItem3,
            itemId: this.itemConfig.tgtItem3,
            fieldLabel: 'Units',
            emptyText: 'Days / Years',
            displayField: 'name',
            valueField: 'value',
            bind: {
              store: '{rxFillsList}',
              value: this.itemConfig.tgtBind3
            }
          }
        ]
      }
    ];

    me.itemId = 'fc' + this.itemConfig.tgtName;
    me.callParent();
  }
});