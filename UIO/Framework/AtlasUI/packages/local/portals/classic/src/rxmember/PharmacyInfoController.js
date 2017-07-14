/*
 * Last Developer: Srujith Cheruku
 * Date: 09-26-2016
 * Previous Developers: []
 * Origin: RxMember - Claims Search - pharmacy Info
 * Description: Controller for the Claims Search Page Pharmacy Info
 */
Ext.define('Atlas.portals.view.rxmember.PharmacyInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacyInfoController',

    onDirectionsClick: function (component, e, eOpts) {
        var address = this.getViewModel().data.modalRecord.data;
        window.open('https://maps.google.com/maps?q=' + address.locAddress1 + ' ' + address.locAddress2 + ' ' + address.locCity + ' ' + address.locState + ' ' + address.locZip);

    },

    onCancelClick: function (component, e, eOpts) {
        this.getView().up('window').close();

    },

    modifyPhoneNum: function (component, eOpts) {
        //   var phoneNumber = this.getViewModel().data.modalRecord.data.locPhone;
        var phoneNumber = this.getViewModel().config.links.modalRecord.data.locPhone;
        var modifiedNumber = phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1)-$2-$3');
        var phoneExt = this.getViewModel().config.links.modalRecord.data.locPhoneExt;
        if (phoneExt != null && phoneExt != '') {
            modifiedNumber = modifiedNumber + ' Ext: ' + phoneExt;
        }
        component.setValue(modifiedNumber);
        //   this.getViewModel().config.links.modalRecord.data.locPhone = modifiedNumber;
    },

    modifyFax: function (component, eOpts) {
        var phoneNumber = this.getViewModel().config.links.modalRecord.data.locFax;
        var modifiedNumber = phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1)-$2-$3');
        component.setValue(modifiedNumber);
    },

    modifyAddress: function (component, eOpts) {
        var Address1 = this.getViewModel().config.links.modalRecord.data.locAddress1;
        var Address2 = this.getViewModel().config.links.modalRecord.data.locAddress2;
        var city = this.getViewModel().config.links.modalRecord.data.locCity;
        var state = this.getViewModel().config.links.modalRecord.data.locState;
        var zip = this.getViewModel().config.links.modalRecord.data.locZip;
        var modifiedZip = '';
        if (zip.length > 5) {
            modifiedZip = zip.replace(/^(\d{5})(\d{4})$/, '$1-$2');
        } else {
            modifiedZip = zip;
        }
        var modifiedAddress = Address1 + ',<br/>' + Address2 + ' ' + city + ', ' + state + ' ' + modifiedZip;
        component.setValue(modifiedAddress);
    }

});