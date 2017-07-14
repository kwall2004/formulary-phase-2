/**
 * Created by n6684 on 11/21/2016.
 */

Ext.define('Atlas.authohrization.view.PopupAddRelationShip', {
    extend: 'Ext.window.Window',
    xtype: 'createeditpharmacy_popupaddrelationship',
    viewModel: 'createeditpharmacy_popupaddrelationshipviewmodel',
    controller: 'createeditpharmacy_popupaddrelationshipcontroller',
    width: 400,
    height: 212,
    modal: true,

    title:'Add Relationship/Payment Center',
    items: [
        {
            xtype: 'form',
            flex: 1,
            itemId:'frmaddupdaterelationship',
            layout:'vbox',
            defaults: {
                labelWidth: 175
            },
            items: [{
                fieldLabel: 'Relationship',
                xtype: 'relationshiptypeahead',
                itemId: 'txtRelationship',
                displayField: 'name',
                valueField: 'relationshipID',
                width: 350,
                emptyText: '[e.g. CVS MI]',
                listeners: {
                    select: 'relationshipselect'
                }
            },{
                xtype: 'combobox',
                fieldLabel: 'Payment Center',
                emptytext:   '[Select a Payment Center]',
                itemId : 'cbxPaymentCenter',
                name:'locState',
                displayField: 'PCpayCenterName',
                valueField: 'PCpayCenterId',
                listeners: {
                    select: function(PCpayCenter,b,c,d) {
                        PCpayCenter.setValue(PCpayCenter.lastSelection[0].data.PCpayCenterId +' '+  PCpayCenter.lastSelection[0].data.PCpayCenterName);
                    }
                },
                bind: {
                    store: '{storerelationshipmasterdataModel}'
                }
            },{
                fieldLabel: 'Remit and ReconciliationID',
                name: 'locZip',
                xtype:'textfield',
                itemId:'txtReconciliationID',
                bind: {value: '{popupdata.remitAndReconId}'}
            },{
                fieldLabel: 'Relationship Eff Date',
                itemId:'dtfeffectivedate',
                reference: 'refdtfeffectivedate',
                allowBlank:false,
                xtype: 'datefield',
                //format: 'm/d/Y'
                renderer: function(value, field){
                    return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                }
            },
                {
                    fieldLabel: 'Relationship Term Date',
                    xtype: 'datefield',
                    itemId:'dtftermdate',
                    format: 'm/d/Y'
                }
            ]
        },
        {
            dockedItems: {
                dock: 'bottom',
                xtype: 'toolbar',
                items: ['->',
                    {
                        xtype: 'button',
                        text : 'Update',
                        iconCls: 'fa fa-save',
                        handler:'btnSave'
                    }, {
                        xtype: 'button',
                        text : 'Cancel',
                        iconCls: 'fa fa-times',
                        handler:'btncancel'
                    }
                ]
            }
        }


    ]

});
