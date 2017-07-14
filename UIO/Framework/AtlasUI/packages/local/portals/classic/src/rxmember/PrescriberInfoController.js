/*
 * Last Developer: Srujith Cheruku
 * Date: 09-26-2016
 * Previous Developers: []
 * Origin: RxMember - Claims Search - Prescriber Info
 * Description: Controller for the Claims Search Page prescriber Info
 */
Ext.define('Atlas.portals.view.rxmember.PrescriberInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prescriberInfoController',

    modifyPhoneNum: function (component, eOpts) {
        //   var phoneNumber = this.getViewModel().data.modalRecord.data.locPhone;
        var phoneNumber = this.getViewModel().config.links.modalRecord.data.locphone;
        var modifiedNumber = phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1)-$2-$3');
        component.setValue(modifiedNumber);
        //   this.getViewModel().config.links.modalRecord.data.locPhone = modifiedNumber;
    },

    modifyFax: function (component, eOpts) {
        var phoneNumber = this.getViewModel().config.links.modalRecord.data.locfax;
        var modifiedNumber = phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})$/, '($1)-$2-$3');
        component.setValue(modifiedNumber);
    },

    modifyAddress: function (component, eOpts) {
        var Address1 = this.getViewModel().config.links.modalRecord.data.locaddr1;
        var Address2 = this.getViewModel().config.links.modalRecord.data.locaddr2;
        var city = this.getViewModel().config.links.modalRecord.data.loccity;
        var state = this.getViewModel().config.links.modalRecord.data.locstate;
        var zip = this.getViewModel().config.links.modalRecord.data.loczip;
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