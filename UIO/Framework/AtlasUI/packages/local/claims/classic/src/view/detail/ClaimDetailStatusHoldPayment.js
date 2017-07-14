/**
 * Created by b1343 on 5/23/2016.
 */
Ext.define('Atlas.claims.view.detail.ClaimDetailStatusHoldPayment', {
    extend: 'Ext.Container',
    xtype: 'claimDetailStatusHoldPayment',
    requires: [
        'Ext.form.Panel'
    ],
    itemId: 'claimDetailStatusHoldPaymentID',


    items: [
        {
            xtype: 'fieldset',
            title: 'Hold Payment',
            collapsible: true,
            defaults: {
                labelWidth: 90
            },
            items: [{
                xtype: 'checkbox',
                inputValue: 'hold',
                reference: 'holdBox',
                bind: {
                    fieldLabel: '<span style="color:red"><b>Hold Payment</b></span>'
                },
                listeners: {
                    change: function (chkBox, checked) {
                        var me = this,
                            confirmMessage = 'Are you sure you would like to ' + (checked ? 'PUT A HOLD' : 'REMOVE A HOLD') + ' on payment for this Claim?',
                            note = 'Payment ON-HOLD is ' + (checked ? 'SET' : 'REMOVED') + ' by the user from UI.';
                        Ext.Msg.confirm('Hold Payment', confirmMessage, function (btn) {
                            if (btn === 'yes') {
                                var view = me.up().up().up().up().up();
                                var record = Ext.create('Atlas.common.model.ClaimMasterData', {});
                                var claimId = view.lookup('claimbox').getValue();
                                var pFieldList = 'holdFlag,Notes.Note';
                                var pData = checked + '|' + note;
                                record.phantom = false;
                                record.getProxy().setExtraParam('pTransID', claimId);
                                record.getProxy().setExtraParam('pcFieldList', pFieldList);
                                record.getProxy().setExtraParam('pcData', pData);
                                record.save({
                                    scope: me,
                                    callback: function (record, operation, success) {
                                        if (success) {
                                            var objResp = Ext.decode(operation.getResponse().responseText);
                                            if (objResp.message[0].code == 0) {
                                                view.controller.searchClaim();
                                            }
                                        }
                                    }
                                });
                            }
                            else {
                                chkBox.suspendEvents();
                                chkBox.setValue(!checked);
                                chkBox.resumeEvents();
                            }
                        }, me);
                    }
                }
            }, {
                xtype: 'displayfield',
                reference: 'holdPaymentMsg',
                value: 'Payment Hold',
                grow: true,
                anchor: '100%',
                style: {
                    margin: '0px 0px 0px 105px !important'
                },
                bind: {
                    value: '<span style="color:red"><b>Payment Hold</b></span>'
                }
            }, {
                xtype: 'textareafield',
                grow: true,
                name: 'notes',
                reference: 'holdNotebox',
                fieldLabel: 'Notes',
                anchor: '100%'
            }]
        }
    ]
});