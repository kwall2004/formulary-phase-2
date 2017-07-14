Ext.define('Atlas.portals.prescriber.ContactDetailsWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalsprescribercontactdetailswindow',

    init: function() {
        var planId = this.getViewModel().get('id'),
            whereClause = 'planGroupId = ' + planId + ' AND letterFrom = \'MRx\'',
            user = Ext.first('viewport').getViewModel().get('user'),
            contactForm = this.lookupReference('contactForm');
            planLetterInfoModel = Ext.create('Atlas.portals.prescriber.model.PlanLetterInfo', {});

        planLetterInfoModel.getProxy().setExtraParam('pSessionID', user.retSessionID);
        planLetterInfoModel.getProxy().setExtraParam('pWhere', whereClause);
        planLetterInfoModel.load({
            callback: function(letter) {
                contactForm.loadRecord(letter);
            }
        })
    },

    goToContacts: function() {
        this.fireEvent('openView','rxprescriber','portals','prescriber_ContactUs', null);
        this.getView().up('window').close();
    }
});