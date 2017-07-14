/**
 * Created by c4539 on 12/1/2016.
 */
Ext.define('Atlas.portals.provider.POCWindowViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsproviderpocwindow',

    viewPoc: function() {
        var provider = this.getView().getViewModel().get('provider'),
            record = this.getView().getViewModel().get('record'),
            jobNumber = record.get('jobNum');

        this.closeWindow();
        if (jobNumber && jobNumber !== '0' && jobNumber !== '-1') {
            Ext.create('Ext.window.Window', {
                title: 'View Documents',
                modal: true,
                reference: 'docWindow',
                items: {
                    xtype: 'portalsproviderdocwindow',
                    viewModel: {
                        data: {
                            provider: provider,
                            record: record,
                            isOkDisabled: true
                        }
                    }
                }
            }).show();
        } else if (jobNumber === '0' || jobNumber === '') {
            Ext.Msg.alert('No PoC document found.');
        } else {
            Ext.Msg.alert('Please select a record to print PoC.');
        }
    },

    processDecision: function() {
        var provider = this.getView().getViewModel().get('provider'),
            record = this.getView().getViewModel().get('record'),
            inputs = this.lookupReference('pocForm').getValues(),
            status = inputs.approval ? 'Approved' : 'Not Approved',
            pocModel = Ext.create('Atlas.portals.provider.model.PocNoteProviderWeb', {});

        if (record.get('pocStatus') !== null && record.get('pocStatus') !== 'Appoved') {
            if (status === 'Not Approved') {
                if (!inputs.comments) {
                    Ext.Msg.alert('PoC Decision', 'Comments are required to Not Approve a PoC.');
                    return;
                }
            }

            pocModel.phantom = false;
            pocModel.getProxy().setExtraParam('pRecipientID', record.get('recipientID'));
            pocModel.getProxy().setExtraParam('pUserName', provider.un + '|' + provider.provID);
            pocModel.getProxy().setExtraParam('pStatus', status);
            pocModel.getProxy().setExtraParam('pNotes', inputs.comments);
            pocModel.save({
                callback: function(record, operation) {
                    var response = Ext.JSON.decode(operation._response.responseText);

                    if (!response || !response.message || !(response.message.length > 0)) {
                        Ext.Msg.alert('PoC Decision Error', 'Could not submit approval decision at this time.');
                        return;
                    }

                    if (!response.message[0].message) {
                        if (status === 'Approved') {
                            Ext.Msg.alert('PoC Decision', 'PoC Approved.');
                            return;
                        }
                        Ext.Msg.alert('PoC Decision', 'PoC Not Approved.');
                        return;
                    }

                    Ext.Msg.alert('PoC Decision', response.message[0].message);
                }
            });

            this.closeWindow();
            this.fireEvent('pocApproval', provider);
            return;
        }

        Ext.Msg.alert('PoC Decision', 'PoC decision already taken.');
    },

    cancelDecision: function() {
        this.closeWindow();
    },

    closeWindow: function() {
        this.getView().up().destroy();
    }
});