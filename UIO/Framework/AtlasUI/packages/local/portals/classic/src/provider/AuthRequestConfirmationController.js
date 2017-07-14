/*
 * Last Developer: Srujith Cheruku
 * Date: 12-8-2016
 * Previous Developers: []
 * Origin: Provider - Authorization Request Confirmation Controller
 * Description: Gives users a controller to the Auth Request Confirmation
 */
Ext.define('Atlas.portals.provider.AuthRequestConfirmationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authrequestconfirmationcontroller',

    init: function() {
        var vm = this.getViewModel(),
            requestID = vm.get('requestID'),
            status = vm.get('status'),
            confirmationText = 'Your authorization request ' + requestID + ' has been successfully submitted and given a '+ status+ ' status';

        this.lookupReference('authRequestConfirmationLbl').setValue(confirmationText);
    },

    onAttachClinicalDocBtnClick: function() {
        Ext.create('Ext.window.Window', {
            reference: 'addAttachmentWindow',
            width: 455,
            title: 'Document Master',
            layout: 'fit',
            modal: true,
            session: {
                schema: 'atlas'
            },
            items: [{
                xtype: 'portalsProviderAuthAttachmentWindow',
                viewModel: {
                    stores: {
                        documents: {
                            model: 'Atlas.portals.provider.model.CMAttachments'
                        }
                    },
                    data: {
                        systemId: this.getViewModel().get('systemID'),
                        requestId: this.getViewModel().get('requestID')
                    }
                }
            }]
        }).show();
    },

    onAnotherNewRequestBtnClick: function() {
        this.getViewModel().data.oldTabWindow.destroy();
        this.fireEvent('openView', 'hpprovider', 'portals', 'provider_CreateAuthRequest', {
            keyType: '',
            keyValue: '',
            atlasId: ''
        });
        this.getView().up().destroy();
    }
});