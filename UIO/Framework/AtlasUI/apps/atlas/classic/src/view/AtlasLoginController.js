Ext.define('Atlas.view.AtlasLoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.atlaslogin',

    listen: {
        controller: {
            '*': {
                updateLoginStatus: 'updateStatus'
            }
        }
    },

    init: function () {
        // this.setupPanel();
    },

    onChange: function(combo, newValue){
        window.location = window.location + '?' + newValue;
    },

    setupPanel: function () {
        var me = this,
            parts = location.hostname.split('.'),
            vm = me.getViewModel(),
            merlin = parts[0] === 'rx' || !!location.pathname.match(/merlin/g) || !!location.search.match(/merlin/g) || !!location.pathname.match(/benefitplan/g) || !!location.search.match(/benefitplan/g) || !!location.pathname.match(/formulary/g) || !!location.search.match(/formulary/g),
            memberrx = !!parts[0].match(/rxmember/g) || !!location.pathname.match(/memberrx/g) || !!location.search.match(/memberrx/g),
            prescriber = !!parts[0].match(/rxprescriber/g) ||  !!location.pathname.match(/prescriber/g) || !!location.search.match(/prescriber/g),
            pharmacyrx = !!parts[0].match(/rxpharmacy/g) ||  !!location.pathname.match(/pharmacyrx/g) || !!location.search.match(/pharmacyrx/g),
            membermhp = !!parts[0].match(/hpmember/g) || !!location.pathname.match(/membermhp/g) || !!location.search.match(/membermhp/g),
            provider = !!parts[0].match(/hpprovider/g) ||  !!location.pathname.match(/provider/g) || !!location.search.match(/provider/g),
            empty = (!merlin && !memberrx && !membermhp && !provider && !prescriber && !pharmacyrx);

        if (merlin) {
            vm.set('start', 'merlin');
            me.lookupReference('resetButton').show();
        }
        else if (memberrx) {
            vm.set('start', 'rxmember');
            me.getView().down('combo').setValue('memberrx');
        }
        else if (membermhp) {
            vm.set('start', 'hpmember');
            me.getView().down('combo').setValue('membermhp');
            me.lookupReference('forgotButton').show();
            me.lookupReference('registerButton').show();
        }
        else if (provider) {
            vm.set('start', 'hpprovider');
            me.getView().down('combo').setValue('provider');
        }
        else if (prescriber) {
            vm.set('start', 'rxprescriber');
            me.getView().down('combo').setValue('prescriber');
        }
        else if (pharmacyrx) {
            vm.set('start', 'rxpharmacy');
        }
        else {
            me.getView().down('combo').show();
        }

    },

    onBoxReady: function(){
        var body =  Ext.fly(document.body);
        body.addCls('atlas-login');
    },

    onBeforeClose: function(){
        var body =  Ext.fly(document.body);
        body.removeCls('atlas-login');
        return true;
    },

    onLogin: function () {
        var me = this,
            form = me.getView().down('form'),
            credentials = form.getValues();
        if (form.isValid()) {
            me.fireEvent('dologin', credentials);
        }
    },

    onReset: function () {
        var me = this,
            vm = me.getViewModel(),
            start = vm.get('start');

        if (!start) {
            start = me.getView().down('combo').getValue();
        }

        this.fireEvent('resetpassword', start);
    },

    onRegister: function () {
        var me = this,
            vm = me.getViewModel(),
            start = vm.get('start');

        switch (start) {
            case 'membermhp':
                Ext.create('Atlas.portals.view.registration.MemberMHPRegistration').show();
                break;
            default:
                alert('This feature is not yet set up for this module');
                break;
        }
    },

    updateStatus: function (status) {
        var label = this.getView().down('[reference=status]');
        if (label) {
            label.setText(status);
            label.show();
        }
    }


});