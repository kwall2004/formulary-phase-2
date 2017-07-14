/**
 * Created by rsalekin on 12/21/2016.
 */
Ext.define('Atlas.pharmacy.view.credentialing.AddPharmacyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.addpharmacycontroller',

    init: function () {
        var a=10;
    },

    providertypeahead_Select: function(control, record){
        //this.getView().down('#txtPharmacyName').setValue(record.data.ncpdpId + ' ' + record.data.Name);
        this.getView().down('#grdNewPharmacy').columns[1].getEditor().setValue(record.data.ncpdpId + ' ' + record.data.Name);
    },

    onAdd: function (btn) {
        var newList = {},
            store = this.getViewModel().get('storeNewPharmacy'),
            plugin = this.getView().down('#grdNewPharmacy').getPlugin('rowEdit');
        newList.NCPDPID = '';
        newList.PharmacyName = '';
        store.insert(0, newList);
        plugin.startEdit(0);
        this.getView().down('#saveButton').setDisabled(false);
    },

    onRemove: function (btn) {
        var store = this.getViewModel().get('storeNewPharmacy');
        if(this.getView().down('#grdNewPharmacy').getSelection().length > 0) {
            var gridSelectedRows = this.getView().down('#grdNewPharmacy').getSelection();
            store.remove(gridSelectedRows);
            this.getView().down('#saveButton').setDisabled(false);
        }
    },

    onSave: function (btn){
        var ncpdpIds = '',
            storeNewPharmacy = this.getViewModel().get('storeNewPharmacy'),
            plugin = this.getView().down('#grdNewPharmacy').getPlugin('rowEdit');
        if(plugin.editing){
            Ext.Msg.alert('Message', 'Please complete edit of current record before proceeding');
        }
        else{
            if(storeNewPharmacy.data.length == 0) {
                Ext.Msg.alert('Message','Please add atleast one pharmacy.');
            }
            else {
                storeNewPharmacy.data.items.forEach(function (item, index) {
                    ncpdpIds += ',' + item.get('NCPDPID');
                });

                btn.up('window').close();

                var controller = Ext.create('Atlas.pharmacy.view.credentialing.CredentialingPopupsController');
                controller.fireEvent('saverefreshholdrequestrelletter', ncpdpIds.substring(1));
            }
        }
    }
});
