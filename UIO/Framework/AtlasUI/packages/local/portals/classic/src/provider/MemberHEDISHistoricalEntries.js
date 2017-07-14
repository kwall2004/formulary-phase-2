Ext.define('Atlas.portals.view.provider.MemberHEDISHistoricalEntries', {
    extend: 'Ext.window.Window',
    xtype: 'portalsMemberHEDISHistoricalEntries',
    title: 'HEDIS Historical Entries',

    controller: 'memberhedishistoricalentries',
    viewModel: {

    },
    width: 900,

    items: [
        {
            xtype: 'form',
            cls: 'card-panel',
            bind: {
                title: '{title}'
            },
            items: [
                {
                    xtype: 'toolbar',
                    defaults: {
                        labelWidth: 125,
                        flex: 1
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Member ID',
                            reference: 'memberId'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Measure',
                            reference: 'measureText'
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    defaults: {
                        labelWidth: 125,
                        flex: 1
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Service Due By',
                            reference: 'serviceDueText'
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Sub Measure',
                            reference: 'subMeasureText'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'grid',
            cls: 'card-panel',
            forceFit: true,
            columns: [
                {
                    text: 'Entry Date'
                },
                {
                    text: 'Entry By'
                }
            ]
        }
    ],

    initComponent: function () {
        var me = this;
        me.getViewModel().data.recipientId = me.itemConfig.recipientId;
        me.getViewModel().data.measure = me.itemConfig.measure;
        me.getViewModel().data.numerator = me.itemConfig.numerator;
        me.getViewModel().data.measureDesc = me.itemConfig.measureDesc;
        me.getViewModel().data.memberAge = me.itemConfig.memberAge;
        me.getViewModel().data.subMeasure = me.itemConfig.subMeasure;
        me.getViewModel().data.trn = me.itemConfig.trn;
        me.getViewModel().data.memberId = me.itemConfig.memberId;
        me.getViewModel().data.dueBy = me.itemConfig.dueBy;
        me.callParent();
    }

});