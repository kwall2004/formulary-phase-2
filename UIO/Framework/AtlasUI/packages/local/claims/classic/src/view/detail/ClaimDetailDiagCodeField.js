Ext.define('Atlas.claims.view.detail.ClaimDetailDiagCodeField', {
    extend: 'Ext.Container',
    xtype: 'diagCodeField',
    config: {
        labelText: '',
        fieldText: '',
        idNum: 0
    },
    
    constructor: function (config) {
        this.callParent(arguments);
        var fieldObj = this.down().down();
        fieldObj.setFieldLabel(this.labelText);     
        fieldObj.setValue(this.fieldText);
        var parentController = this.findParentByType('ClaimDetailStatusClaimDetailMedical').getController('claimDetailMedical');
        parentController.fieldIDs.push({id: this.idNum, ref: this});
    },

    addDiagCode: 'addDiagCode',
    layout: 'vbox',
    width: 300,
    defaults: { labelWidth: 300 },
    items: [{
        xtype: 'fieldcontainer',
        layout: 'hbox',
        items: [{
            xtype: 'displayfield',
            width: 200,
            value: 'TBD'
        }, {
            iconCls: 'pictos pictos-search',
            xtype: 'button',
            style: 'padding: 2px',
            listeners: {
                click: function () {
                    var parentObj = this.findParentByType('fieldcontainer');
                    var fieldObj = parentObj.down();
                    /**
                        this should call a dialog or something to select a diag code,
                        also needs to be hooked into store                    
                    **/
                    fieldObj.setValue('It Worked!');
                }
            }
        }, {
            iconCls: 'pictos pictos-info',
            xtype: 'button',
            style: 'padding: 2px; margin-top: 1px:'
        }]
    }]
    
});